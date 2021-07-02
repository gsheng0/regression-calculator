import {Point} from "./point";

export class Draw {
    static ctx = undefined;
    static WHITE = "white";
    static BLACK = "#000000";
    static CANVAS = undefined;

    static setCanvas(canvas){
        Draw.CANVAS = canvas;
        Draw.ctx = canvas.getContext("2d");
    }

    static fillRect(x, y, width, height, color){
        let ctx = Draw.ctx;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.closePath();
    }

    static strokeRect(x, y, width, height, color){
        let ctx = Draw.ctx;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.rect(x, y, width, height);
        ctx.stroke();
        ctx.closePath();
    }

    static drawLine(x1, y1, x2, y2, color){
        let ctx = Draw.ctx;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    static fillCircle(x, y, radius, color){
        let ctx = Draw.ctx;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    static drawFunction(func){
        let previous = new Point(0, func[0], Point.GRAPH);
        if(func[0] < 0){
            let x = 0;
            while(true){
                let out = 0;
                for(let i = 0; i < func.length; i++){
                    out += func[i] * Math.pow(x, i);
                }
                previous = new Point(x, out, Point.GRAPH);
                if(out > 0){
                    break;
                }
                x++;
            }
        }
        for(let x = 0; x < 1400; x++){
            let out = 0;
            for(let i = 0; i < func.length; i++){
                out += func[i] * Math.pow(x, i);
            }
            let point = new Point(x, out, Point.GRAPH);
            if(out < 0)
                continue;
            Draw.fillCircle(point.getScreenPoint().x, point.getScreenPoint().y, 0.25, Draw.BLACK);
            Draw.drawLine(previous.getScreenPoint().x, previous.getScreenPoint().y, point.getScreenPoint().x, point.getScreenPoint().y);
            previous = point;
        }
    }
}