// Common variable
let bars = document.getElementsByClassName('bars-container');
let speed = document.getElementsByClassName('speed')[0];
let array = [];
let delayTime = 2000; // default speed sort

// Download file when sorted
function disableDownloadArray() {
  document.getElementsByClassName('download')[0].style.pointerEvents = 'none';
  document.getElementsByClassName('download')[0].style.color = '#f0ffff4d';
}
function enableDownloadArray() {
  let downloadEl = document.getElementsByClassName('download')[0];
  downloadEl.style.pointerEvents = 'auto';
  downloadEl.style.color = 'azure';
  downloadEl.setAttribute('href', 'data:text/plain;charset=utf-11,' + encodeURIComponent(array));
}
// disable button and input while sort
function disableAllActivity() {
  document.getElementsByClassName('bubble')[0].disabled = true;
  document.getElementsByClassName('selection')[0].disabled = true;
  document.getElementsByClassName('insertion')[0].disabled = true;
  document.getElementsByClassName('quick')[0].disabled = true;
  document.getElementsByClassName('heap')[0].disabled = true;
  document.getElementsByClassName('merge')[0].disabled = true;
  document.getElementsByClassName('random-btn')[0].disabled = true;
  document.getElementsByClassName('file-input')[0].disabled = true;
  document.getElementsByClassName('create-array-input')[0].disabled = true;
  document.getElementsByClassName('create-array-btn')[0].disabled = true;
  document.getElementsByClassName('number-element-input')[0].disabled = true;
  document.getElementsByClassName('min-range-input')[0].disabled = true;
  document.getElementsByClassName('max-range-input')[0].disabled = true;
}
// enable button and input while sort
function enableAllActivity() {
  document.getElementsByClassName('bubble')[0].disabled = false;
  document.getElementsByClassName('selection')[0].disabled = false;
  document.getElementsByClassName('insertion')[0].disabled = false;
  document.getElementsByClassName('quick')[0].disabled = false;
  document.getElementsByClassName('heap')[0].disabled = false;
  document.getElementsByClassName('merge')[0].disabled = false;
  document.getElementsByClassName('random-btn')[0].disabled = false;
  document.getElementsByClassName('file-input')[0].disabled = false;
  document.getElementsByClassName('create-array-input')[0].disabled = false;
  document.getElementsByClassName('create-array-btn')[0].disabled = false;
  document.getElementsByClassName('number-element-input')[0].disabled = false;
  document.getElementsByClassName('min-range-input')[0].disabled = false;
  document.getElementsByClassName('max-range-input')[0].disabled = false;
}
// Speed sort
speed.addEventListener('input', (e) => {
  delayTime = 2000 - e.target.value;
});

// Create random array variable
let randomBtn = document.getElementsByClassName('random-btn')[0];
let minRange = document.getElementsByClassName('min-range-input')[0];
let maxRange = document.getElementsByClassName('max-range-input')[0];
let numElement = document.getElementsByClassName('number-element-input')[0];

// Update array to bars element
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

