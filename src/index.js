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

const frame = () => {

    Draw.fillRect(0, 0, canvas.width, canvas.height, Draw.WHITE);
    Draw.strokeRect(0, 0, canvas.width, canvas.height, Draw.BLACK);

    Draw.drawLine(30, canvas.height - 30, canvas.width - 30, canvas.height - 30);
    Draw.drawLine(30, canvas.height - 30, 30, 30);

    for(let i = 0; i < points.length; i++){
        let point = points[i];
        Draw.fillCircle(point.x, point.y, 3, Draw.BLACK);
    }

    Draw.drawFunction(op.func);
    if(!op.finished)
        op.epoch(points);
}

const submitPoint = () => {
    let input = document.getElementById("input").value;
    let out = "";
    for(let i = 0; i < input.length; i++){
        if(input.charAt(i) === ',' || (input.charCodeAt(i) >= "0".charCodeAt(0) && input.charCodeAt(i) <= "9".charCodeAt(0)  ))
            out += input.charAt(i);
    }
    let nums = out.split(",");
    if(nums.length < 2)
        return;
    let x = parseInt(nums[0], 10);
    let y = parseInt(nums[1], 10);
    console.log(new Point(x, y));

    points.push(new Point(x, y, Point.GRAPH).getScreenPoint())
    document.getElementById("input").value = "";    
}
init();
setInterval(frame, 20);
