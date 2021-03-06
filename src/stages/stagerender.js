import {getTransparency} from "main/vfx/transparency";
import {bg1, bg2, fg1, fg2, layers} from "main/main";
import {targetDestroyed} from "target/targetplay";
import {rotateVector, twoPi} from "main/render";
import {activeStage} from "stages/activeStage";
import {Vec2D} from "../main/util/Vec2D";

/* eslint-disable */

const bgPos = [[-30, 500, 300, 500, 900, 500, 1230, 450, 358], [-30, 400, 300, 400, 900, 400, 1230, 350, 179]];
const direction = [[1, -1, 1, -1, 1, -1, 1, -1, 1], [-1, 1, -1, 1, -1, 1, -1, 1, -1]];
export let boxFill = "rgba(0, 0, 0, 0.1)";


const bgStars = [];
for (var p = 0; p < 20; p++) {
    bgStars[p] = new bgStar();
    bgStars[p].pos = new Vec2D(600 + 100 * Math.random() * bgStars[p].velocity.x, 375 + 100 * Math.random() * bgStars[p].velocity.y);
}
let bgSparkle = 3;
let gridGrad = "rgba(94,173,255,0.2)";

const circleSize = [];
for (var i = 0; i < 5; i++) {
    circleSize[i] = i * 40;
}
let ang = 0;
export let backgroundType = 0;

