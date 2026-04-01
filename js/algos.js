function linearSearch(haystack, needle) {
  let isFound = false;
  let count = 0;
  for (let i = 0; i < haystack.length; i++) {
    count++;
    if (haystack[i] === needle) {
      isFound = true;
      break;
    }
  }
  return isFound;
}

function binarySearch(haystack, needle) {
  let count = 0;
  let high = haystack.length;
  let low = 0;
  do {
    const middle = Math.floor(low + (high - low) / 2);
    const value = haystack[middle];
    count++;
    if (value === needle) {
      return true;
    } else if (value > needle) {
      high = middle;
    } else {
      low = middle + 1;
    }
  } while (low < high);
  return false;
}

function firstBreak(breaks) {
  const jumpValue = Math.floor(Math.sqrt(breaks.length));
  let sliceValue = 0;
  for (let i = 0; i < breaks.length; i += jumpValue) {
    if (breaks[i] === 1) {
      sliceValue = i;
      break;
    }
  }
  for (let i = sliceValue - jumpValue; i < sliceValue; i++) {
    if (breaks[i] === 1) {
      return i;
    }
  }
  return -1;
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
}

const breaks = [];
const orderedTestArray = [];

// filling array constants
for (let i = 0; i < 1000; i++) {
  if (i < 621) {
    breaks[i] = 0;
  } else {
    breaks[i] = 1;
  }
  orderedTestArray[i] = i;
}

console.log(linearSearch(orderedTestArray, 10000));
console.log(linearSearch(orderedTestArray, 750));
console.log(binarySearch(orderedTestArray, 10000));
console.log(binarySearch(orderedTestArray, 750));
console.log(firstBreak(breaks));
