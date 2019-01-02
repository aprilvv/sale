let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
//生成html多选按钮
function createCheckBox(wrapper, data) {
    let shtml = '<input type="checkbox" id="all" name="' + data[0].name + 
                '" value="all" data-checkbox-type="all"/><label for="all">所有项</label>';
    for (var i=0; i<data.length; i++){
        shtml = shtml + '<input type="checkbox" id="' + data[i].id + '" name="' + data[i].name + '" value="' + data[i].value + 
                '" data-checkbox-type="single"/><label for="' + data[i].id + '">' + data[i].value + '</label>';
    }
    //console.log(shtml);
    wrapper.innerHTML = shtml;
    wrapper.addEventListener("click", checkLogic);
    var inputs = wrapper.getElementsByTagName("input");
    function checkLogic(e) {
        let checkNum = 0;
        if (e.target.id == "all"){
            for(let i=0; i<inputs.length; i++){
                inputs[i].checked = true;
            }
        } else {
            for (let i=1; i<inputs.length; i++){
                if (inputs[i].checked == true) 
                    checkNum++;
            }
            if(checkNum === (inputs.length-1)){
                inputs[0].checked = true;
            } else if (checkNum === 0){
                //e.preventDefault();
                for (var i=0; i<inputs.length; i++){
                    if(inputs[i].id == e.target.id){
                        inputs[i].checked = true;
                    }
                }
            } else {
                inputs[0].checked = false;
            }
        }
    }
}


//生成表格

function newRegion() {
    var regionInputs = regionSelect.getElementsByTagName("input");
    var productInputs = productSelect.getElementsByTagName("input");

    var regionSelected = checkedInput(regionInputs);
    var productSelected = checkedInput(productInputs);
    //表格清除
    tableWrapper.innerHTML = "";
    //表头
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var text1 = document.createTextNode("商品");
    var text2 = document.createTextNode("地区");
    tableWrapper.appendChild(table);
    table.appendChild(thead);
    thead.appendChild(tr);
    tr.appendChild(th1);
    tr.appendChild(th2);
    //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
    if((regionSelected.length==1) && (productSelected.length>1)){
        th1.appendChild(text2);
        th2.appendChild(text1);
    } else {
        th1.appendChild(text1);
        th2.appendChild(text2);
    }
    var month = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
    for (var i=0; i<12; i++) {
        var th = document.createElement("th");
        var text = document.createTextNode(month[i]);
        th.appendChild(text);
        tr.appendChild(th);
    }
    //更新表格内容
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    var data = newlist();
    for (var i=0; i<data.length; i++) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        var td = document.createElement("td");
        if((regionSelected.length==1) && (productSelected.length>1)){
            var text = document.createTextNode(data[i].region);
        } else {
            var text = document.createTextNode(data[i].product);
        }
        tr.appendChild(td);
        td.appendChild(text);
        var td = document.createElement("td");
        if((regionSelected.length==1) && (productSelected.length>1)){
            var text = document.createTextNode(data[i].product);
        } else {
            var text = document.createTextNode(data[i].region);
        }
        td.appendChild(text);
        tr.appendChild(td);
        for (var j=0; j<data[i].sale.length; j++) {
            var td = document.createElement("td");
            var text = document.createTextNode(data[i].sale[j]);
            td.appendChild(text);
            tr.appendChild(td);
        }
    }
    //console.log(table);
    //合并单元格
    mergeTable(table);
}
//合并表格
function mergeTable(tbl){
    var col=0,  //合并单元格作用的列
        val="", count=1, start;
    for (var i=0; i<tbl.rows.length; i++){
        if(val == tbl.rows[i].cells[col].innerHTML){
            count++;
        } else {
            if(count>1){
                //合并单元格
                start = i-count;
                tbl.rows[start].cells[col].rowSpan = count;
                for (var j=start+1; j<i; j++){
                    tbl.rows[j].cells[col].style.display = "none";
                }
                count = 1;
            }
            val = tbl.rows[i].cells[col].innerHTML;
        }
    }
    //合并最后相同的几行
    if (count>1){
        start = i-count;
        tbl.rows[start].cells[col].rowSpan = count;
        for(var j=start+1; j<i; j++){
            tbl.rows[j].cells[col].style.display = "none";
        }
    }
}
function checkedInput(wrapper) {
    var selectedData = new Array();
    for(var i=1; i<wrapper.length; i++){
        if(wrapper[i].checked === true){
            selectedData.push(wrapper[i].value);
        }
    }
    return selectedData;
}
//根据select选项获取数据
function newlist() {
    var regionInputs = regionSelect.getElementsByTagName("input");
    var productInputs = productSelect.getElementsByTagName("input");

    var regionSelected = checkedInput(regionInputs);
    var productSelected = checkedInput(productInputs);
    var regionData =  new Array();
    var data = new Array();
    for (var i=0; i<regionSelected.length; i++){
        for (var j=0; j<sourceData.length; j++) {
            if (regionSelected[i] == sourceData[j].region) {
                regionData.push(sourceData[j]);
            }
        }
    }
    for (var i=0; i<productSelected.length; i++){
        for (var j=0; j<regionData.length; j++){
            if(regionData[j].product == productSelected[i]){
                data.push(regionData[j]);
            }
        }
    }
    return data;
}
