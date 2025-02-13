const playButton = document.getElementById('playPauseButton');
const newButton = document.getElementById('newRoundButton');
const slider = document.getElementById('slider');
const displayNum = document.getElementById('displayNum1'); 
const displayNum2 = document.getElementById('displayNum2');
const displayNum3 = document.getElementById('displayNum3'); 
const circle = document.getElementById('displayCircle1');
const circle2 = document.getElementById('displayCircle2');
const circle3 = document.getElementById('displayCircle3');
const sampleRow = document.getElementById('sampleRow');
const bingo = document.getElementById('bingo');
const select = document.getElementById('select');


const bingos = [];
const selected = [];
const aahwagga = [];

for (let i = 0; i < 75; i++) {
    selected[i] = false;
}

generateCircles();

playButton.addEventListener('click', playOrPause);
newButton.addEventListener('click', newRound); 
select.addEventListener('change', changeBingo);

slider.addEventListener('input', () => {
    if (playing) play(); // Restart with new interval
});

var round = 0;
var nums;
var playing = false; 
var isNewRound = true;
var myInterval;


function playOrPause() { // play/pause
    if (playing) {
        playing = false;
        pause();
    } else {
        if (isNewRound) {
            newRound();
            isNewRound = false;
        }
        playing = true;
        play();
    }
}
 //   https://stackoverflow.com/questions/35091376/adding-an-image-multiple-times-in-javascript
 
function generateCircles() {
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 15; i++) {
            var n = (15 * j ) + i + 1;
            var circles  = document.createElement("img"); // setAttribute()?
            circles.id = "circle" + n ;
            circles.src = "https://codehs.com/uploads/176540e66397bf0b3201f4bb9a7449fd"; 
            

            var text = document.createElement("h1");
            text.id = "text" + n;
            text.innerHTML = printNum(n); // should be within the circle... figure out later!
            var circleX = 300 + (90 * j);
            var circleY = 20 + (90 * i);
            var textY = circleY + 10;
            circles.style.position = "absolute";
            circles.style.top = circleX + "px";
            circles.style.left = circleY + "px";
            circles.style.width = "80px";
            circles.style.height = "80px";
            
            text.style.position = "absolute";
            text.style.textAlign = "center";
            text.style.top = circleX + "px";
            text.style.left = textY + "px";
            
            sampleRow.appendChild(circles);
            sampleRow.appendChild(text);
        }
    }
 }
 
 
function newRound() {
    pause();
    round = 0;
    nums = generate();
    playing = false;
    displayNum.textContent = '##'; 
    displayNum2.textContent = '##'; 
    displayNum3.textContent = '##'; 
    for (var k = 0; k < 5; k++) {
        for (var l = 0; l < 15; l++) {
            var n = (15 * k ) + l + 1;
            var circleSelected = document.getElementById('circle' + n);
            circleSelected.src = "https://codehs.com/uploads/176540e66397bf0b3201f4bb9a7449fd"; 
            document.getElementById('text' + n).style.color = "#000000";
        }
    }
}


//display stuff :sob:

function oneRound() {
    if (!nums || round >= nums.length) {
        console.log("No more numbers to display.");
        isNewRound = true;
        playing = false;
        pause();
        
            let isReset = true;// The automatic check for repeats or skips when the list if fully runned through
            let noRepeats = true;
            let noSkips = true;
            
            for (let i = 0; i < 75; i++) { 
            if (selected[i] === true) { // checks for reset
                isReset = false;
            }
            }
                
            
            for (let i = 0; i < nums.length - 1; i++) {
                if (parseInt(nums[i].slice(1)) === parseInt(nums[i + 1].slice(1))) {
                    noRepeats = false;
                }
                if (nums[i + 1] - nums[i] > 1) {
                    noSkips = false;
                }
            }
            
            console.log(isReset + " - full reset");
            console.log(noRepeats + " - no repeats");
            console.log(noSkips + " - no skips"); //End of automatic check for skips and repeats
            
        return;
    }
    // setTimeout(() => {
    //     displayNum.textContent = nums[round];
    //     round++;
    // }, slider.value * 1000); // Delay by slider value in seconds
    
    let myAudio = document.querySelector('#ding');
    myAudio.load();
    myAudio.play();
    
    displayNum.textContent = nums[round];
    displayNum2.textContent = nums[round - 1];
    displayNum3.textContent = nums[round - 2];
    var n = nums[round].replace(/\D/g, "");
    var circleSelected = document.getElementById('circle' + n);
    circleSelected.src = "https://codehs.com/uploads/83ef29afa8558ba9ae2ab2ebd2cd42ee"; 
    document.getElementById('text' + n).style.color = "#ffffff";
    round++;
}

function play() {
    playButton.src = "https://codehs.com/uploads/6d3d84f1f59427d5c3d36d85d7ebba43";
    var interval = slider.value * 100;
    console.log(interval);
    clearInterval(myInterval);
    myInterval = setInterval(oneRound, interval); // Use slider value for interval
    console.log("Playing");
}

function pause() {
    playButton.src = "https://codehs.com/uploads/e36fe109f38592ab93dc1bcee09307e7";
    clearInterval(myInterval);
    console.log("Paused");
}


function generate() { // generates entire Bingo set
    reset();
    bingos.length = 0;
    for (let i = 0; i < 75; i++) {
        generateNumber(selected);
    }
    for (let i = 0; i < aahwagga.length; i++) {
        bingos[i] = printNum(aahwagga[i]);
    }
    reset();
    return bingos;
}

function reset() {
    for (let i = 0; i < 75; i++) {
        selected[i] = false;
    }
    aahwagga.length = 0;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
} 

function generateNumber(selected) { // generates a number for bingo purposes
    let n;
    do {
        n = getRandomInt(75);
    } while (selected[n]); // Ensures unique number selection

    selected[n] = true;
    aahwagga.push(n + 1);
}

function changeBingo() {
    selectElement = document.querySelector('select');
    var choice = selectElement.value;
    if(choice == 'Regular'){
        bingo.src = "https://codehs.com/uploads/09d13bf6208a2925ac6d4b88982fbea5"; 
    }
    if(choice == 'X'){
        bingo.src = "https://codehs.com/uploads/c904ea35bb10c56df0d02e3fd863a3e1"; 
    }
    if(choice == 'BlackOut'){
        bingo.src = "https://codehs.com/uploads/0f61dd722a2f523e1461b3b893f3ea79"; 
    }
    if(choice == 'O'){
        bingo.src = "https://codehs.com/uploads/eb570b28149d2bb2a8da08899374f012"; 
    }
    if(choice == 'C'){
        bingo.src = "https://codehs.com/uploads/848acd7ca5eec54bd69c186cf5ec5497"; 
    }
    if(choice == 'H'){
        bingo.src = "https://codehs.com/uploads/9cc45244559e90c275e6d95cfa85857b"; 
    }
    if(choice == 'S'){
        bingo.src = "https://codehs.com/uploads/4d507502597b6ec97f1fdd7065d7e1e4"; 
    }
}

function printNum(num) {
    if (num > 0) {
        if (num <= 15) {
            return "B" + num;
        } else if (num <= 30) {
            return "I" + num;
        } else if (num <= 45) {
            return "N" + num;
        } else if (num <= 60) {
            return "G" + num;
        } else if (num <= 75) {
            return "O" + num;
        } 
    }
    return "invalid " + num;
}
