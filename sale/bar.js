function defaultBarDarwing() {
    var color = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7", "#F4A460", "#90EE90", "#C1FFC1"]
    var yLine = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var yWidth=45, barWidth=4, xHight=80, xline, sale;
    var max = 800;
    xline = max/5;
    var drawing = document.getElementById("barDrawing");
    if (drawing.getContext) {
        var context = drawing.getContext("2d");
        context.clearRect(0,0,drawing.width,drawing.height);
        context.strokeStyle = "black";
        //context.fillStyle = "#5bc49f";
        context.fillStyle = "black";
        context.beginPath();
        context.moveTo(50,10);
        context.lineTo(50,410);
        context.moveTo(50,410);
        context.lineTo(590,410);
        context.font = "bold 10px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        for(var i=0; i<6; i++){
            var y = 410-i*xHight;
            context.moveTo(45,y);
            context.lineTo(50,y);
            context.fillText(i*xline, 25, y);
        }
        for (var i=0; i<13; i++){
            var x = 50 + i*yWidth;
            context.moveTo(x,415);
            context.lineTo(x,410);
            if (i!=12){
                context.fillText(yLine[i], x+23,425);
            }
        }
        context.stroke();
        context.strokeStyle = "#f7f7f7";
        context.beginPath();
        for(var i=1;i<6; i++){
            y = 410-i*xHight;
            context.moveTo(51,y);
            context.lineTo(545,y);
        }
        context.stroke();
        for (var j=0; j<9; j++){
            sale = sourceData[j].sale;
            context.fillStyle = color[j];
            for (var i=0; i<12; i++){
                context.fillRect(55+j*4+yWidth*i, 410-sale[i]*400/max, barWidth, sale[i]*400/max);
            }
        }
    }
}
function barDarwing(sale) {
    var yLine = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var yWidth=45, barWidth=30, xHight=80, xline;
    var drawing = document.getElementById("barDrawing");
    console.log(sale);
    var max = Math.max.apply(null,sale);
    console.log(max);
    if (max > 100) {
        max = Math.ceil(max/100)*100;
    } else {
        max = Math.ceil(max/10)*10;
    }
    xline = max/5;
    console.log(max);
    if (drawing.getContext) {
        var context = drawing.getContext("2d");
        context.clearRect(0,0,drawing.width,drawing.height);
        context.strokeStyle = "black";
        //context.fillStyle = "#5bc49f";
        context.fillStyle = "black";
        context.beginPath();
        context.moveTo(50,10);
        context.lineTo(50,410);
        context.moveTo(50,410);
        context.lineTo(590,410);
        context.font = "bold 10px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        for(var i=0; i<6; i++){
            var y = 410-i*xHight;
            context.moveTo(45,y);
            context.lineTo(50,y);
            context.fillText(i*xline, 25, y);
        }
        for (var i=0; i<13; i++){
            var x = 50 + i*yWidth;
            context.moveTo(x,415);
            context.lineTo(x,410);
            if (i!=12){
                context.fillText(yLine[i], x+23,425);
            }
        }
        context.stroke();
        context.strokeStyle = "#f7f7f7";
        context.beginPath();
        for(var i=1;i<6; i++){
            y = 410-i*xHight;
            context.moveTo(51,y);
            context.lineTo(545,y);
        }
        context.stroke();
        context.fillStyle = "#5bc49f";
        for (var i=0; i<12; i++){
            context.fillRect(58+yWidth*i, 410-sale[i]*400/max, barWidth, sale[i]*400/max);
        }
    }
}
window.onload = defaultBarDarwing();