// Type 1 Create reandom array handler
function createRandomArray(numElement, minRange, maxRange) {
  if (maxRange == null || minRange == null || !numElement) {
    console.log(minRange);
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

randomBtn.addEventListener('click', () => {
  // Handling event when click the random button
  disableDownloadArray();
  const numElementValue = Math.round(numElement.value * 1);
  const minRangeValue = Math.round(minRange.value * 1) || 0;
  const maxRangeValue = Math.round(maxRange.value * 1) || 200;

  array = createRandomArray(numElementValue, minRangeValue, maxRangeValue);

  renderBars(array);
});

// Read file variable
let fileInput = document.getElementsByClassName('file-input')[0];
let contentFile;

// Type 2 Read file into an array handler
function checkArrayNumberAndCheckEmptyArray(array) {
  if (array.length == 0) {
    return false;
  }
  return array.every((el) => {
    return !isNaN(parseInt(el));
  });
}
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  // Alert when it can not read file
  reader.addEventListener('error', () => {
    alert('This file can not read');
  });

  reader.addEventListener('load', (e) => {
    contentFile = e.target.result;
    console.log(contentFile);

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

// Type 3 Create your array variable
let createArrayInput = document.getElementsByClassName('create-array-input')[0];
let createArrayBtn = document.getElementsByClassName('create-array-btn')[0];

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

// Sort array handler
function delayTimer(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
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
      let barHeaderj = barHeader[j];
      let barNumberj = barNumber[j];
      let barHeaderNextj = barHeader[j + 1];
      let barNumberNextj = barNumber[j + 1];

      barHeaderj.style.backgroundColor = 'black';
      barHeaderNextj.style.backgroundColor = 'black';
      await delayTimer(delayTime);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        barHeaderj.style.height = `${array[j] / 10 + 0.2}em`;
        barHeaderNextj.style.height = `${array[j + 1] / 10 + 0.2}em`;
        barNumberj.innerHTML = array[j];
        barNumberNextj.innerHTML = array[j + 1];

        checked = true;
      }
      barHeaderj.style.backgroundColor = 'red';
      barHeaderNextj.style.backgroundColor = 'red';
    }
    if (checked == false) {
      for (let j = 0; j < array.length - i; j++) {
        await delayTimer(delayTime);
        document.getElementsByClassName('bar-header')[j].style.backgroundColor = 'green';
      }

      await delayTimer(delayTime);
      document.getElementsByClassName('bar-header')[array.length - i].style.backgroundColor =
        'green';
      break;
    } else {
      let lastBarHeader = document.getElementsByClassName('bar-header')[array.length - 1 - i];
      lastBarHeader.style.backgroundColor = 'green';
    }
  }
  return array;
}
document.getElementsByClassName('bubble')[0].addEventListener('click', () => {
  if (!checkArrayNumberAndCheckEmptyArray(array)) {
    alert('Please create your array!');
    return null;
  }

  disableAllActivity();
  bubbleSort(array).then((data) => {
    console.log(data);
    enableAllActivity();
    enableDownloadArray();
  });
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
    }

    if (minIndex != i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      barNumber[i].innerHTML = array[i];
      barNumber[minIndex].innerHTML = array[minIndex];
      barHeader[i].style.height = `${array[i] / 10 + 0.2}em`;
      barHeader[minIndex].style.height = `${array[minIndex] / 10 + 0.2}em`;

      barHeader[minIndex].style.backgroundColor = 'red';
    }
    barHeader[i].style.backgroundColor = 'green';
  }
  return array;
}

document.getElementsByClassName('selection')[0].addEventListener('click', () => {
  if (!checkArrayNumberAndCheckEmptyArray(array)) {
    alert('Please create your array!');
    return null;
  }

  disableAllActivity();
  selectionSort(array).then((data) => {
    console.log(data);
    enableAllActivity();
    enableDownloadArray();
  });
});

// Insertion Sort
async function insertionSort(array) {
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  for (let i = 0; i < array.length; i++) {
    barHeader[i].style.backgroundColor = 'black';
    await delayTimer(delayTime);

    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      barHeader[j].style.backgroundColor = 'blue';
      await delayTimer(delayTime);

      [array[j], array[j - 1]] = [array[j - 1], array[j]];

      barNumber[j].innerHTML = array[j];
      barNumber[j - 1].innerHTML = array[j - 1];
      barHeader[j].style.height = `${array[j] / 10 + 0.2}em`;
      barHeader[j - 1].style.height = `${array[j - 1] / 10 + 0.2}em`;
      barHeader[j].style.backgroundColor = 'green';

      j--;
    }
    barHeader[i].style.backgroundColor = 'green';
  }

  return array;
}

document.getElementsByClassName('insertion')[0].addEventListener('click', () => {
  if (!checkArrayNumberAndCheckEmptyArray(array)) {
    alert('Please create your array!');
    return null;
  }

  disableAllActivity();
  insertionSort(array).then((data) => {
    console.log(data);
    enableAllActivity();
    enableDownloadArray();
  });
});

// Quick sort
// Find bigger first element
function findPivot(array, i, j) {
  let k = i + 1;
  let firstElement = array[i];

  while (k <= j && array[k] == firstElement) {
    k++;
  }

  if (k > j) {
    console.log(-1);
    return -1;
  } // If array not any element bigger return -1

  if (array[k] > firstElement) {
    console.log(k);
    return k;
  } else {
    console.log(i);
    return i;
  }
}

