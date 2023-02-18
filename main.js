// Global variables
let bars = document.getElementsByClassName('bars-container'); // bars element contain list bar-item, bar-item represent a element in array
let speed = document.getElementsByClassName('speed')[0]; // speed input to control sorting speed
let array = []; // store list number of element to sort
let delayTime = 2000; // default speed sort = 2000ms (slowest)
let timeout;
let ascending = 1; // ascending sort default

// Use for swap element in array, style barHeader and style barNumber
function swap(array, barHeader, barNumber, indexA, indexB) {
  [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
  barHeader[indexA].style.height = `${array[indexA] / 10 + 0.2}em`;
  barHeader[indexB].style.height = `${array[indexB] / 10 + 0.2}em`;
  barNumber[indexA].innerHTML = array[indexA];
  barNumber[indexB].innerHTML = array[indexB];
}
// Disable the quit sorting button if don't sorting
function disableQuitSorting() {
  document.getElementsByClassName('quit')[0].style.color = '#f0ffff4d';
  document.getElementsByClassName('quit')[0].style.cursor = 'default';
  document.getElementsByClassName('quit')[0].disabled = true;
}
// Enable the quit sorting button while sorting
function enableQuitSorting() {
  document.getElementsByClassName('quit')[0].disabled = false;
  document.getElementsByClassName('quit')[0].style.color = 'azure';
  document.getElementsByClassName('quit')[0].style.cursor = 'pointer';
  document.getElementsByClassName('quit')[0].addEventListener('mouseover', (e) => {
    document.getElementsByClassName('quit')[0].style.color = 'black';
  });
  document.getElementsByClassName('quit')[0].addEventListener('mouseout', (e) => {
    document.getElementsByClassName('quit')[0].style.color = 'azure';
  });
}
// Disable the download array button while sorting
function disableDownloadArray() {
  document.getElementsByClassName('download')[0].style.pointerEvents = 'none';
  document.getElementsByClassName('download')[0].style.color = '#f0ffff4d';
}
// Enable the download array button after sorting
function enableDownloadArray() {
  let downloadEl = document.getElementsByClassName('download')[0];
  downloadEl.style.pointerEvents = 'auto';
  downloadEl.style.color = 'azure';
  downloadEl.style.transition = 'color 0.1s';
  downloadEl.addEventListener('mouseover', (e) => {
    downloadEl.style.color = 'black';
  });
  downloadEl.addEventListener('mouseout', (e) => {
    downloadEl.style.color = 'azure';
  });
  downloadEl.setAttribute('href', 'data:text/plain;charset=utf-11,' + encodeURIComponent(array));
}
// Disable buttons and inputs while sorting
function disableAllActivity() {
  document.getElementsByClassName('bubble')[0].disabled = true;
  document.getElementsByClassName('selection')[0].disabled = true;
  document.getElementsByClassName('insertion')[0].disabled = true;
  document.getElementsByClassName('quick')[0].disabled = true;
  document.getElementsByClassName('heap')[0].disabled = true;
  document.getElementsByClassName('random-btn')[0].disabled = true;
  document.getElementsByClassName('file-input')[0].disabled = true;
  document.getElementsByClassName('create-array-input')[0].disabled = true;
  document.getElementsByClassName('create-array-btn')[0].disabled = true;
  document.getElementsByClassName('number-element-input')[0].disabled = true;
  document.getElementsByClassName('min-range-input')[0].disabled = true;
  document.getElementsByClassName('max-range-input')[0].disabled = true;
  document.getElementsByClassName('decrease')[0].style.color = 'rgba(240, 255, 255, 0.5)';
  document.getElementsByClassName('ascending')[0].style.color = 'rgba(240, 255, 255, 0.5)';
  document.getElementsByClassName('decrease')[0].disabled = true;
  document.getElementsByClassName('ascending')[0].disabled = true;
}
// Enable buttons and inputs after sorting
function enableAllActivity() {
  document.getElementsByClassName('bubble')[0].disabled = false;
  document.getElementsByClassName('selection')[0].disabled = false;
  document.getElementsByClassName('insertion')[0].disabled = false;
  document.getElementsByClassName('quick')[0].disabled = false;
  document.getElementsByClassName('heap')[0].disabled = false;
  document.getElementsByClassName('random-btn')[0].disabled = false;
  document.getElementsByClassName('file-input')[0].disabled = false;
  document.getElementsByClassName('create-array-input')[0].disabled = false;
  document.getElementsByClassName('create-array-btn')[0].disabled = false;
  document.getElementsByClassName('number-element-input')[0].disabled = false;
  document.getElementsByClassName('min-range-input')[0].disabled = false;
  document.getElementsByClassName('max-range-input')[0].disabled = false;
  document.getElementsByClassName('decrease')[0].disabled = false;
  document.getElementsByClassName('ascending')[0].disabled = false;
  if (ascending) {
    document.getElementsByClassName('decrease')[0].style.color = 'azure';
    document.getElementsByClassName('ascending')[0].style.color = 'rgb(0, 234, 255)';
  } else {
    document.getElementsByClassName('decrease')[0].style.color = 'rgb(0, 234, 255)';
    document.getElementsByClassName('ascending')[0].style.color = 'azure';
  }
}
// Use for get a delayTime value when user drag speed bar
speed.addEventListener('input', (e) => {
  delayTime = 2000 - e.target.value;
});

// Create random array variables
let randomBtn = document.getElementsByClassName('random-btn')[0]; // use for create a random array element
let minRange = document.getElementsByClassName('min-range-input')[0]; // use for input an min range element before click random button
let maxRange = document.getElementsByClassName('max-range-input')[0]; // use for input an max range element before click random button
let numElement = document.getElementsByClassName('number-element-input')[0]; // use to input an length of array before click random button

// Use for display an array element on bars element after create an array
function renderBars(array) {
  bars[0].innerHTML = '';

  for (let i = 0; i < array.length; i++) {
    let barItem = document.createElement('div');
    let barHeader = document.createElement('p');
    let barNumber = document.createElement('p');

    barItem.className = 'bar-item';
    barHeader.className = 'bar-header';
    barNumber.className = 'bar-number';

    barHeader.style.height = `${array[i] / 10 + 0.2}em`;
    barNumber.innerHTML = array[i];

    barHeader.addEventListener('mouseover', function () {
      barNumber.style.visibility = 'visible';
    });
    barHeader.addEventListener('mouseout', function () {
      barNumber.style.visibility = 'hidden';
    });

    barItem.appendChild(barHeader);
    barItem.appendChild(barNumber);

    bars[0].appendChild(barItem);
  }
  console.log(array);
}

// Type input 1 Create random array handler
// Use for create an random array with length, min range and maxrange
function createRandomArray(numElement, minRange, maxRange) {
  if (maxRange == null || minRange == null || !numElement) {
    alert('Max range, min range and num element is require');
    return array;
  }
  if (maxRange < minRange) {
    alert('Max range do not greater than min range');
    return array;
  }

  array = [];
  for (let i = 0; i < numElement; i++) {
    array[i] = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange); // maxRange -> minRange
  }

  return array;
}

