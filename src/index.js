import {Draw} from "./draw";
import { Point } from "./point";
import { Optimizer } from "./optimizer";

var canvas, ctx, location, points, op;

function init(){   

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    op = new Optimizer();
    console.log(op.applyFunction(1));
    Point.CANVAS_HEIGHT = canvas.height;
    Point.CANVAS_WIDTH = canvas.width;
    console.log(Point.CANVAS_WIDTH);
    Draw.setCanvas(canvas);
    points = [];
    location = new Point(0, 0);
    document.addEventListener("pointerdown", (e) => {
        let relativeX = e.clientX - canvas.offsetLeft;
        let relativeY = e.clientY - canvas.offsetTop;
        location = new Point(relativeX, relativeY, Point.SCREEN);
        if(location.x >= 0 && location.x <= canvas.width && location.y >= 0 && location.y <= canvas.width){
            points.push(location);
            console.log(location.getGraphPoint());
        }
    });
    document.getElementById("input").addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            submitPoint();
        }
    })

    document.getElementById("optimize").addEventListener("click", (e) => {
        if(document.getElementById("linear").checked)
            op.degree = 1;
        else
            op.degree = 2;
        op.optimize(points);
    })

    document.getElementById("stop").addEventListener("click", (e) => {
        op.finished = true;
    })

    document.getElementById("clear").addEventListener("click", (e) => {
        points = [];
    })

    document.getElementById("linear").addEventListener("click", (e) => {
        op.degree = 1;
        op.func = Optimizer.PRESETS[1];
    })

    document.getElementById("quadratic").addEventListener("click", (e) => {
        op.degree = 2;
        op.func = Optimizer.PRESETS[2];
    })
}




//init();
//setInterval(frame, 20);
