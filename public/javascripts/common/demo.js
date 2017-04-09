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
      sectionsColor: ['#872F34', '#f2f2f2', '#7BAABE', '#ccddff', "#131313"],
      navigation: true
    });

    const contain = document.getElementById('charts');
    contain.style = "width: 800px; height: 600px;";

    $("#chart-bar").on("click", getBarChart);
    $("#chart-pie").on("click", getPieChart);
    $("#chart-line").on("click", getLineChart);
    $("#chart-scatter").on("click", getScaChart);
    $("#chart-radar").on("click", getRadarChart);
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
          text: '销售情况',
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
          text: '销售情况',
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
        left: 'center'
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

  function getRadarChart() {
    option = {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '销售（sales）', max: 6500},
          { name: '管理（Administration）', max: 16000},
          { name: '信息技术（Information Techology）', max: 30000},
          { name: '客服（Customer Support）', max: 38000},
          { name: '研发（Development）', max: 52000},
          { name: '市场（Marketing）', max: 25000}
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
          {
            value : [4300, 10000, 28000, 35000, 50000, 19000],
            name : '预算分配（Allocated Budget）'
          },
          {
            value : [5000, 14000, 28000, 31000, 42000, 21000],
            name : '实际开销（Actual Spending）'
          }
        ]
      }]
    };
    generateCharts(option);
  }
  
  function getScaChart() {
    let data = [
      [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
      [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
    ];

    option = {
      /*backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#f7f8fa'
      }, {
        offset: 1,
        color: '#cdd0d5'
      }]),*/
      title: {
        text: '1990 与 2015 年各国家人均寿命与 GDP'
      },
      legend: {
        right: 10,
        data: ['1990', '2015']
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        scale: true
      },
      series: [{
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize: function (data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: 'rgb(251, 118, 123)'
            }, {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }])
          }
        }
      }, {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize: function (data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: 'rgb(129, 227, 238)'
            }, {
              offset: 1,
              color: 'rgb(25, 183, 207)'
            }])
          }
        }
      }]
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