export function drawStageInit() {
    fg1.strokeStyle = "#db80cc";
    fg1.lineWidth = 1;
    for (var j = 0; j < activeStage.ground.length; j++) {
        fg1.beginPath();
        fg1.moveTo((activeStage.ground[j][0].x * activeStage.scale) + activeStage.offset[0], (activeStage.ground[j][0].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.lineTo((activeStage.ground[j][1].x * activeStage.scale) + activeStage.offset[0], (activeStage.ground[j][1].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.closePath();
        fg1.stroke();
    }
    fg1.strokeStyle = "#ed6767";
    for (var j = 0; j < activeStage.ceiling.length; j++) {
        fg1.beginPath();
        fg1.moveTo((activeStage.ceiling[j][0].x * activeStage.scale) + activeStage.offset[0], (activeStage.ceiling[j][0].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.lineTo((activeStage.ceiling[j][1].x * activeStage.scale) + activeStage.offset[0], (activeStage.ceiling[j][1].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.closePath();
        fg1.stroke();
    }
    fg1.strokeStyle = "#4794c6";
    for (var j = 0; j < activeStage.platform.length; j++) {
        if (j != activeStage.movingPlat) {
            fg1.beginPath();
            fg1.moveTo((activeStage.platform[j][0].x * activeStage.scale) + activeStage.offset[0], (activeStage.platform[j][0].y * -activeStage.scale) + activeStage.offset[1]);
            fg1.lineTo((activeStage.platform[j][1].x * activeStage.scale) + activeStage.offset[0], (activeStage.platform[j][1].y * -activeStage.scale) + activeStage.offset[1]);
            fg1.closePath();
            fg1.stroke();
        }
    }
    fg1.strokeStyle = "#47c648";
    for (var k = 0; k < activeStage.wallL.length; k++) {
        fg1.beginPath();
        fg1.moveTo((activeStage.wallL[k][0].x * activeStage.scale) + activeStage.offset[0], (activeStage.wallL[k][0].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.lineTo((activeStage.wallL[k][1].x * activeStage.scale) + activeStage.offset[0], (activeStage.wallL[k][1].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.closePath();
        fg1.stroke();
    }
    fg1.strokeStyle = "#9867de";
    for (var l = 0; l < activeStage.wallR.length; l++) {
        fg1.beginPath();
        fg1.moveTo((activeStage.wallR[l][0].x * activeStage.scale) + activeStage.offset[0], (activeStage.wallR[l][0].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.lineTo((activeStage.wallR[l][1].x * activeStage.scale) + activeStage.offset[0], (activeStage.wallR[l][1].y * -activeStage.scale) + activeStage.offset[1]);
        fg1.closePath();
        fg1.stroke();
    }
};

export function drawStage() {
    if (activeStage.movingPlat > -1) {
        fg2.strokeStyle = "#4794c6";
        fg2.beginPath();
        fg2.moveTo((activeStage.platform[activeStage.movingPlat][0].x * activeStage.scale) + activeStage.offset[0], (activeStage.platform[activeStage.movingPlat][0].y * -activeStage.scale) + activeStage.offset[1]);
        fg2.lineTo((activeStage.platform[activeStage.movingPlat][1].x * activeStage.scale) + activeStage.offset[0], (activeStage.platform[activeStage.movingPlat][1].y * -activeStage.scale) + activeStage.offset[1]);
        fg2.closePath();
        fg2.stroke();
    }
    fg2.fillStyle = boxFill;

    for (var j = 0; j < activeStage.box.length; j++) {
        fg2.fillRect((activeStage.box[j].min.x * activeStage.scale) + activeStage.offset[0], (activeStage.box[j].max.y * -activeStage.scale) + activeStage.offset[1], (activeStage.box[j].max.x - activeStage.box[j].min.x) * activeStage.scale, (activeStage.box[j].max.y - activeStage.box[j].min.y) * activeStage.scale);
    }
    fg2.strokeStyle = "#e7a44c";
    for (var j = 0; j < activeStage.ledge.length; j++) {
        var e = activeStage.ledge[j];
        fg2.beginPath();
        if (e[1]) {
            fg2.moveTo(activeStage.box[e[0]].max.x * activeStage.scale + activeStage.offset[0], (activeStage.box[e[0]].max.y - Math.min(10, (activeStage.box[e[0]].max.y - activeStage.box[e[0]].min.y) / 2)) * -activeStage.scale + activeStage.offset[1]);
            fg2.lineTo(activeStage.box[e[0]].max.x * activeStage.scale + activeStage.offset[0], activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1]);
            fg2.lineTo((activeStage.box[e[0]].max.x - Math.min(10, (activeStage.box[e[0]].max.x - activeStage.box[e[0]].min.x) / 2)) * activeStage.scale + activeStage.offset[0], activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1]);
        }
        else {
            fg2.moveTo(activeStage.box[e[0]].min.x * activeStage.scale + activeStage.offset[0], (activeStage.box[e[0]].max.y - Math.min(10, (activeStage.box[e[0]].max.y - activeStage.box[e[0]].min.y) / 2)) * -activeStage.scale + activeStage.offset[1]);
            fg2.lineTo(activeStage.box[e[0]].min.x * activeStage.scale + activeStage.offset[0], activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1]);
            fg2.lineTo((activeStage.box[e[0]].min.x + Math.min(10, (activeStage.box[e[0]].max.x - activeStage.box[e[0]].min.x) / 2)) * activeStage.scale + activeStage.offset[0], activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1]);
        }
        fg2.closePath();
        fg2.stroke();
        fg2.fill();
        fg2.fill();
    }
    if (typeof activeStage.target != "undefined") {
        for (var k = 0; k < activeStage.target.length; k++) {
            if (!targetDestroyed[k]) {
                var x = activeStage.target[k].x * activeStage.scale + activeStage.offset[0];
                var y = activeStage.target[k].y * -activeStage.scale + activeStage.offset[1];
                for (var j = 0; j < 5; j++) {
                    fg2.fillStyle = (j % 2) ? "white" : "red";
                    fg2.beginPath();
                    fg2.arc(x, y, (25 - j * 5) * (activeStage.scale / 4.5), 0, twoPi);
                    fg2.closePath();
                    fg2.fill();
                }
            }
        }
    }
};

export function setBackgroundType(val) {
    backgroundType = val;
};
export function bgStar() {
    var vSeed = Math.random();
    this.velocity = new Vec2D(5 * vSeed * Math.sign(0.5 - Math.random()), 5 * (1 - vSeed) * Math.sign(0.5 - Math.random()));
    if (getTransparency()) {
        this.colour = "hsl(" + 358 * Math.random() + ", 100%, 50%)";
    }
    else {
        this.colour = "hsl(" + 358 * Math.random() + ",100%,15%)"
    }
    this.pos = new Vec2D(0, 0);
    this.life = 0;
};
export function drawBackgroundInit() {
    var bgGrad = bg1.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "rgb(24, 17, 66)");
    bgGrad.addColorStop(1, "black");
    bg1.fillStyle = bgGrad;
    bg1.fillRect(-100, -100, layers.BG1.width + 200, layers.BG1.height + 200);
    ;
    if (backgroundType == 1) {
        let gridGrad = bg2.createRadialGradient(600, 375, 1, 600, 375, 800);
        gridGrad.addColorStop(0, "rgba(94, 173, 255, 0)");
        gridGrad.addColorStop(1, "rgba(94, 173, 255, 0.2)");
        bg2.strokeStyle = gridGrad;
        boxFill = "rgba(94, 173, 255, 0.3)";
    }
};

export function drawBackground() {
    if (backgroundType == 0) {
        drawStars();
    }
    else {
        drawTunnel();
    }
};

export function drawTunnel() {
    bg2.lineWidth = 2;
    ang += 0.005;
    var angB = ang;
    bg2.beginPath();
    for (var i = 0; i < 16; i++) {
        var v = rotateVector(0, 800, angB);
        bg2.moveTo(600, 375);
        bg2.lineTo(600 + v.x, 375 + v.y);
        angB += Math.PI / 8;
    }
    bg2.stroke();
    for (var i = 0; i < circleSize.length; i++) {
        circleSize[i]++;
        if (circleSize[i] > 200) {
            circleSize[i] = 0;
        }
        bg2.lineWidth = Math.max(1, Math.round(3 * (circleSize[i] / 60)));
        bg2.beginPath();
        bg2.arc(600, 375, circleSize[i] * 4, 0, twoPi);
        bg2.closePath();
        bg2.stroke();
    }
};

export function drawStars() {
    bgSparkle--;
    for (var p = 0; p < 20; p++) {
        if (bgStars[p].pos.x > 1250 || bgStars[p].pos.y > 800 || bgStars[p].pos.x < -50 || bgStars[p].pos.y < -50) {
            bgStars[p].pos = new Vec2D(600, 375);
            bgStars[p].life = 0;
            var vSeed = Math.random();
            bgStars[p].velocity = new Vec2D(5 * vSeed * Math.sign(0.5 - Math.random()), 5 * (1 - vSeed) * Math.sign(0.5 - Math.random()));
        }
        bgStars[p].pos.x += bgStars[p].velocity.x;
        bgStars[p].pos.y += bgStars[p].velocity.y;

        bgStars[p].life++;

        if (bgSparkle == 0) {
            bg2.fillStyle = bgStars[p].colour;
            if (getTransparency()) {
                bg2.globalAlpha = Math.min(bgStars[p].life / 300, 1);
            }
            bg2.beginPath();
            bg2.arc(bgStars[p].pos.x, bgStars[p].pos.y, 5, twoPi, 0);
            ;
            bg2.fill();

        }
    }
    if (bgSparkle == 0) {
        bgSparkle = 2;
    }
    bg2.globalAlpha = 1;
    for (var k = 1; k > -1; k--) {
        for (var j = 0; j < 9; j++) {
            //bgPos[j] += direction[j]*5*Math.random();
            if (j == 8) {
                bgPos[k][j] += direction[k][j] * 0.2 * Math.random();
            }
            else {
                bgPos[k][j] += direction[k][j] * 1 * Math.random();
            }
            switch (j) {
                case 0:
                    if ((direction[k][j] == 1 && bgPos[k][j] > -10) || (direction[k][j] == -1 && bgPos[k][j] < -200)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 1:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 550 - k * 100) || (direction[k][j] == -1 && bgPos[k][j] < 450 - k * 100)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 2:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 550) || (direction[k][j] == -1 && bgPos[k][j] < 0)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 3:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 550 - k * 100) || (direction[k][j] == -1 && bgPos[k][j] < 450 - k * 100)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 4:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 1150) || (direction[k][j] == -1 && bgPos[k][j] < 600)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 5:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 550 - k * 100) || (direction[k][j] == -1 && bgPos[k][j] < 450 - k * 100)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 6:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 1400) || (direction[k][j] == -1 && bgPos[k][j] < 1210)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 7:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 550 - k * 100) || (direction[k][j] == -1 && bgPos[k][j] < 450 - k * 100)) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 8:
                    if ((direction[k][j] == 1 && bgPos[k][j] > 357) || (direction[k][j] == -1 && bgPos[k][j] < 1)) {
                        direction[k][j] *= -1;
                    }
                    break;
                default:
                    break;
            }
        }
        if (getTransparency()) {
            boxFill = "hsla(" + bgPos[k][8] + ", 100%, 50%, " + (0.15 - k * 0.07) + ")";
        }
        else {
            boxFill = "hsl(" + bgPos[k][8] + ", 100%, 7%)";
        }
        bg2.fillStyle = boxFill;
        bg2.beginPath();
        bg2.moveTo(bgPos[k][0], bgPos[k][1]);
        bg2.bezierCurveTo(bgPos[k][2], bgPos[k][3], bgPos[k][4], bgPos[k][5], bgPos[k][6], bgPos[k][7]);
        if (k == 1) {
            bg2.lineTo(bgPos[0][6], bgPos[0][7]);
            bg2.bezierCurveTo(bgPos[0][4], bgPos[0][5], bgPos[0][2], bgPos[0][3], bgPos[0][0], bgPos[0][1]);
        }
        else {
            bg2.lineTo(1200, 750);
            bg2.lineTo(0, 750);
        }
        bg2.closePath();
        bg2.fill();
    }
};
