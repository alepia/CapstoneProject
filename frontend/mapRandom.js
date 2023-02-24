const arrayOfObjects = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Jack" },
  { id: 4, name: "Jill" },
  { id: 5, name: "Jenny" },
  { id: 6, name: "Jenny" },
  { id: 7, name: "Jenny" },
  { id: 8, name: "Jenny" },
  { id: 9, name: "Jenny" },
  { id: 10, name: "Jenny" },
  { id: 11, name: "Jenny" },
  { id: 12, name: "Jenny" },
  { id: 13, name: "Jenny" },
];

// necesito que me devuelva todos los elementos del array de objetos de forma aleatoria
// y que no se repitan hasta que se hayan 10 elementos en el array de objetos nuevo que se crea con el sort y el find y el find true que no se que hace   
// y que no se repitan hasta que se hayan 10 elementos en el array de objetos nuevo que se crea con el sort y el find y el find true que no se que hace 
arrayOfObjects.sort(() => Math.random() - Math.random()).map((element) => {
  console.log(element);
});
