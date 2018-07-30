import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main3'));
        var date = ['2016/1','2016/2','2016/3','2016/4','2016/5','2016/6','2016/7','2016/8','2016/9','2016/10',
            '2016/11','2016/12'];
            
            
            function my_data(){
                var data = [];
                for( var i =0; i<12; i++){
                    data.push(Math.round(Math.random() * (500 - 100) + 100));
                };
                return data;
            }
        // 绘制图表
        myChart.setOption({
            title : {
                text: '购买订单交易记录'
            },
            color:[
                "#2ec7c9",
                "#b6a2de",
                "#5ab1ef",
                "#ffb980"
            ],
            tooltip : {
                trigger: 'axis',
                borderColor: '#2ec7c9',
                axisPointer: {
                    lineStyle: {
                        color:'#2ec7c9'
                    }
                }
            },
            legend: {
                data:['所有订单','待付款','未付款','待发货']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    data : date
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
             grid: {
                left: '3%',
                right: '4%',
                containLabel: true
            },
            
            series : [
                {
                    name:'所有订单',
                    type:'bar',
                    stack: '总量',
                    barMaxWidth : 30,
                    data:my_data()
                },
                {
                    name:'待付款',
                    type:'bar',
                    stack: '总量',
                    data:my_data()
                },
                {
                    name:'未付款',
                    type:'bar',
                    stack: '总量',
                    data:my_data()
                },
                {
                    name:'待发货',
                    type:'bar',
                    stack: '总量',
                    data:my_data()
                }
            ]
        });
    }
    render() {
        return (
            <div id="main3"></div>
        );
    }
}

export default EchartsTest;