// Use for excute create an array every time user click random button
randomBtn.addEventListener('click', () => {
  disableDownloadArray();
  const numElementValue = Math.round(numElement.value * 1);
  const minRangeValue = Math.round(minRange.value * 1) || 0;
  const maxRangeValue = Math.round(maxRange.value * 1) || 200;

  array = createRandomArray(numElementValue, minRangeValue, maxRangeValue);

  renderBars(array);
});

// Type input 2 Read file into an array handler
// Read file variables
let fileInput = document.getElementsByClassName('file-input')[0]; // use for read files for creating an array

// Use for check valid array or check input is not empty when read file (type input 2) and read input's user (type input 3)
function checkArrayNumberAndCheckEmptyArray(array) {
  if (array.length == 0) {
    return false;
  }
  return array.every((el) => {
    return !isNaN(parseInt(el));
  });
}

// Use for read text from file every time open by user
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  // Alert when it can not read file
  reader.addEventListener('error', () => {
    alert('This file can not read');
  });

  reader.addEventListener('load', (e) => {
    let contentFile = e.target.result;

    // Check content file only contain number
    if (!checkArrayNumberAndCheckEmptyArray(contentFile.split(' '))) {
      // if contain another characters
      alert('This file not empty and only contain number');
    } else {
      // if only contain number
      disableDownloadArray();
      array = contentFile.split(' ').map((el) => {
        return parseInt(el);
      });
      renderBars(array);
    }
  });

  reader.readAsText(file);
});

// Type input 3 create your array
// Create your array variables
let createArrayInput = document.getElementsByClassName('create-array-input')[0]; // use for get a array input from user
let createArrayBtn = document.getElementsByClassName('create-array-btn')[0]; // use for create an array after user input