async function partition(array, i, j, pivot, pivotIndex) {
  let L = i,
    R = j;
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  while (L <= R) {
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

    if (L < R) {
      barHeader[L].style.backgroundColor = 'yellow';
      barHeader[R].style.backgroundColor = 'yellow';
      await delayTimer(delayTime);

      [array[L], array[R]] = [array[R], array[L]];
      barHeader[L].style.height = `${array[L] / 10 + 0.2}em`;
      barHeader[R].style.height = `${array[R] / 10 + 0.2}em`;
      barNumber[L].innerHTML = array[L];
      barNumber[R].innerHTML = array[R];
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

document.getElementsByClassName('quick')[0].addEventListener('click', () => {
  if (!checkArrayNumberAndCheckEmptyArray(array)) {
    alert('Please create your array!');
    return null;
  }

  disableAllActivity();
  quickSort(array, 0, array.length - 1).then((data) => {
    console.log(data);
    enableAllActivity();
    enableDownloadArray();
  });
});

// Heap sort
async function pushDown(array, first, last) {
  console.log(first, Math.floor((last - 1) / 2));
  let r = first;
  let left;
  let right;
  let barHeader = document.getElementsByClassName('bar-header');
  let barNumber = document.getElementsByClassName('bar-number');

  while (r <= Math.floor((last - 1) / 2)) {
    left = r * 2 + 1;
    right = r * 2 + 2;
    if (last == 2 * r + 1) {
      if (array[r] > array[last]) {
        barHeader[r].style.backgroundColor = 'yellow';
        barHeader[last].style.backgroundColor = 'yellow';
        await delayTimer(delayTime);

        [array[r], array[last]] = [array[last], array[r]];
        barHeader[r].style.height = `${array[r] / 10 + 0.2}em`;
        barHeader[last].style.height = `${array[last] / 10 + 0.2}em`;
        barNumber[r].innerHTML = array[r];
        barNumber[last].innerHTML = array[last];
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

      if (r > Math.floor((last - 1) / 2)) await delayTimer(delayTime);
    } else if (array[r] > array[left] && array[left] <= array[right]) {
      barHeader[r].style.backgroundColor = 'yellow';
      barHeader[left].style.backgroundColor = 'yellow';
      await delayTimer(delayTime);

      [array[r], array[left]] = [array[left], array[r]];
      barHeader[r].style.height = `${array[r] / 10 + 0.2}em`;
      barHeader[left].style.height = `${array[left] / 10 + 0.2}em`;
      barNumber[r].innerHTML = array[r];
      barNumber[left].innerHTML = array[left];
      await delayTimer(delayTime);

      barHeader[r].style.backgroundColor = 'blue';
      barHeader[left].style.backgroundColor = 'red';
      await delayTimer(delayTime);

      barHeader[r].style.backgroundColor = 'red';
      r = left;
      barHeader[r].style.backgroundColor = 'blue';
      await delayTimer(delayTime);

      barHeader[r].style.backgroundColor = 'red';
      if (r > Math.floor((last - 1) / 2)) await delayTimer(delayTime);
    } else if (array[r] > array[right] && array[left] > array[right]) {
      barHeader[r].style.backgroundColor = 'yellow';
      barHeader[right].style.backgroundColor = 'yellow';
      await delayTimer(delayTime);

      [array[r], array[right]] = [array[right], array[r]];
      barHeader[r].style.height = `${array[r] / 10 + 0.2}em`;
      barHeader[right].style.height = `${array[right] / 10 + 0.2}em`;
      barNumber[r].innerHTML = array[r];
      barNumber[right].innerHTML = array[right];
      await delayTimer(delayTime);

      barHeader[r].style.backgroundColor = 'blue';
      barHeader[right].style.backgroundColor = 'red';
      await delayTimer(delayTime);

      barHeader[r].style.backgroundColor = 'red';
      r = right;
      barHeader[r].style.backgroundColor = 'blue';
      await delayTimer(delayTime);

      barHeader[r].style.backgroundColor = 'red';

      if (r > Math.floor((last - 1) / 2)) await delayTimer(delayTime);
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

    [array[0], array[i]] = [array[i], array[0]];
    barHeader[0].style.height = `${array[0] / 10 + 0.2}em`;
    barHeader[i].style.height = `${array[i] / 10 + 0.2}em`;
    barNumber[0].innerHTML = array[0];
    barNumber[i].innerHTML = array[i];
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

  [array[0], array[1]] = [array[1], array[0]];
  barHeader[0].style.height = `${array[0] / 10 + 0.2}em`;
  barHeader[1].style.height = `${array[1] / 10 + 0.2}em`;
  barNumber[0].innerHTML = array[0];
  barNumber[1].innerHTML = array[1];
  await delayTimer(delayTime);
  barHeader[0].style.backgroundColor = 'green';
  barHeader[1].style.backgroundColor = 'green';

  return array;
}

document.getElementsByClassName('heap')[0].addEventListener('click', () => {
  if (!checkArrayNumberAndCheckEmptyArray(array)) {
    alert('Please create your array!');
    return null;
  }

  disableAllActivity();
  heapSort(array).then((data) => {
    console.log(data);
    enableAllActivity();
    enableDownloadArray();
  });
});
