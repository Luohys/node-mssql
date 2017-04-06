/*******************************************
 * File Name : demo.js
 * Author : May
 * Create Date : 2017/3/31
 * Description :
 ******************************************/

(function ($) {
  "use strict";
  $(function () {
    $('#main-content').fullpage({
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      sectionsColor: ['#f2f2f2', '#A5CBE5', '#7BAABE', '#ccddff',"#5f5f5f"],
      navigation:true
    });

    const contain = document.getElementById('charts');
    contain.style = "width: 600px; height: 500px;";
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(contain);
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }, {name: '库存', type: 'bar', data: [10, 66, 45, 23, 53, 65]}]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  });
})(jQuery);