// Create your array handler
createArrayBtn.addEventListener('click', () => {
  const inputContent = createArrayInput.value.trim();
  if (!checkArrayNumberAndCheckEmptyArray(inputContent.split(' '))) {
    // if contain another characters
    alert('Your array not empty and only contain number');
  } else {
    // if only contain number
    disableDownloadArray();
    array = inputContent.split(' ').map((el) => {
      return parseInt(el);
    });
    renderBars(array);
  }
});

// Event handler when click sort button
function sortBtnClickHandler(sortFunc) {
  if (!checkArrayNumberAndCheckEmptyArray(array)) {
    alert('Please create your array!');
    return null;
  }
  let barHeader = document.getElementsByClassName('bar-header');
  for (let i = 0; i < array.length; i++) {
    barHeader[i].style.backgroundColor = 'red';
  }
  if (sortFunc.name != 'quickSort') {
    disableAllActivity();
    enableQuitSorting();
    sortFunc(array).then((data) => {
      console.log(data);
      enableAllActivity();
      enableDownloadArray();
      disableQuitSorting();
    });
  } else {
    disableAllActivity();
    enableQuitSorting();
    sortFunc(array, 0, array.length - 1).then((data) => {
      console.log(data);
      enableAllActivity();
      enableDownloadArray();
      disableQuitSorting();
    });
  }
}

// Use for delay ms time when call it
function delayTimer(ms) {
  return new Promise((resolve) => {
    return (timeout = setTimeout(() => {
      resolve('');
    }, ms));
  });
}

// Bubble sort
async function bubbleSort(array) {
  let checked;
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  for (let i = 0; i < array.length; i++) {
    checked = false;
    for (let j = 0; j < array.length - 1 - i; j++) {
      barHeader[j].style.backgroundColor = 'black';
      barHeader[j + 1].style.backgroundColor = 'black';
      await delayTimer(delayTime);
      if (ascending) {
        if (array[j] > array[j + 1]) {
          swap(array, barHeader, barNumber, j, j + 1);
          checked = true;
        }
      } else {
        if (array[j] < array[j + 1]) {
          swap(array, barHeader, barNumber, j, j + 1);
          checked = true;
        }
      }
      barHeader[j].style.backgroundColor = 'red';
      barHeader[j + 1].style.backgroundColor = 'red';
    }
    if (checked == false) {
      for (let j = 0; j < array.length - i; j++) {
        document.getElementsByClassName('bar-header')[j].style.backgroundColor = 'green';
      }

      await delayTimer(delayTime);
      document.getElementsByClassName('bar-header')[array.length - 1 - i].style.backgroundColor =
        'green';
      break;
    } else {
      let lastBarHeader = document.getElementsByClassName('bar-header')[array.length - 1 - i];
      lastBarHeader.style.backgroundColor = 'green';
    }
  }
  return array;
}

// Use for sort array by bubble sort every time user click bubble sort button
document.getElementsByClassName('bubble')[0].addEventListener('click', () => {
  sortBtnClickHandler(bubbleSort);
});

// Selection Sort
async function selectionSort(array) {
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    barHeader[i].style.backgroundColor = 'blue';

    for (let j = i + 1; j < array.length; j++) {
      barHeader[j].style.backgroundColor = 'black'; // xét nhân viên j
      await delayTimer(delayTime);
      if (ascending) {
        if (array[minIndex] > array[j]) {
          // Loại nhân viên ứng tuyển ưu tiên trước đó (nếu không phải là nhân viên ứng tuyển đầu tiên)
          if (minIndex != i) {
            barHeader[minIndex].style.backgroundColor = 'red';
          }
          // Xét nhân viên ứng tuyển cuối cùng hay chưa. Nếu là nhân viên ứng tuyển vị trí cuối cùng thì đợi thêm 1 giây
          if (j == array.length - 1) {
            barHeader[j].style.backgroundColor = 'yellow';
            await delayTimer(delayTime);
          } else {
            barHeader[j].style.backgroundColor = 'yellow';
          }
          // Đánh dấu được ưu tiên ứng tuyển
          minIndex = j;
        } else {
          // nhân viên đã loại
          barHeader[j].style.backgroundColor = 'red';
        }
      } else {
        if (array[minIndex] < array[j]) {
          // Loại nhân viên ứng tuyển ưu tiên trước đó (nếu không phải là nhân viên ứng tuyển đầu tiên)
          if (minIndex != i) {
            barHeader[minIndex].style.backgroundColor = 'red';
          }
          // Xét nhân viên ứng tuyển cuối cùng hay chưa. Nếu là nhân viên ứng tuyển vị trí cuối cùng thì đợi thêm 1 giây
          if (j == array.length - 1) {
            barHeader[j].style.backgroundColor = 'yellow';
            await delayTimer(delayTime);
          } else {
            barHeader[j].style.backgroundColor = 'yellow';
          }
          // Đánh dấu được ưu tiên ứng tuyển
          minIndex = j;
        } else {
          // nhân viên đã loại
          barHeader[j].style.backgroundColor = 'red';
        }
      }
    }

    if (minIndex != i) {
      swap(array, barHeader, barNumber, i, minIndex);
      barHeader[minIndex].style.backgroundColor = 'red';
    }
    barHeader[i].style.backgroundColor = 'green';
  }
  return array;
}

