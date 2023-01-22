let container = document.getElementById("container");
let start_button = document.getElementById("start");
let sort_type = document.getElementById("sort_type");
let min = 1, max = 400; // min and max values
let array = [];
let bars = [];

function generateArray(array_lenght){
    array = []
    for (let i = 0; i < array_lenght; i++){
        array.push(Math.floor(Math.random() * (max - min + 1) + min));
    }

    for (let i = 0; i < array.length; i++){
        let bar = document.createElement("div");
        bar.className = "bar"
        bar.style.height = array[i] + "px";
        bars.push(bar);
    }
}

function clearContainer(){
    container.innerHTML = " ";
    start_button.style.display = "";
    array = [];
    bars = [];
}

function drawBars(bars){
    for (let i = 0; i < array.length; i++){
        container.appendChild(bars[i]);
    }
}

function sort(sort_type){
    if (sort_type.value == "selection_sort"){
        selectionSort(array,bars);
    }

    if (sort_type.value == "bubble_sort"){
        bubbleSort(array,bars);
    }

    if (sort_type.value == "insertion_sort"){
        insertionSort(array,bars);
    }
}

function run(){
    delay = document.getElementById("iteration_speed");
    delay = parseInt(delay.value);
    start_button.style.display = "none";
    let array_lenght = document.getElementById("array_lenght").value;
    generateArray(array_lenght);
    drawBars(bars);
    sort(sort_type);
}

async function finishVisual(){
    for (let i = 0; i < bars.length; i++){
        bars[i].style.background = "rgb(0, 173, 181)";
        await sleep(30);
    }

    await sleep(500);

    for (let i = 0; i < bars.length; i++){
        bars[i].style.background = "gray";
    }
}