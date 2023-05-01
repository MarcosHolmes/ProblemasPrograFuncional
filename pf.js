const fs = require('fs');

class Productos {
    constructor(clave, descripP, precio, clasificacion, existencia, existenciaMin, existenciaMax) //Constructor para los productos 
    {
      this.clave = clave;
      this.descripP = descripP;
      this.precio = precio;
      this.clasificacion = clasificacion;
      this.existencia = existencia;
      this.existenciaMin = existenciaMin;
      this.existenciaMax = existenciaMax;
    }
  }
  
  class DAO { //Clase Data Acces Object 
    constructor() {
      this.productsArray = []; 
    }
  
    readData(archivo) { //Función para leer los datos del archivo productos.txt
      const fileInfo = fs.readFileSync(archivo, 'utf-8');
      const sep = fileInfo.split('\n');
      const productsArray = sep.map(ren => {
      const posicion = ren.split(',');
      const p = new Productos(posicion[0], posicion[1], parseFloat(posicion[2]), 
      posicion[3], parseInt(posicion[4]), parseInt(posicion[5]), parseInt(posicion[6]));
      return p;
      });

      this.productsArray = productsArray;
    }

    function1() { //Funcion para calcular productos con existencia mayor a 20
      return this.productsArray.filter((p) => p.existencia > 20).length;
    }

    function2() { //Funcion para calcular productos con existencia menor a 15
      return this.productsArray.filter((p) => p.existencia <15).length;
    }
  
    function3() { //Funcion para calcular la lista de productos con la misma clasificacion mayor a 15.50
      const clasificacionf = this.productsArray[3].clasificacion;
      const fp = this.productsArray.filter((p) => p.clasificacion === clasificacionf && p.precio > 15.50);
      return fp.map((p) => p.descripP);    
    }
  
    function4() {  //Funcion para calcular la lista de productos con la misma clasificacion mayor a 20.30 y menor que 45
      const fp = this.productsArray.filter((p)=> p.precio > 20.30 && p.precio < 45.00);
      return fp.map((p)  => `Producto: ${p.descripP} --------  Precio: ${p.precio}\n`);    
    }
  
    function5() { //Funcion para calcular el número de productos agrupados por su clasificación
      const clasiCant = {};
      this.productsArray.forEach((p) => {
        if (clasiCant[p.clasificacion]) {clasiCant[p.clasificacion] += 1;} 
        else {clasiCant[p.clasificacion] = 1;}
      });console.log(clasiCant);
    }
  }
const leerDatos = new DAO();
leerDatos.readData('productos.txt'); 
console.log(`Numero de productos con existencia mayor a 20: \n${leerDatos.function1()}\n`);
console.log(`Numero de productos con existencia menor a 15: \n${leerDatos.function2()}\n`);
console.log(`Lista de productos con la misma clasificacion mayor a 15.50: \n ${leerDatos.function3()}\n`);
console.log(`Lista de productos con la misma clasificacion mayor a 20.30 y menor que 45:\n${leerDatos.function4()}\n`);
console.log("Número de productos agrupados por su clasificación:\n");
console.log(leerDatos.function5());