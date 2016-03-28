/**
 * @Author : Iceberg
 * @Date : 2016-03-24
 */

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "-1",
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var str = "";
    for(var prop in chartData){
        str += "<div class='out " + pageState["nowGraTime"] + "'>";
        str += "<div class='in' style='height:" + chartData[prop] + "px; background-color:"
            + getRandomColor() + "' title='" + prop + " " + chartData[prop] + "'></div>";
        str += "</div>";
    }
    document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML = str;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var oldTime = pageState["nowGraTime"];
    if( this.value == oldTime )
    {
        return;
    }
    else
    {
        // 设置对应数据
        pageState["nowGraTime"] = this.value;
        initAqiChartData();//选项改变后数据重新整理
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    pageState.nowSelectCity = this.value;
    initAqiChartData();//选项改变后数据重新整理
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radioList = document.getElementsByName("gra-time");
    for(var i=0; i<radioList.length; i++){
        radioList[i].addEventListener("click",graTimeChange);
    }
   // document.getElementsByName("gra-time").addEventListener("click",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityList = [];
    var i = 0;
    var cityhtml = document.getElementById("city-select");
    for(var city in aqiSourceData){
        cityList[i++] = city;
    }
    cityhtml.options.add(new Option("请选择",""));
    for(var j=0; j <cityList.length; j++){
        //cityhtml.innerHTML += "<option>" + cityList[j] + "</option>";
        //这里使用了Option对象来创建option标签的文本text和值value
        cityhtml.options.add(new Option(cityList[j],cityList[j]) );
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    cityhtml.addEventListener("change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    switch (time){
        case "day" :
            chartData = aqiSourceData[city];
            break;
        case "week" :
            chartData = {};
            var week=1,weekSum=0,date,day,count=0;//周数 某一周数据之和 日期 星期几的数字表示 分母计数器
            for(var prop in aqiSourceData[city]){
                date = new Date(prop);
                day = date.getDay();
                if( day!=0 ){
                    count++;
                    weekSum += aqiSourceData[city][prop];
                }
                else{
                    chartData["week" + week] = Math.round(weekSum/count);
                    count = 0;
                    weekSum = 0;
                    week++;
                }
            }
            //处理数据碎片
            if ( count!=0 ){
                chartData["week" + week] = Math.round(weekSum/count);
                count = 0;
            }
            break;
        case "month" :
            chartData = {};
            var month=0,monthSum=0;date,month,count=0;//月数 某一月数据之和 日期 某月的数字表示 分母计数器
            for(var prop in aqiSourceData[city]){
                date = new Date(prop);
                var monthNow = date.getMonth();
                if( monthNow == month){
                    count++;
                    monthSum += aqiSourceData[city][prop];
                }
                else{
                    chartData["month" + (month+1) ] = Math.round(monthSum/count);
                    count = 0;
                    monthSum = 0;
                    month++;
                }
            }
            //处理数据碎片
            if( count!=0 ){
                chartData["month" + (month+1) ] = Math.round(monthSum/count);
                count = 0;
            }
            break;
    }
}
/**
 * 随机颜色函数
 */
function getRandomColor(){
    //Math.floor(Math.random()*0xffffff<<0).toString(16)); 也可以
    return '#'+(Math.random()*0xffffff<<0).toString(16);
}
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}
init();