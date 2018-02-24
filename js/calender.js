/**
 * Author : 一只鹿
 * Date   : 2017.9.29
 * Email  : 1005526074@qq.com
 * Blog   : https://ideer.me/
 * More   : http://www.jq22.com/mem310935
 * PS     : 请在转载时保留作者信息！
 * PS     : ChineseCalendar.js文件来源: http://www.jianshu.com/p/936077e7727a
 **/
;(function (window, undefined) {
  var calendar = document.querySelector('#calendar')
  var arryMarkDate ={};
  var weekendDate = [];
  //var simpleMonth_area = calendar.querySelector('.sidebar')
  // var simpleMonth_title = simpleMonth_area.querySelector('.date')
  var fullMonth_area = calendar.querySelector('#renderFullYear')
  //var fullMonth_title = fullMonth_area.querySelector('h2')
 // var fullMonth_lunar = fullMonth_area.querySelector('.lunar-year')
  var detailMonth = calendar.querySelector('#renderMonth')
  var detailMonth_title = detailMonth.querySelector('.title')
  var detailMonth_day = detailMonth.querySelector('.day')

  var tab_num = 0 // tab切换记录值
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  var calendarObj = ChineseCalendar

  renderTab()
  initalToday()

  // tab切换
  function renderTab() {
    var aTab = calendar.querySelector('.header').querySelectorAll('li')
    var aRender = calendar.querySelectorAll('.render')

    for (var i = 0; i < aTab.length; i++) {
      aTab[i].index = i

      aTab[i].onclick = function () {
        for (var j = 0; j < aTab.length; j ++) {
          aTab[j].className = ''
          aRender[j].className = 'render'
        }

        aTab[this.index].className = 'cur'
        aRender[this.index].className = 'render render-show'

        tab_num = this.index
      }
    }
  }

  // 初始化渲染日期
  function initalToday() {
    // simpleMonth_title.innerHTML = year + '年' + (month + 1) + '月'
    //fullMonth_title.innerHTML = year + '年'
    //fullMonth_lunar.innerHTML = '<i></i>' + calendarObj.year2GanZhe(year) + calendarObj.getAnimal(year) + '年'
   // detailMonth_title.innerHTML = year + '年' + (month + 1) + '月';
   $(".now-year").val(year + '年');
    /**设置月 */
    $(".now-month").val((month + 1) + '月');
    //renderFullMonth()
    tools.renderDetailMonth(detailMonth_day, year, month);
    /**获得本月所有的周末 */
   // $(".befor-after-month,.weekend-before-after").css("visibility","hidden")
    getCurmonthWeekend();
    /**获得后台的数据 */
    getSetHoliday();
    var li =$(".day li");
    /**根据获得数据回显 */
    if(arryMarkDate.hasOwnProperty("days")){
      var daysArry = arryMarkDate.days;
      for(var i=0;i<daysArry.length;i++){
        for(var j=0;j<li.length;j++){
          //console.log($(li[j]).attr("real-time"), daysArry[i]);
          if($(li[j]).attr("real-time")== daysArry[i]){
            $(li[j]).attr("bgy","yellow");
          }
        }
      }
    }
    /**选中每一个元素设置 */
    li.click(function(){
      console.log(123);
      li.removeAttr("mark");
      var _this = $(this);
      _this.attr("mark","red0");
      if(_this.attr("bgy")=="yellow"){
        $("#switch").prop("checked",true);
      }else{
        $("#switch").prop("checked",false);
      }
      sendSetHoliday();
    });
    dateEvent()
  }
  /**获得后台的ajax数据 */
  function getSetHoliday(){
    var ajaxDate={
        "year": "2018",
        "month": "2",
        "days": [
            "20180122"
        ],
        "flag": 1,
        "weekend": [
            "20180110",
            "20180117",
            "20180124"
        ]
    };
    arryMarkDate =ajaxDate;
    console.log(arryMarkDate);
  }
/**设置节假日发送ajax请求 */
function sendSetHoliday(){
  $("#switch").unbind();
  $("#switch").click(function(){
    if($(this).prop("checked")==true){
      $(".day li[mark=red0]").attr("bgy","yellow");
      var realTime = $(".day li[mark=red0]").attr("real-time");
      var realTimeArry = [];
      realTimeArry.push(realTime);
      var dateYear = $(".day li[mark=red0]").attr("year");
      var dateMonth = $(".day li[mark=red0]").attr("month");
     // console.log(realTime,dateYear,dateMonth);
      var timeMap ={};
      timeMap["year"]=dateYear;
      timeMap["month"] = dateMonth;
      //timeMap["flag"]=1;
      timeMap["days"]=realTimeArry;
      timeMap["weekend"]=weekendDate;

    }else{
      $(".day li[mark=red0]").removeAttr("bgy");
      var realTime = $(".day li[mark=red0]").attr("real-time");
      var realTimeArry = [];
      realTimeArry.push(realTime);
      var dateYear = $(".day li[mark=red0]").attr("year");
      var dateMonth = $(".day li[mark=red0]").attr("month");
      //console.log(realTime,dateYear,dateMonth);
      var timeMap ={};
      timeMap["year"]=dateYear;
      timeMap["month"] = dateMonth;
     // timeMap["flag"]=0;
      timeMap["days"]=realTimeArry;
      timeMap["weekend"]=weekendDate;
    }
    console.log(timeMap);
    /**将获得的数据timeMap发送给后台 */
  });
}
  // 渲染侧边栏&全年月份
 /*function renderFullMonth() {
   // var sidebar_day = simpleMonth_area.querySelector('.day')
    //var fullYear_month = fullMonth_area.querySelector('.month')
    var fullMonth_hmtl = ``
    var monthArr = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December']

    for (var i = 0; i < 12; i ++) {
      fullMonth_hmtl += `<li class="item">
                          <div class="title">${monthArr[i]}</div>
                          <ul class="week">
                            <li>日</li>
                            <li>一</li>
                            <li>二</li>
                            <li>三</li>
                            <li>四</li>
                            <li>五</li>
                            <li>六</li>
                          </ul>
                          <ul class="day">${tools.renderDay(year, i)}</ul>
                        </li>`
    }

    fullYear_month.innerHTML = fullMonth_hmtl
   // sidebar_day.innerHTML = tools.renderDay(year, month)
  }*/
function getCurmonthWeekend(){
  weekendDate=[];
  var getCurmonthWeekend = $(".day li[class='weekend cur-month']");
  for(var i=0;i<getCurmonthWeekend.length;i++){
    var weekendRealTime = $(getCurmonthWeekend[i]).attr("real-time");
    weekendDate.push(weekendRealTime);
  }
 // console.log(getCurmonthWeekend);
}
  function dateEvent() {
    //var sidebar_prevBtn = simpleMonth_area.querySelector('.btn-prev')
    //var sidebar_nextBtn = simpleMonth_area.querySelector('.btn-next')
    var control = calendar.querySelector('#control')
    var control_btnPrev = control.querySelector('.btn-prev')
    var control_today = control.querySelector('.today')
    var control_btnNext = control.querySelector('.btn-next')
    //var sidebar_date = simpleMonth_area.querySelectorAll('.day li')
    var detail_festival = detailMonth_day.querySelectorAll('.show')
    var popup = calendar.querySelector('#popup')
    var container = calendar.querySelector('.container')

    var dataTime = null
   // var popupPos = {lx: 0, lr: 0, y: 0, w: detail_festival[0].offsetWidth, h: detail_festival[0].offsetHeight}

    /*sidebar_prevBtn.onclick = function () {
      if (month == 0) {
        year --
        month = 11
      } else {
        month --
      }

      initalToday()
    }
    sidebar_nextBtn.onclick = function () {
      if (month == 11) {
        year ++
        month = 0
      } else {
        month ++
      }

      initalToday()
    }*/

    control_today.onclick = function () {
      year = today.getFullYear()
      month = today.getMonth()

      initalToday()
    }

    $(".year-prev").unbind().click(function(){
      if(year==1940){
        return false;
      }
      year--;
      tools.renderDetailMonth(detailMonth_day, year, month)
      initalToday()
    });
    $(".year-next").unbind().click(function(){
      year++;
      tools.renderDetailMonth(detailMonth_day, year, month);
      initalToday()
    });


    control_btnPrev.onclick = function () {
      if (tab_num == 0) {
        if (month == 0) {
          year --
          month = 11
        } else {
          month --
        }
        console.log(detailMonth_day, year, month);
        tools.renderDetailMonth(detailMonth_day, year, month)
      } else {
        year --
      }

      initalToday()
    }
    control_btnNext.onclick = function () {
      if (tab_num == 0) {
        if (month == 11) {
          year ++
          month = 0
        } else {
          month ++
        }
      } else {
        year ++
      }

      initalToday()
    }

    /*for (var i = 0; i < sidebar_date.length; i++) {
      sidebar_date[i].onclick = function () {
        dataTime = this.dataset.time
        year = parseInt(dataTime.substr(0, 4))
        month = parseInt(dataTime.substr(4, 2))

        initalToday()
      }
    }*/

    for (var i = 0; i < detail_festival.length; i++) {
      detail_festival[i].onclick = function (ev) {
        var dateStr = this.parentNode.dataset.time

        popupPos.lx = this.offsetLeft + popupPos.w + 20
        popupPos.lr = this.offsetLeft - 280
        popupPos.y = this.offsetTop - 52 + popupPos.h/2

        popup.style.display = 'block'
        popup.style.top = popupPos.y + 'px'

        if (container.offsetWidth - this.offsetLeft - this.offsetWidth >= popup.offsetWidth) {
          popup.style.left = popupPos.lx + 'px'
          popup.className = 'popup-left'
        } else {
          popup.style.left = popupPos.lr + 'px'
          popup.className = 'popup-right'
        }

        tools.renderPopup(this, popup, dateStr)

        ev.stopPropagation()
      }
    }

    // document.onclick = function () {
    //   popup.style.display = 'none'
    // }
  }
})(window)