// Use for sort array by selection sort every time user click selection sort button
document.getElementsByClassName('selection')[0].addEventListener('click', () => {
  sortBtnClickHandler(selectionSort);
});

// Insertion Sort
async function insertionSort(array) {
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  for (let i = 0; i < array.length; i++) {
    barHeader[i].style.backgroundColor = 'black';
    await delayTimer(delayTime);

    let j = i;
    if (ascending) {
      while (j > 0 && array[j] < array[j - 1]) {
        barHeader[j].style.backgroundColor = 'blue';
        await delayTimer(delayTime);
        swap(array, barHeader, barNumber, j, j - 1);
        barHeader[j].style.backgroundColor = 'green';
        j--;
      }
    } else {
      while (j > 0 && array[j] > array[j - 1]) {
        barHeader[j].style.backgroundColor = 'blue';
        await delayTimer(delayTime);
        swap(array, barHeader, barNumber, j, j - 1);
        barHeader[j].style.backgroundColor = 'green';
        j--;
      }
    }
    barHeader[i].style.backgroundColor = 'green';
  }

  return array;
}

// Use for sort array by insertion sort every time user click insertion sort button
document.getElementsByClassName('insertion')[0].addEventListener('click', () => {
  sortBtnClickHandler(insertionSort);
});

// Quick sort
// Find bigger first element in array
function findPivot(array, i, j) {
  let k = i + 1;
  let firstElement = array[i];

  while (k <= j && array[k] == firstElement) {
    k++;
  }

  if (k > j) {
    return -1;
  } // If array not any element bigger return -1

  if (array[k] > firstElement) {
    return k;
  } else {
    return i;
  }
}

// Partition an array
async function partition(array, i, j, pivot, pivotIndex) {
  let L = i,
    R = j;
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  while (L <= R) {
    if (ascending) {
      while (array[L] < pivot) {
        if (L == i) barHeader[L].style.backgroundColor = 'blue';
        else barHeader[L].style.backgroundColor = 'red';
        L++;
        barHeader[L].style.backgroundColor = 'black';
        if (L > R) barHeader[L - 1].style.backgroundColor = 'white';

        await delayTimer(delayTime);
      }
      while (array[R] >= pivot) {
        if (R == j) barHeader[R].style.backgroundColor = 'blue';
        else barHeader[R].style.backgroundColor = 'red';
        R--;
        barHeader[R].style.backgroundColor = 'white';
        if (R < L) barHeader[R + 1].style.backgroundColor = 'black';
        await delayTimer(delayTime);
      }
    } else {
      while (array[L] >= pivot) {
        if (L == i) barHeader[L].style.backgroundColor = 'blue';
        else barHeader[L].style.backgroundColor = 'red';
        L++;
        barHeader[L].style.backgroundColor = 'black';
        if (L > R) barHeader[L - 1].style.backgroundColor = 'white';

        await delayTimer(delayTime);
      }
      while (array[R] < pivot) {
        if (R == j) barHeader[R].style.backgroundColor = 'blue';
        else barHeader[R].style.backgroundColor = 'red';
        R--;
        barHeader[R].style.backgroundColor = 'white';
        if (R < L) barHeader[R + 1].style.backgroundColor = 'black';
        await delayTimer(delayTime);
      }
    }

    if (L < R) {
      barHeader[L].style.backgroundColor = 'yellow';
      barHeader[R].style.backgroundColor = 'yellow';
      await delayTimer(delayTime);
      swap(array, barHeader, barNumber, L, R);
      [barHeader[L].style.borderTop, barHeader[R].style.borderTop] = [
        barHeader[R].style.borderTop,
        barHeader[L].style.borderTop,
      ];

      // Update pivot index
      if (L == pivotIndex) {
        pivotIndex = R;
      } else if (R == pivotIndex) {
        pivotIndex = L;
      }

      await delayTimer(delayTime);
      if (L == i) barHeader[L].style.backgroundColor = 'blue';
      if (R == j) barHeader[R].style.backgroundColor = 'blue';
      if (L != i) barHeader[L].style.backgroundColor = 'black';
      if (R != j) barHeader[R].style.backgroundColor = 'white';
      await delayTimer(delayTime);
    }
  }

  barHeader[pivotIndex].style.borderTop = 'none';
  barHeader[i].style.backgroundColor = 'red';
  barHeader[j].style.backgroundColor = 'red';
  barHeader[L].style.backgroundColor = 'red';
  barHeader[R].style.backgroundColor = 'red';
  await delayTimer(delayTime);

  return L;
}

