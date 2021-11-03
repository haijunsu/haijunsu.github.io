---
title: JavaScript Array Methods
author: Haijun (Navy) Su
layout: post
tags: [javascript, array]
---

JavaScript array methods to help you make your code easier.
[`filter`, `find`, `map`, `reduce`, `every`, `more`]

### Method filter
`filter` returns an array of matched objects

Traditional codes:
```
let animals = [
   {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
   {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
   {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
 ]

 /*using imperative*/
 let neuteredAnimals = [];

for (let i=0; i < animals.length; i++){
  let a = animals[i];
  if(a.isNeutered){
    neuteredAnimals.push(a);
  }
}
```

Using method filter:

```
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

 /*using functional filter() where a represents an item in the array*/
 let neuteredAnimals = animals.filter((a) => {
     return a.isNeutered;
 });
```

### Method find
`find` returns the first matched object

Example:
```
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

animalTypeFound = animals.find( animal => animal.type === 'cat' );

// animalTypeFound will return:
// {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2}

animalTypeFilter = animals.filter( animal => animal.type === 'cat' );

// animalTypeFilter will return:
// [{name: 'Tibbers', type: 'cat', isNeutered: true, age: 2}, {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}]
```

### Method map
Example:
```
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

// what you need: 
// ['Tibbers', 'Fluffball', 'Strawhat']

let animalNames = animals.map(animal => {return animal.name});

// what you need: 
// [{name: 'Tibbers', species: 'cat'}, {name: 'Fluffball', species: 'rabbit'}, {name: 'Strawhat', species: 'cat'}]

let petDetails = animals.map(animal => {
    return {
        name: animal.name, 
        species: animal.type
    };
    });
```
### Method reduce
Example:

```
let numbers = [100, 20, 10];

// result will return 70 as the value
// The function inside reduce will run twice. 
// the first time, x = 100, y = 20
// the second time, x = 80, y = 10

result = numbers.reduce((x, y) => { return x - y; });
```

`reduce` can also take two arguments. The first is the function that determines what happens to the two values and the second sets the starting value.

```
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

// How old are all the animals combined?
// 0 is the starting value and acts as the first acculmulator value
// will return 8

let totalAge = animals.reduce((acculmulator, animal) => {
    return acculmulator + animal.age;
}, 0);

// lets say you want to find out the oldest animal 
// code below will return {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}

let oldestPet = animals.reduce((oldest, animal) => {
    return (oldest.years || 0) > animal.years ? oldest : animal;
  }, {});

  // decrypting the code above and how terniaries work 
  // the condition --> (oldest.years || 0) > animal.years 
  // if true --> ? oldest
  // else --> : animal
```

### Methed every
`every` returns a true or false value based on the condition set.
```
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

let allNeutered = animals.every(animal => {return animal.isNeutered});

//will return false because not all values under isNeutered evaluates to true
```

### Method some
`some` works the same way as every() but only at least one of the condition needs to evaluate to true.
```
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
  ]

let someAreCats = animals.some(animal => {return animal.type === 'cat'});

// will return true because at least one animal.type returned 'cat'
```

### Mixed example

```
let animals = [
    {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2, enteredPagent: true, cutenessScore: 347},
    {name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1, enteredPagent: true, cutenessScore: 193},
    {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5, enteredPagent: false, cutenessScore: 521}
  ]

//lets say you want to find the total cuteness score of all valid pagent entrants

let totalScore = animals
                    .filter(animal => {return animal.isNeutered})
                    .reduce((accumulator, animal) => {return accumulator + animal.cutenessScore}, 0);

// totalScore will return 868
```

Reference:
<https://medium.com/@PurpleGreenLemon/simplify-your-javascript-with-these-6-array-methods-db4c278f08c9>
<https://github.com/dottedsquirrel/MediumCodeExamples/tree/master/JavaScript/functionalArrayPatterns>

