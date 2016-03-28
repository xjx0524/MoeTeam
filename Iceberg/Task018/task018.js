/**
 * @Author : Iceberg
 * @Date : 2016-03-26
 */
/**
 *验证是否是数字
 */
function isNum(num){
    var reg = new RegExp("^[0-9]*$");
    if(reg.test(num) && num!=""){
        return true;
    }
    else{
        alert("请输入数字");
        return false;
    }

}
function leftIn(){
    var text = document.getElementById("myInput").value;
    var textNode = document.createTextNode(text);
    var divNode = document.createElement("div");
    if(isNum(text))
    {
        divNode.appendChild(textNode);
        divNode.className = "item";
        var fatherNode = document.getElementById("graph");
        fatherNode.insertBefore(divNode,fatherNode.firstChild);
    }
    initClickDel();
}
function  rightIn(){
    var text = document.getElementById("myInput").value;
    var textNode = document.createTextNode(text);
    var divNode = document.createElement("div");
    if(isNum(text))
    {
        divNode.appendChild(textNode);
        divNode.className = "item";
        var fatherNode = document.getElementById("graph");
        fatherNode.appendChild(divNode);
    }
    initClickDel();
}
function leftOut(){
    var firstDivNode = document.getElementById("graph").firstChild;
    document.getElementById("graph").removeChild(firstDivNode);
}
function rightOut(){
    var lastDivNode = document.getElementById("graph").lastChild;
    document.getElementById("graph").removeChild(lastDivNode);
}
/**
 * 点击某数字后删除
 */
function clickDel(){
    var node = event.target;
    node.parentNode.removeChild(node);
}
function initClickDel(){
    var itemList = document.getElementsByClassName("item");
    for(var i=0; i<itemList.length; i++){
        itemList[i].addEventListener("click",clickDel);
    }
}
/**
 * 给按钮绑定事件
 */
function init(){
    document.getElementById("btn-left-in").addEventListener("click",leftIn);
    document.getElementById("btn-right-in").addEventListener("click",rightIn);
    document.getElementById("btn-left-out").addEventListener("click",leftOut);
    document.getElementById("btn-right-out").addEventListener("click",rightOut);
    initClickDel();
}

init();
