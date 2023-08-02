

function grid(columns, rows, bColour = 'azul', rColour = 'rojo'){

    if (!Number.isInteger(columns) && !Number.isInteger(rows)){
        return console.log('debes ingresar un número entero\n')
    }
    if (columns < 0 || rows < 0){
        return console.log('los argumentos no pueden ser negativos\n')
    }
    if (!(columns === rows+1 || columns === rows -1)){
        return console.log('El valor es falso, el único tablero posible que no repita su cantidad de bloques de dos colores en filas y en columnas y que tenga la misma cantidad de variedad de colores es de un tablero con una diferencia de filas con columnas +/-1. Para calcular este valor se puede utilizar (n*n-1)/2 == (columnas*filas)/2, lo que simplificado de forma sencilla es columnas == filas+1 || columnas == filas-1 ej.: grid(4,3)\n') 
    }
      let [showArray, arrayCols, arrayRows] = [[],[],[]]
      let higherNumber, lowerNumber
      if(columns > rows){
        higherNumber = columns;
        lowerNumber = rows;
      }
      else{
        higherNumber = rows;
        lowerNumber = columns;
    }
    let permutations = consecutiveMul(columns)*consecutiveMul(rows)
    if (isFinite(permutations)){
        console.log(`El tablero de ${columns} x ${rows} tiene ${permutations} posibles patrones de diseño`)
    }
    else{
        console.log(`El tablero de ${columns} x ${rows} tiene más de 2^53 posibles patrones de diseño`)
    }
    arrayCols = nRepeatArr(0, lowerNumber)
    arrayRows = nRepeatArr(1, lowerNumber)
    console.log('patron de diseño escalera')
    console.table(showPattern(arrayCols, arrayRows))
    arrayCols = majorMinorArr(nRepeatArr(0, lowerNumber))
    arrayRows = alternateArr(1, lowerNumber)
    console.log('patron de diseño laberinto')
    console.table(showPattern(arrayCols, arrayRows))
    arrayCols = randomIndexArr(nRepeatArr(0, lowerNumber))
    arrayRows = randomIndexArr(nRepeatArr(1, lowerNumber))
    console.log('patron de diseño random')
    console.table(showPattern(arrayCols, arrayRows))
    

    function nRepeatArr(from, to){
      createdArray = [];
      if(to >= from ){
        for(to; from<= to; to--)
          createdArray.unshift(to);
        }
      else{ 
        for(from; to<= from; from--)
          createdArray.push(from);
        }
      return createdArray;
    }
  
    function randomIndexArr(arr){
      let newArr = []
      while(arr.length >= 1){
        let randomSel = (Math.floor(Math.random() * arr.length))
        newArr.push(arr[randomSel])
        arr.splice(randomSel, 1) 
      }
      return newArr
    }
    function consecutiveMul(number){
      let newNumber = 1
      for(number; number>1; number--) newNumber *=number
      return newNumber
    }
  
    function majorMinorArr(arr){
      function move(from,to){
        arr.splice(to,0,arr.splice(from,1)[0]);
        return arr;
      };
      for(let i = 0; i<= arr.length/2; i++ ){
        move(arr.length- 1,i*2)
      }
      return arr
    }
    function alternateArr(from, to){
      let [fixedTo, fixedFrom] = [to , from]
      createdArray = [];
      if(to >= from ){
        for(to; from<= to; to--)
        
          to%2 == 0 ? createdArray.unshift(fixedTo-to+1) : createdArray.unshift(to) ;
        }
      else{ 
        for(from; to<= from; from--)
          from%2 == 0 ? createdArray.unshift(fixedFrom-from+1) : createdArray.unshift(from) ;
        }
      return createdArray;
      
  }
    function showPattern(arr1, arr2){
      showArray = []
      for(let i = 1; i<=lowerNumber; i++ ){
        let rowArray = []
        for(let j = 1; j<= higherNumber; j++){
          rowArray.push(bColour)
        }
        showArray.push(rowArray)
      }
      for(let i = lowerNumber; i>=0; i-- ){
        for(let j = lowerNumber; j> lowerNumber-i; j--){
          showArray[arr2.indexOf(i)][arr1.indexOf(j)] = rColour
        }
      }
      return showArray
    }
}

console.log('en caso de ingresar tableros con valores inviables para el patron solicitado en el ejercicio se explicara la forma correcta de crear el patron\n grid\(8,8\)')
grid(8,8)

console.log('también genera error al ingresar números negativos, números flotantes o cadenas\n grid(\'fizz\',\'buzz\')')
grid('fizz','buzz')

console.log('al ingresar la función grid con los valores correctos se mostrará el número de posibilidades realizadas hasta la capacidad de 2^53 en cuyo caso se expresará que el tablero tiene más de 2^53 posibles patrones, también se mostraran por consola 3 posibles patrones \n grid(4,3)')

grid(4,3)

console.log('Para finalizar también se agregaron 2 parámetros adicionales para estilizar el arreglo y poder ser representado por consola y ser mas amigable visualmente\n grid(8,7, \'🟦\' ,\'🟥\')')

grid(8,7, '🟦' ,'🟥')
