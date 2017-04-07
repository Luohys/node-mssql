/*******************************************
 * File Name : demo.js
 * Author : May
 * Create Date : 2017/3/31
 * Description :
 ******************************************/

(function ($) {
  "use strict";

  let option = {};

  $(function () {
    $('#main-content').fullpage({
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      sectionsColor: ['#873343', '#f2f2f2', '#7BAABE', '#ccddff', "#5f5f5f"],
      navigation: true
    });

    const contain = document.getElementById('charts');
    contain.style = "width: 800px; height: 600px;";

    $("#chart-bar").on("click", getBarChart);
    $("#chart-pie").on("click", getPieChart);
    $("#chart-line").on("click", getLineChart);
  });

  function getBarChart() {
    $.get("rpt/demo/bar1", function (result) {
      let qData = result.recordset;
      let xData = [];
      let aData = [];
      let tData = [];
      for (let obj in qData) {
        xData.push(qData[obj].Material);
        aData.push(qData[obj].Amount);
        tData.push(qData[obj].Qty);
      }
      option = {
        title: {
          text: '销售情况'
        },
        tooltip: {},
        legend: {
          data: ['销售额', '销量']
        },
        xAxis: {
          data: xData,
          silent: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [{
          name: '销售额',
          type: 'bar',
          data: aData,
          animationDelay: function (idx) {
            return idx * 10;
          }
        }, {
          name: '销量',
          type: 'bar',
          data: tData,
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }],
        animationEasing: 'elasticOut',
      };
      generateCharts(option);
    })
  }

  function getLineChart() {
    $.get("rpt/demo/bar1", function (result) {
      let qData = result.recordset;
      let xData = [];
      let aData = [];
      let tData = [];
      for (let obj in qData) {
        xData.push(qData[obj].Material);
        aData.push(qData[obj].Amount);
        tData.push(qData[obj].Qty);
      }
      option = {
        title: {
          text: '销售情况'
        },
        tooltip: {},
        legend: {
          data: ['销售额', '销量']
        },
        xAxis: {
          data: xData,
          silent: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [{
          name: '销售额',
          type: 'line',
          data: aData,
          animationDelay: function (idx) {
            return idx * 10;
          }
        }, {
          name: '销量',
          type: 'line',
          data: tData,
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }],
        animationEasing: 'elasticOut',
      };
      generateCharts(option);
    })
  }

  function getPieChart() {
    option = {

      title: {
        text: '销售渠道',
      },

      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '渠道来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            {value: 335, name: '电商'},
            {value: 310, name: '线下店'},
            {value: 274, name: '工程'},
            {value: 235, name: '分销商'},
            {value: 400, name: '厂家直销'}
          ].sort(function (a, b) {
            return a.value - b.value
          }),
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                //color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                // color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    generateCharts(option);
  }

  function generateCharts(option) {
    const contain = document.getElementById('charts');
    contain.style = "width: 800px; height: 600px;";
    const myChart = echarts.init(contain);
    myChart.setOption(option);
  }
})(jQuery);