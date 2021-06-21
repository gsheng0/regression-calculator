// export class Optimizer{
//     static SLOW = 0;
//     static FAST = 1;
//     static PRESET_0 = [1];
//     static PRESET_1 = [1, 1];
//     static PRESET_2 = [0.0005, 0.0005, 0.0005];
//     static PRESETS = [Optimizer.PRESET_0, Optimizer.PRESET_1, Optimizer.PRESET_2];
    
//     constructor()
//     {    
//         this.runs = 5000;
//         this.alpha = [0.01, 0.0000002, 0.000000000001];
//         this.lastRun = 0;
//         this.finished = true;
//         this.minCost = 1000000000;
//         this.mode = Optimizer.SLOW;
//         this.degree = 2;
//         this.func = Optimizer.PRESETS[this.degree];
//     }

//     applyFunction(x){
//         let out = 0;
//         for(let i = 0; i < this.func.length; i++){
//             out += this.func[i] * Math.pow(x, i);
//         }
//         return out;
//     }

//     getCost(coords){
//         let out = 0;
//         for(let i = 0; i < coords.length; i++){
//             let coord = coords[i];
//             out += Math.pow(this.applyFunction(coord.x) - coord.y, 2);
//         }
//         out /= coords.length;
//         return out;
//     }

//     getGradient(coords){
//         let gradient = [];
//         for(let i = 0; i < this.degree + 1; i++){
//             gradient.push(0);
//         }

//         for(let i = 0; i < coords.length; i++){
//             let coord = coords[i];
//             for(let x = 0; x < this.degree + 1; x++){
//                 gradient[x] += 2 * (this.applyFunction(coord.x) - coord.y) * Math.pow(coord.x, x);
//             }
//         }

//         for(let i = 0; i < this.degree + 1; i++){
//             gradient[i] /= coords.length;
//         }
//         return gradient;
//     }

//     processCoords(coords){
//         let newCoords = [];
//         for(let i = 0; i < coords.length; i++)
//             newCoords[i] = coords[i].getGraphPoint();

//         return newCoords;
//     }

//     optimize(coords){
//         this.lastRun = 0;
//         this.finished = false;
//         this.coords = this.processCoords(coords);

//         this.minCost = 10000000000;
//         this.func = Optimizer.PRESETS[this.degree];
//         this.best = Optimizer.PRESETS[this.degree];

//         this.epoch(coords);

//     }
//     epoch(){
//         let subdivision = 1000;
//         if(this.mode === Optimizer.FAST)
//             subdivision = 1;
//         let coords = this.coords;
//         for(let i = 0; i < this.runs/subdivision; i++){
//             let currCost = this.getCost(coords);

//             if(currCost < this.minCost){
//                 this.minCost = currCost;
//                 this.best = this.func;
//             }

//             let gradient = this.getGradient(coords);  

//             for(let x = 0; x < this.degree + 1; x++){
//                 this.func[x] -= gradient[x] * this.alpha[x];
//             }

//             this.lastRun++;
//         }
//         if(this.lastRun >= this.runs - 1)
//         {
//             this.finished = true;
//         }
        
//         document.getElementById("cost").textContent = "Cost: " + this.minCost;
        
//         this.setFunctionText(this.func);

//     }

//     setFunctionText(func){
//         let text = "Function: y = ";
//         for(let power = func.length - 1; power >= 0; power--){

//             let coefficient = this.trimNumber(func[power]);
//             if(power > 1){
//                 coefficient = this.trimNumber(func[power], 7);
//             }
//             if(power > 1)
//                 text += coefficient + "x^" + power + " + ";
//             else if(power === 1){
//                 text += coefficient + "x" + " + ";
//             }
//             else if(power === 0){
//                 text += coefficient;
//             }
//         }

//         document.getElementById("function").textContent = text;       
//     }

//     trimNumber(num, places = 2){
//         num = "" + num;
//         return Number(num.substring(0, num.indexOf(".") + places + 1));
//     }
// }