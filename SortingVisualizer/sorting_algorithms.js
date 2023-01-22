let delay = 25

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function selectionSort(array,bars) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.background = "rgb(0, 173, 181)";
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            await sleep(delay);
            bars[j].style.background = "gray";
        }
        let temp = array[i];
        array[i] = array[minIndex];
        bars[i].style.height = array[minIndex] + "px";
        array[minIndex] = temp;
        bars[minIndex].style.height = temp + "px";
    }
    return finishVisual();
}

async function bubbleSort(array,bars){
    for (let i = 0; i < array.length - 1; i++){
        for (let j = 0; j < array.length-i-1; j++){
            bars[j+1].style.background = "rgb(0, 173, 181)";
            if(array[j] > array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                bars[j].style.height = array[j+1] + "px";
                array[j+1] = temp;
                bars[j+1].style.height = temp + "px";
            }
            await sleep(delay);
            bars[j+1].style.background = "gray";
        }
    }
    return finishVisual();
}

async function insertionSort(array, bars) 
{ 
    for (let i = 1; i < array.length; i++)
    { 
        let key = array[i]; 
        let j = i - 1; 

        while (j >= 0 && array[j] > key)
        { 
            bars[j+1].style.background = "rgb(0, 173, 181)";
            array[j + 1] = array[j];
            bars[j+1].style.height = array[j] + "px";
            await sleep(delay);
            bars[j+1].style.background = "gray";
            j = j - 1; 
        } 
        bars[j+1].style.background = "rgb(0, 173, 181)";
        array[j + 1] = key;
        bars[j+1].style.height = key + "px";
        await sleep(delay);
        bars[j+1].style.background = "gray";
    }
    return finishVisual();
} 