// Main quick sort function
async function quickSort(array, i, j) {
  let pivotIndex = findPivot(array, i, j);
  let pivotValue;
  let k;
  let barHeader = document.getElementsByClassName('bar-header');

  if (pivotIndex != -1) {
    barHeader[i].style.backgroundColor = 'blue';
    barHeader[j].style.backgroundColor = 'blue';
    await delayTimer(delayTime);

    barHeader[pivotIndex].style.borderTop = '10px solid gray';

    await delayTimer(delayTime);

    pivotValue = array[pivotIndex];
    k = await partition(array, i, j, pivotValue, pivotIndex);
    await quickSort(array, i, k - 1);
    await quickSort(array, k, j);
  }

  for (let index = 0; index <= j; index++) {
    barHeader[index].style.backgroundColor = 'green';
  }
  return array;
}

// Use for sort array by quick sort every time user click quick sort button
document.getElementsByClassName('quick')[0].addEventListener('click', () => {
  sortBtnClickHandler(quickSort);
});

// Heap sort
async function pushDown(array, first, last) {
  let r = first;
  let left;
  let right;
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  while (r <= Math.floor((last - 1) / 2)) {
    left = r * 2 + 1;
    right = r * 2 + 2;
    if (ascending) {
      if (last == 2 * r + 1) {
        if (array[r] < array[last]) {
          barHeader[r].style.backgroundColor = 'yellow';
          barHeader[last].style.backgroundColor = 'yellow';
          await delayTimer(delayTime);
          swap(array, barHeader, barNumber, r, last);
          await delayTimer(delayTime);

          barHeader[r].style.backgroundColor = 'blue';
          barHeader[last].style.backgroundColor = 'red';
          await delayTimer(delayTime);

          barHeader[r].style.backgroundColor = 'red';
          r = last;
          barHeader[r].style.backgroundColor = 'blue';
          await delayTimer(delayTime);
          barHeader[r].style.backgroundColor = 'red';

          if (r > Math.floor((last - 1) / 2)) await delayTimer(delayTime);
        }
        barHeader[r].style.backgroundColor = 'red';
        r = last;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';

        if (r < Math.floor((last - 1) / 2)) await delayTimer(delayTime);
      } else if (array[r] < array[left] && array[left] >= array[right]) {
        barHeader[r].style.backgroundColor = 'yellow';
        barHeader[left].style.backgroundColor = 'yellow';
        await delayTimer(delayTime);
        swap(array, barHeader, barNumber, r, left);
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'blue';
        barHeader[left].style.backgroundColor = 'red';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        r = left;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        if (r < Math.floor((last - 1) / 2)) await delayTimer(delayTime);
      } else if (array[r] < array[right] && array[left] < array[right]) {
        barHeader[r].style.backgroundColor = 'yellow';
        barHeader[right].style.backgroundColor = 'yellow';
        await delayTimer(delayTime);
        swap(array, barHeader, barNumber, r, right);
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'blue';
        barHeader[right].style.backgroundColor = 'red';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        r = right;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';

        if (r < Math.floor((last - 1) / 2)) await delayTimer(delayTime);
      } else {
        barHeader[r].style.backgroundColor = 'red';
        r = last;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        await delayTimer(delayTime);
      }
    } else {
      if (last == 2 * r + 1) {
        if (array[r] > array[last]) {
          barHeader[r].style.backgroundColor = 'yellow';
          barHeader[last].style.backgroundColor = 'yellow';
          await delayTimer(delayTime);
          swap(array, barHeader, barNumber, r, last);
          await delayTimer(delayTime);

          barHeader[r].style.backgroundColor = 'blue';
          barHeader[last].style.backgroundColor = 'red';
          await delayTimer(delayTime);

          barHeader[r].style.backgroundColor = 'red';
          r = last;
          barHeader[r].style.backgroundColor = 'blue';
          await delayTimer(delayTime);
          barHeader[r].style.backgroundColor = 'red';

          if (r > Math.floor((last - 1) / 2)) await delayTimer(delayTime);
        }
        barHeader[r].style.backgroundColor = 'red';
        r = last;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';

        if (r < Math.floor((last - 1) / 2)) await delayTimer(delayTime);
      } else if (array[r] > array[left] && array[left] <= array[right]) {
        barHeader[r].style.backgroundColor = 'yellow';
        barHeader[left].style.backgroundColor = 'yellow';
        await delayTimer(delayTime);
        swap(array, barHeader, barNumber, r, left);
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'blue';
        barHeader[left].style.backgroundColor = 'red';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        r = left;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        if (r < Math.floor((last - 1) / 2)) await delayTimer(delayTime);
      } else if (array[r] > array[right] && array[left] > array[right]) {
        barHeader[r].style.backgroundColor = 'yellow';
        barHeader[right].style.backgroundColor = 'yellow';
        await delayTimer(delayTime);
        swap(array, barHeader, barNumber, r, right);
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'blue';
        barHeader[right].style.backgroundColor = 'red';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        r = right;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';

        if (r < Math.floor((last - 1) / 2)) await delayTimer(delayTime);
      } else {
        barHeader[r].style.backgroundColor = 'red';
        r = last;
        barHeader[r].style.backgroundColor = 'blue';
        await delayTimer(delayTime);

        barHeader[r].style.backgroundColor = 'red';
        await delayTimer(delayTime);
      }
    }
  }
}

