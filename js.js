function filter(array, func) {
  const new_array = [];
  for(i=0; i < array.length; i++) {
    if(func(array[i]) == true)
      new_array.push(array[i])
  }
  return new_array
};

function divisbleByTwo(n) {
  return n%2 == 0
};

console.log(filter([1,2,3,4], divisbleByTwo))
