import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.initChartData = this.initChartData.bind(this);
    this.setXAxis = this.setXAxis.bind(this);
    this.setSeries = this.setSeries.bind(this);
    this.updateChartData = this.updateChartData.bind(this);
    this.state = {
      companies: [],
      openPrices: [],
      closePrices: []
    }
    this.state.options = this.initChartData();
  }
  initChartData() {
    let options = {
      title : {
        text: '股票开盘价与收盘价',
        subtext: '纯属虚构'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['Open Price', 'Close Price']
      },
      toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
      },
      calculable : true,
      xAxis : this.setXAxis(this.state.companies),
      yAxis : [
          {
              type : 'value'
          }
      ],
      series: this.setSeries(this.state.openPrices, this.state.closePrices)
    };
    return options;
  }
  setXAxis(data) {
    return [{
      type: 'category',
      data: data
    }];
  }
  setSeries(col1Data, col2Data) {
    return [
      {
        name: 'Open Price',
        type: 'bar',
        data: col1Data
      },
      {
        name: 'Close Price',
        type: 'bar',
        data: col2Data
      }
    ]
  }
  componentWillMount() {
    let me = this;
    let url = "https://api.iextrading.com/1.0/stock/market/list/gainers";
    let companies = [], openPrices = [], closePrices = [];
    $.get(url).done(function (data) {
      $.each(data, function (i, obj) {
        companies.push(obj.symbol);
        openPrices.push(obj.open);
        closePrices.push(obj.close);
      })
      me.setState({
        options: {
          xAxis: me.setXAxis(companies),  // companies, openPrices, closePrices in state are still [].
          series: me.setSeries(openPrices, closePrices)
        }
      }, function () {
        me.updateChartData()
        console.log('update options finished')
      });
      console.log('success');
    }).fail(function (error) {
      console.log(error);
    })
  }
  componentDidMount() {
    this.updateChartData();
  }
  updateChartData() {
    console.log(this.state);
    if (!this.myChart) {
      this.myChart = echarts.init(this.refs.barChart1);
    }
    //let options = this.initChartData();
    this.myChart.setOption(this.state.options);
  }
  render() {
    console.log('rendering');
    return (
      <div className="barChart">
        <div ref="barChart1" style={{width: "800px", height: "600px"}}>
        </div>
      </div>
    )
  }
}
export default BarChart;