// Main heap sort function
async function heapSort(array) {
  const lastParentNode = Math.floor((array.length - 2) / 2);
  let barNumber = document.getElementsByClassName('bar-number');
  let barHeader = document.getElementsByClassName('bar-header');

  for (let i = lastParentNode; i >= 0; i--) {
    barHeader[i].style.backgroundColor = 'blue';
    await delayTimer(delayTime);

    await pushDown(array, i, array.length - 1);
  }

  for (let i = array.length - 1; i >= 2; i--) {
    barHeader[i].style.backgroundColor = 'brown';
    barHeader[0].style.backgroundColor = 'brown';
    await delayTimer(delayTime);
    swap(array, barHeader, barNumber, 0, i);
    await delayTimer(delayTime);

    barHeader[i].style.backgroundColor = 'green';
    barHeader[0].style.backgroundColor = 'red';
    await delayTimer(delayTime);

    barHeader[0].style.backgroundColor = 'blue';
    await delayTimer(delayTime);

    await pushDown(array, 0, i - 1);
  }

  barHeader[0].style.backgroundColor = 'brown';
  barHeader[1].style.backgroundColor = 'brown';
  await delayTimer(delayTime);
  swap(array, barHeader, barNumber, 0, 1);
  await delayTimer(delayTime);
  barHeader[0].style.backgroundColor = 'green';
  barHeader[1].style.backgroundColor = 'green';

  return array;
}

// Use for sort array by heap sort every time user click heap sort button
document.getElementsByClassName('heap')[0].addEventListener('click', () => {
  sortBtnClickHandler(heapSort);
});

// Use for user want to quit or stop while sorting
document.getElementsByClassName('quit')[0].addEventListener('click', () => {
  clearTimeout(timeout);

  let barHeader = document.getElementsByClassName('bar-header');
  for (let i = 0; i < array.length; i++) {
    barHeader[i].style.backgroundColor = 'red';
    barHeader[i].style.borderTop = 'none';
  }

  enableAllActivity();
  disableDownloadArray();
  disableQuitSorting();
});

// Handler sort ácending or sort decreasing
document.getElementsByClassName('ascending')[0].addEventListener('click', () => {
  ascending = 1;
  document.getElementsByClassName('ascending')[0].style.color = 'rgb(0, 234, 255)';
  document.getElementsByClassName('decrease')[0].style.color = 'azure';
});
document.getElementsByClassName('decrease')[0].addEventListener('click', () => {
  ascending = 0;
  document.getElementsByClassName('decrease')[0].style.color = 'rgb(0, 234, 255)';
  document.getElementsByClassName('ascending')[0].style.color = 'azure';
});
