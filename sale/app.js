//生成表单
let region_check_arr = [{id:"east", name:"region", value:"华东"},
                        {id:"south", name:"region", value:"华南"},
                        {id:"north", name:"region", value:"华北"}];
let product_check_arr = [{id:"phone", name:"product", value:"手机"},
                         {id:"laptop", name:"product", value:"笔记本"},
                         {id:"speaker", name:"product", value:"智能音箱"}];
var regionSelect = document.getElementById("region-radio-wrapper");
var productSelect = document.getElementById("product-radio-wrapper");
createCheckBox(regionSelect, region_check_arr);
createCheckBox(productSelect, product_check_arr);
//生成表格
regionSelect.onclick = function() {
    newRegion();
}
productSelect.onclick = function() {
    newRegion();
}
//生成折线图
var tableWrapper = document.getElementById("table-wrapper");
tableWrapper.onmouseover = function(e){
    var data = [];
    target = e.target;
    var tr = target.parentElement;
    var td = tr.getElementsByTagName("td");
    if(td.length>0){
        for (var i=0; i<12; i++){
            data[i] = td[i+2].firstChild.nodeValue;
        }
    
        tr.oldClassName = tr.className;
        addClass(tr, "highlight");
        lineDarwing(data);
        barDarwing(data);
    }
}
tableWrapper.onmouseout = function(e){
    target = e.target;
    var tr = target.parentElement;
    tr.className = tr.oldClassName;
    defaultLineDarwing();
    defaultBarDarwing();
}

function addClass(element,value) {
    var newClassName;
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}