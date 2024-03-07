let blocksParent = document.querySelector("#blocks-Parent");
let triesCount = document.querySelector(".tries span");
let failureSound = document.querySelector("#failureSound");
let successSound = document.querySelector("#successSound");
let controlReplay = document.querySelector(".control-replay");
let replay = document.querySelector(".control-replay span");

let blocks = Array.from(blocksParent.children);

let orderRange = [...Array(blocks.length).keys()]

let duration = 1000;

document.querySelector(".control-start span").addEventListener("click", ()=>{
    let theName = prompt("Please Write your name");

    if (theName == null || theName == "") {
        document.querySelector(".name").innerText = "Unknown";
    } else {
        document.querySelector(".name span").innerText = theName;
    }
    document.querySelector(".control-start").remove();
})

shuffle(orderRange);

reorder();

function flip(block) {
    block.firstElementChild.style.transform = "rotateY(180deg)";
    block.lastElementChild.style.transform = "rotateY(0)";
    let allFlipped = blocks.filter((b)=>b.classList.contains("flipped"));
    if (allFlipped.length == 2) {
        preventClicking();
        checkMatching(allFlipped[0], allFlipped[1]);
    }
}

function preventClicking() {
    blocksParent.classList.add("prevent-click");
    setTimeout(() => {
        blocksParent.classList.remove("prevent-click");
    }, duration);
}

function checkMatching(first, second) {
    if (first.dataset.alpha === second.dataset.alpha) {

        first.classList.remove("flipped");

        second.classList.remove("flipped");

        first.classList.add("matched");

        second.classList.add("matched");
        successSound.play();
        restart();
    } else{
        failureSound.play();
        triesCount.innerHTML++;
        setTimeout(() => {
            first.classList.remove("flipped");
            first.firstElementChild.style.transform = "rotateY(0)";
            first.lastElementChild.style.transform = "rotateY(180deg)";
            second.classList.remove("flipped");
            second.firstElementChild.style.transform = "rotateY(0)";
            second.lastElementChild.style.transform = "rotateY(180deg)";
        }, duration);
    }
}

// Shuffles array in place using Fisher-Yates algorithm
function shuffle(arr) {
    let cur = arr.length,
    temp,
    random;

    while (cur > 0) {
        random = Math.floor(Math.random() * cur);
        cur--;
        
        temp = arr[cur];
        arr[cur] = arr[random];
        arr[random] = temp;
    }
    return arr;
}

function reorder() {
    blocks.forEach((block, index)=>{
        block.style.order = orderRange[index];
    
        block.addEventListener("click", ()=>{
            block.classList.add("flipped")
            flip(block);
        })
    })
}

function restart() {
    let matchedCounter = blocks.filter((block) => block.classList.contains("matched")).length;
    if (matchedCounter == 20) {
        controlReplay.style.display = "flex";
        replay.addEventListener("click", ()=>{
            playAgain();
        })
    }
}

function playAgain() {
    blocks.forEach((b)=>{
        b.classList.remove("matched");
        b.firstElementChild.style.transform = "rotateY(0)";
        b.lastElementChild.style.transform = "rotateY(180deg)";
    })
    
    controlReplay.style.display = "none";
    
    shuffle(orderRange);
    blocks.forEach((block, index)=>{
        block.style.order = orderRange[index];
    })
    triesCount.innerHTML = "0";
}