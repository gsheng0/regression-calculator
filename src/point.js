
// export class Point{
//     static SCREEN = 0;
//     static GRAPH = 1;
//     static CANVAS_HEIGHT = 0;
//     static CANVAS_WIDTH = 0;
//     constructor(x, y, mode = Point.SCREEN){
//         this.x = x;
//         this.y = y;
//         this.mode = mode;
//     }

//     getScreenPoint(){
//         if(this.mode === Point.SCREEN){
//             return new Point(this.x, this.y, Point.SCREEN);
//         }
//         return new Point(this.x + 30, -1 * this.y + (Point.CANVAS_HEIGHT - 30));
//     }

//     getGraphPoint(){
//         if(this.mode === Point.GRAPH){
//             return new Point(this.x, this.y, Point.GRAPH);
//         }
//         return new Point(this.x - 30, -1 * this.y + (Point.CANVAS_HEIGHT + 30) - 60, Point.GRAPH);
//     }

//     toString() { 
//         return this.x + ", " + this.y
//     }
// }