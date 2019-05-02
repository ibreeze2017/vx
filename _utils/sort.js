"use strict";
exports.__esModule = true;
function swap(arr, src, dst) {
    var temp = arr[src];
    arr[src] = arr[dst];
    arr[dst] = temp;
}
/**
 * 冒泡排序
 * @param arr
 */
function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}
exports.bubbleSort = bubbleSort;
/**
 * 选择排序
 * @param arr
 */
function selectSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        var min = i;
        for (var j = i + 1; j < arr.length; j++) {
            var cur = arr[j];
            if (cur < arr[min]) {
                min = j;
            }
        }
        swap(arr, min, i);
    }
    return arr;
}
exports.selectSort = selectSort;
/**
 * 直接插入排序
 * @param arr
 */
function insertSort(arr) {
    var j;
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i];
        for (j = i - 1; j > -1 && arr[j] > temp; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = temp;
    }
    return arr;
}
exports.insertSort = insertSort;
/**
 * 折半插入排序
 * @param arr
 */
function binaryInsertSort(arr) {
    var j;
    for (var i = 0; i < arr.length; i++) {
        var low = 0;
        var high = i - 1;
        var temp = arr[i];
        while (low <= high) {
            var m = Math.floor((low + high) / 2);
            if (arr[m] > arr[i]) {
                high = m - 1;
            }
            else {
                low = m + 1;
            }
        }
        for (j = i - 1; j > high; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = temp;
    }
    return arr;
}
exports.binaryInsertSort = binaryInsertSort;
function partQuick(arr, left, right) {
    var m = Math.floor((left + right) / 2);
    var i = left, j = right;
    while (i <= j) {
        while (arr[i] < arr[m]) {
            i++;
        }
        while (arr[j] > arr[m]) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}
/**
 * 快速排序
 * @param arr
 * @param left
 * @param right
 */
function quickSort(arr, left, right) {
    left = left || 0;
    right = right || arr.length - 1;
    var idx = partQuick(arr, left, right);
    if (left < idx - 1) {
        quickSort(arr, left, idx - 1);
    }
    if (right > idx) {
        quickSort(arr, idx, right);
    }
    return arr;
}
exports.quickSort = quickSort;
function merge(left, right) {
    var result = [];
    var idxLeft = 0, idxRight = 0;
    while (idxLeft < left.length && idxRight < right.length) {
        if (left[idxLeft] < right[idxRight]) {
            result.push(left[idxLeft++]);
        }
        else {
            result.push(right[idxRight++]);
        }
    }
    console.log(result);
    return result.concat(left.slice(idxLeft)).concat(right.slice(idxRight));
}
/**
 * 归并排序
 * @param arr
 */
function mergeSort(arr) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var sep = Math.floor(len / 2);
    var left = arr.slice(0, sep);
    var right = arr.slice(sep);
    return merge(mergeSort(left), mergeSort(right));
}
exports.mergeSort = mergeSort;
/**
 * 希尔排序
 * @param arr
 */
function shellSort(arr) {
    var gap = Math.floor(arr.length / 2);
    var j, temp;
    while (gap >= 1) {
        for (var i = gap; i < arr.length; i++) {
            temp = arr[i];
            for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
        gap /= 2;
    }
    return arr;
}
exports.shellSort = shellSort;
var a = [2, 10, 2, 100, 23, 24, 11, 10];
console.log(shellSort(a));
