/**
 * @Author : Iceberg
 * @Date : 2016-03-27
 */
/**
 *验证是否是数字
 */
function isNum(num){
    var reg = new RegExp("^[0-9]*$");
    if(reg.test(num) && num!="" && num>=10 && num<=100){
        return true;
    }
    else{
        alert("请输入10-100之间的数字");
        return false;
    }

}
/**
 * 验证数据数量是否大于60
 */
function quantity(le){
    if(le>10){
        alert("数据量过多，超过了10");
        return false;
    }
    else{
        return true;
    }

}
/**
 * 优化 .item类 中div的高度，便于按比例显示
 */
function calHeight(divNode){
    var inputVal = divNode.innerHTML;
    divNode.style.height = inputVal*5+"px" // inputVal/100*500 因画布高度是500
}
function leftIn(){
    var text = document.getElementById("myInput").value;
    var textNode = document.createTextNode(text);
    var divNode = document.createElement("div");
    var divContainer = document.createElement("div");
    if(isNum(text))
    {
        divNode.appendChild(textNode);
        divNode.className = "item";
        calHeight(divNode);//根据输入改变数据项显示的高度
        divContainer.className = "itemContainer";
        divContainer.appendChild(divNode);
        var fatherNode = document.getElementById("graph");
        if(quantity(fatherNode.childNodes.length)){
            fatherNode.insertBefore(divContainer,fatherNode.firstChild);
        }
    }
    initClickDel();
}
function  rightIn(){
    var text = document.getElementById("myInput").value;
    var textNode = document.createTextNode(text);
    var divNode = document.createElement("div");
    var divContainer = document.createElement("div");
    if(isNum(text))
    {
        divNode.appendChild(textNode);
        divNode.className = "item";
        calHeight(divNode);//根据输入改变数据项显示的高度
        divContainer.className = "itemContainer";
        divContainer.appendChild(divNode);
        var fatherNode = document.getElementById("graph");
        if(quantity(fatherNode.childNodes.length)){
            fatherNode.appendChild(divContainer);
        }
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
    var node = event.target;//node是item类的节点 node.parentNode是itemContainer类的节点
    node.parentNode.parentNode.removeChild(node.parentNode);
}
function initClickDel(){
    var itemList = document.getElementsByClassName("item");
    for(var i=0; i<itemList.length; i++){
        itemList[i].addEventListener("click",clickDel);
    }
}
/**
 * 冒泡排序
 */
function bubble(){
    var itemArr = document.getElementsByClassName("item");
    var i = itemArr.length-1;
    var myanim = setInterval( function(){
        if(i==0){
            clearInterval(myanim);
        }

        for(var j=0; j<=i-1; j++) {
            if (itemArr[j].innerHTML > itemArr[j + 1].innerHTML) {
                var temp;
                temp = itemArr[j].innerHTML;
                itemArr[j].innerHTML = itemArr[j + 1].innerHTML;
                itemArr[j + 1].innerHTML = temp;
                calHeight(itemArr[j]);
                calHeight(itemArr[j+1]);
            }
        }
        rotateYDIV(itemArr[i]);
        i--;
    } ,1500);
}
/**
 * 此函数是原始的冒泡
 * 此函数未被使用，而是用了bubble函数
 */
function bubbleSort(){
    /*
    1.获取数组长度n
    2.执行n-1次循环
    3.每次循环：若前者 > 后者则交换两者位置
     */
    var itemArr = document.getElementsByClassName("item");
    for(var i=itemArr.length-1; i>0; i--){
        for(var j=0; j<=i-1; j++){
            if(itemArr[j].innerHTML > itemArr[j+1].innerHTML){
                var temp;
                temp = itemArr[j].innerHTML;
                itemArr[j].innerHTML = itemArr[j+1].innerHTML;
                itemArr[j+1].innerHTML = temp;

                calHeight(itemArr[j]);
                calHeight(itemArr[j+1]);
            }
            rotateYDIV(itemArr[i]);
        }
    }
}
/**
 * 旋转函数
 */
function rotateYDIV(divNode) {
    var ny = 0, rotYINT;
    y = divNode;
    clearInterval(rotYINT);
    rotYINT = setInterval(startYRotate,1);

    function startYRotate() {
        ny = ny + 1;
        y.style.transform = "rotateY(" + ny + "deg)";
        y.style.webkitTransform = "rotateY(" + ny + "deg)";
        y.style.OTransform = "rotateY(" + ny + "deg)";
        y.style.MozTransform = "rotateY(" + ny + "deg)";
        if (ny >= 360) {
            ny = 0;
            clearInterval(rotYINT);
        }
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
    document.getElementById("btn-sort").addEventListener("click",bubble);
    initClickDel();
}

init();
