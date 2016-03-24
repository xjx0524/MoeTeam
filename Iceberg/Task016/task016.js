/**
 * @Author : Iceberg
 * @Date : 2016-03-23 22:38
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiIndex=0;
var aqiData = [];//改为对象数组
function DataItem(city, num){ //数据项目类
    this.city = city;
    this.num = num;
};
/**
* trim，删除左右两端空格
* */
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    //获取数据并清除两端空格
    var tempCity = trim(document.getElementById("aqi-city-input").value);
    var tempNum = trim(document.getElementById("aqi-value-input").value);
    var regCity = /[\u4E00-\u9FA5]/g;
    var regNum = /^[0-9]+.?[0-9]*$/;
    if(!regCity.test(tempCity)){
        alert("城市名称必须是汉字");
        return;
    }
    if(!regNum.test(tempNum)){
        alert("空气质量指数必须是整数");
        return;
    }
    var tempItem =new DataItem(tempCity,tempNum);//new关键字不可缺少
    aqiData[aqiIndex++] = tempItem;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var myTable = document.getElementById("aqi-table");
    //渲染前先重置
    myTable.innerHTML = "";
    //若有数据则绘制表头
    if(aqiData.length !=0 ){
        myTable.innerHTML = "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";
    }
    //绘制表格
    for(var i=0; i<aqiData.length; i++){
        var tempCity = aqiData[i].city;
        var tempNum = aqiData[i].num;
        myTable.innerHTML += "<tr><td>"+tempCity+"</td><td>"+tempNum+"</td><td><button>删除</button></td></tr>";
    }
    //此函数给button绑定事件
    btndelEvent();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    var myTable = document.getElementById("aqi-table");
    var index = this.parentNode.parentNode.rowIndex;//this是HTMLButtonElement
    aqiData.splice(index-1,1);//删除物理位置的数据
    aqiIndex--;//注意：删除一条数据后 数组下标aqiIndex（全局变量）需要减1
    myTable.deleteRow(index);//删除逻辑行
    if(aqiData.length == 0)//若删除后无数据则删除表头
        myTable.innerHTML = "";

}
/**
 * 给表格中的button绑定事件
 * */
function btndelEvent(){
    var buttonArr = document.getElementsByTagName("button");
    for(var i=1; i<buttonArr.length; i++){//第一个button是添加按钮，故略去
        buttonArr[i].addEventListener("click",delBtnHandle);
    }
}
function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    // 注意：本文在渲染后绑定button删除事件，而不是在初始化init函数中绑定，因此时并没有删除按钮
}

init();