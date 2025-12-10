// Model Viewer Animation Script

const modelViewer = document.getElementById('model');

let angle = 0;
let direction = 1;
const speed = 0.2;
const maxAngle = 360;

function animate(){
    angle -=direction *speed;
    
    modelViewer.cameraOrbit = `${angle}deg 75deg auto`;
    requestAnimationFrame(animate);
}
modelViewer.addEventListener('load', () => {
    animate();
});

// Title animation

const text= "JETRIX DRIFT"

const titleElement = document.getElementById('line')
const cursor = document.getElementById('cursor')
let index = 0;

const baseDelay = 100;
const puaseBetween = 500;

function typing(){
    if(index <text.length){
        titleElement.textContent +=text[index];
        index++;
        // moveCursor();
        setTimeout(typing, baseDelay);
    }else{
        setInterval(() => {
            cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible';}, 500);
    }
}

function moveCursor(){
    const rect = titleElement.getBoundingClientRect();
    const parentRect = titleElement.parentElement.getBoundingClientRect();
    const left = rect.width;
    cursor.style.position = 'absolute';
    cursor.style.left = left+'px';
}

typing();
