//CONST
const A_MAKE_TEXT = 'Zapisz swoje <br> dzieło :)';
const LAST_TEXT = 'Gratulacje! <br>Ukończyłeś/łaś swój własny obraz typu "połącz kropki".';
const NEW_IMG_NAME = 'connect-the-dots.png';
const createCanvas2 = document.querySelector('.create-button')
const createCanvas3 = document.querySelector('.create-button2')
const canvas = document.querySelector('.canvas');
const canvas2 = document.querySelector('.canvas2');
const canvas3 = document.querySelector('.canvas3');
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');
const strokeWeight2 = document.querySelector('.stroke-weight2');
const clearButton2 = document.querySelector('.clear-button2');
const dotSize = document.querySelector('.dot-size-button');
const fontSize = document.querySelector('.font-size-button');
const colorButton = document.querySelector('.color-button');
const eraserButton = document.querySelector('.eraser-button');
const eraserWeight = document.querySelector('.eraser-weight');
const aMake = document.getElementById('a-make');
const screenContainer =document.querySelector('#screen-container');
const intro = document.querySelector('.intro');
const introButton = document.querySelector('.intro-button');
let number = 0;
let isDrawing2 = false;
let eraser = false;

//LISTENERS 
createCanvas2.addEventListener('click', createNewCanvas);
createCanvas3.addEventListener('click', createNewCanvas3);
clearButton2.addEventListener('click', clearCanvas2);
canvas2.addEventListener('click', dotting);
canvas3.addEventListener('mousedown', start2);
canvas3.addEventListener('mousemove', draw2);
canvas3.addEventListener('mouseup', stop2);
eraserButton.addEventListener('click', eraserTrigger)
aMake.addEventListener('click', ()=> {
    clearCanvas();
    makeScreenshot();
    document.getElementById('a-make').innerHTML= A_MAKE_TEXT;
    document.getElementById('last-text').innerHTML= LAST_TEXT;
    $('.pencil-case').css('display', 'none');
    $('.finish-button').css('font-size', '2rem');
    $('.finish-button').hover($(this).css("background-color", "#50b350"));
    $('.levels-text2').css('display', 'flex');
    $('.remake-button').css('display', 'flex');
    downloadPic();
}, false);
introButton.addEventListener('click', ()=>{
    sessionStorage.setItem('accepted', 'yes');
    $('.intro').css('display', 'none')
});
window.addEventListener('load', ()=> {
    //CONST
    const clearButton = document.querySelector('.clear-button');
    const strokeWeight = document.querySelector('.stroke-weight');
    let isDrawing = false;

    //LISTENERS
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stop);
    clearButton.addEventListener('click', clearCanvas)

    //RESIZING
    canvas.width = window.innerWidth*0.65;
    canvas.height = window.innerHeight*0.99;

    //INTRO
    if(sessionStorage.getItem('accepted') === 'yes') {
        $('.intro').css('display', 'none')
    };

    //FUNCTIONS
    function start(e) {
        isDrawing = true;
        draw(e);
    };

    function stop() {
        isDrawing = false;
        ctx.beginPath();
    };

    function draw(e) {
        if(!isDrawing) return;
        ctx.lineWidth = strokeWeight.value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#808080';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    };

});

//FUNCTIONS
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function createNewCanvas() {
    $('.canvas2').css('display', 'inline-block');
    $('.level1').css('display', 'none');
    $('.level2').css('display', 'flex');
    canvas2.width = window.innerWidth*0.65;
    canvas2.height = window.innerHeight*0.99;
};

function clearCanvas2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    number = 0;
};

function dotting(e){
    const intDotSize = parseInt(dotSize.value);
    const intFontSize = parseInt(fontSize.value);

    number++;
    ctx2.beginPath();
    ctx2.strokeStyle = '#000000';
    ctx2.fillStyle = '#000000';
    ctx2.arc(e.clientX, e.clientY, intDotSize, 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.stroke(); 
    ctx2.font = `${intFontSize}px Caveat Brush`;
    ctx2.fillText(number, e.clientX+ intDotSize+2, e.clientY);
};

function createNewCanvas3() {
    $('.level2').css('display', 'none');
    $('.level3').css('display', 'flex');
    $('.canvas3').css('display', 'inline-block')
    canvas3.width = window.innerWidth*0.65;
    canvas3.height = window.innerHeight*0.99;
};

function clearCanvas3() {
    ctx3.clearRect(0, 0, canvas2.width, canvas2.height);
    number = 0;
};

function start2(e) {
    isDrawing2 = true;
    draw2(e);
};

function stop2() {
    isDrawing2 = false;
    ctx3.beginPath();
};

function eraserTrigger(){
    if(!eraser) {
        document.getElementById('eraser-button').innerHTML = 'WYŁĄCZ';
        $('.eraser-box').css('background-color', 'rgba(255, 218, 9, 0.4)');
        $('.brush-box').css('background-color', 'rgba(255, 218, 9, 0)');
        return eraser = true;
    } else if(eraser) {
        document.getElementById('eraser-button').innerHTML = 'WŁĄCZ';
        $('.eraser-box').css('background-color', 'rgba(255, 218, 9, 0)');
        $('.brush-box').css('background-color', 'rgba(255, 218, 9, 0.4)');
        return eraser = false;
    };
};

function draw2(e) {
    if(!isDrawing2) return;
    if (!eraser){
        ctx3.lineWidth = strokeWeight2.value;
        ctx3.lineCap = 'round';
        ctx3.strokeStyle = colorButton.value;

        ctx3.lineTo(e.clientX, e.clientY);
        ctx3.stroke();
        ctx3.beginPath();
        ctx3.moveTo(e.clientX, e.clientY);
    } else {
        const eraserSize = parseInt(eraserWeight.value)
        ctx3.clearRect(e.clientX-(eraserSize/2), e.clientY-(eraserSize/2), eraserSize, eraserSize);
    };
};

function makeScreenshot() {
    html2canvas(document.querySelector("#screenshot")).then(canvas => {
        document.body.appendChild(canvas);
        canvas.id = 'canvasID';
        while (screenContainer.firstChild) { 
            screenContainer.removeChild(screenContainer.firstChild); }
        screenContainer.appendChild(canvas);
    });
};

function downloadPic() {
    aMake.href = document.getElementById('canvasID').toDataURL();
    aMake.download = NEW_IMG_NAME;
};
