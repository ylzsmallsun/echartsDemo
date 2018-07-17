import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.initChartData = this.initChartData.bind(this);
    this.setXAxis = this.setXAxis.bind(this);
    this.updateChartData = this.updateChartData.bind(this);
    this.state = {
      options: this.initChartData()
    }
  }
  initChartData(dateValues, prices) {
    let options = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: 'AAPL月净值图'
      },
      toolbox: {
        feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: this.setXAxis([]),
      yAxis: {
          type: 'value',
          min: 140,
          max: 240,
          boundaryGap: [0, '100%']
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
      }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: [
        {
          name: '',
          type: 'line',
          data: []
        }
      ]
    };
    return options;
  }
  setXAxis(dates) {
    return {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        rotate: 30
      },
      data: dates
    }
  }
  setSeries(prices) {
    return [
      {
        name:'当日收盘价',
        type:'line',
        smooth:0.2,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
              color: 'rgb(255, 70, 131)'
          }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            }
        },
        data: prices
      }
    ];
  }
  componentDidMount() {
    let me = this;
    if (!this.myChart) {
      this.myChart = echarts.init(this.refs.lineChart1);
    }
    let options = me.initChartData();
    this.myChart.setOption(options);
    this.myChart.showLoading();
    let dateValues = [], prices = [];
    let url = 'https://api.iextrading.com/1.0/stock/aapl/chart/1m';
    $.get(url).done(function (data) {
      $.each(data, function (i, obj) {
        dateValues.push(obj.date);
        prices.push(obj.close);
      });
      me.setState({
        options: {
          ...me.state.options,
          xAxis: me.setXAxis(dateValues),  // companies, openPrices, closePrices in state are still [].
          series: me.setSeries(prices)
        }
      }, function () {
        me.updateChartData()
        console.log('update options finished')
      });
    });
  }
  updateChartData() {
    this.myChart.setOption(this.state.options);
    this.myChart.hideLoading();
  }
  render() {
    return (
      <div className="lineChart">
        <div ref="lineChart1" style={{width: "800px", height: "600px"}}>
        </div>
      </div>
    )
  }
}

export default LineChart;
