/**
 * Created by ColemanNiki on 2016/9/25.
 */
function Star() {
    this.x;
    this.y;
    this.runX;
    this.runY;
    this.row;
    this.col;
}

var starList = [],
    mouseX,
    mouseCol,
    mouseY,
    mouseRow,
    screenX = 1000,
    screenY = 500,
    starNumber = 25;

window.onload = function () {
    initStar();
    drawStar();
};

function initStar() {
    screenY = document.body.offsetHeight - 4;
    screenX = document.body.offsetWidth - 4;
    document.getElementById('canvas').width = screenX;
    document.getElementById('canvas').height = screenY;
    starNumber = screenX * screenY / 12000;
    for (var i = 0; i < starNumber; i++) {
        var star = new Star();
        star.x = Math.random() * screenX;
        star.y = Math.random() * screenY;
        star.runX = 0.75 * (Math.random() * 2 - 1);
        star.runY = 0.75 * (Math.random() * 2 - 1);
        star.row = star.y / 60;
        star.col = star.x / 60;
        starList.push(star);
    }
    mouseX = 0;
    mouseY = 0;
}

function getMouse(event) {
    mouseX = event.pageX;
    mouseCol = mouseX / 60;
    mouseY = event.pageY;
    mouseRow = mouseY / 60;
}

function drawStar() {
    var canvas = document.getElementById('canvas');
    var cans = canvas.getContext('2d');
    cans.clearRect(0, 0, screenX, screenY);
    cans.fillStyle = 'rgba(255,255,255,0.2)';
    for (var index = 0; index < starList.length; index++) {
        cans.beginPath();
        cans.arc(starList[index].x, starList[index].y, 2, 0, Math.PI * 2, true);
        starRun(starList[index]);
        if (Math.pow((mouseCol - starList[index].col), 2) + Math.pow((mouseRow - starList[index].row), 2) <= 8) {
            var distance = Math.pow((starList[index].x - mouseX), 2) + Math.pow((starList[index].y - mouseY), 2);
            if (distance <= 16000) {
                cans.strokeStyle = 'rgba(255,255,255,' + 2000 / (distance + 6000) + ')';
                cans.moveTo(starList[index].x, starList[index].y);
                cans.lineTo(mouseX, mouseY);
                cans.stroke();
            }
        }
        for (var next = index + 1; next < starList.length; next++) {
            if (Math.pow((starList[next].col - starList[index].col), 2) + Math.pow((starList[next].row - starList[index].row), 2) <= 2) {
                var distance = Math.pow((starList[index].x - starList[next].x), 2) + Math.pow((starList[index].y - starList[next].y), 2);
                if (distance <= 5000) {
                    cans.strokeStyle = 'rgba(255,255,255,' + 2000 / (distance + 6000) + ')';
                    cans.moveTo(starList[index].x, starList[index].y);
                    cans.lineTo(starList[next].x, starList[next].y);
                    cans.stroke();
                }
            }
        }
        cans.closePath();
        cans.fill();
    }
    requestAnimationFrame(drawStar);
}

function starRun(star) {
    star.x += star.runX;
    star.y += star.runY;
    if (star.x <= 0 || star.x >= screenX)
        star.runX = -star.runX;
    if (star.y <= 0 || star.y >= screenY)
        star.runY = -star.runY;
    star.row = star.y / 60;
    star.col = star.x / 60;
}

function addStar() {
    for (var i = 0; i < 3; i++) {
        var star = new Star();
        star.x = mouseX;
        star.y = mouseY;
        star.runX = 0.75 * (Math.random() * 2 - 1);
        star.runY = 0.75 * (Math.random() * 2 - 1);
        starList.push(star);
    }
}