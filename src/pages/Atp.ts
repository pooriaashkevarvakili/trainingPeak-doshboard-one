/* =========================================================================================
    File Name: Atp.js
    Description: Atp Component
    Component Name: Atp
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== */
import 'echarts-gl'

import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent,
    MarkLineComponent
} from 'echarts/components';
import {
    LineChart,
    BarChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';
echarts.use(
    [TooltipComponent, GridComponent, MarkLineComponent, BarChart, LineChart, CanvasRenderer]
);
export default {
    name: 'ATP',
    setup() {
        const columns = [
            {
                label: 'Week',
                field: 'week',
            },
            {
                label: 'Weeks to Event',
                field: 'weeksToEvent',
            },
            {
                label: 'Event',
                field: 'event',
            },
            {
                label: 'Priority',
                field: 'priority',
            },
            {
                label: 'Period',
                field: 'period',
                tdClass: 'data-period'
            },
            {
                label: 'Tss',
                field: 'tss',
            },
            {
                label: 'Completed',
                field: 'completed',
            },
            {
                label: 'Ramp Rate',
                field: 'rampRate',
            },
            {
                label: 'Details',
                field: 'details',
            },
            {
                label: 'Fitness ATP',
                field: 'fitATP',
            },
            {
                label: 'Fitness Actual',
                field: 'fitActual',
            },
            {
                label: 'Form ATP',
                field: 'formATP',
            },
            {
                label: 'Form Actual',
                field: 'formActual',
            },
            {
                label: 'Strength',
                field: 'strength',
            }
        ]
        const rows = [...new Array(12)].map(r => {
            return {
                mode: 'span', // span means this header will span all columns
                label: 'June', // this is the label that'll be used for the header
                html: false, // if this is true, label will be rendered as html
                children: [
                    { week: '1-7', weeksToEvent: 2, event: '', priority: 1, period: '10', tss: 100, completed: 100, rampRate: 120, details: '', fitATP: 50, fitActual: 40, formATP: 80, formActual: 90, strength: 200 },
                    { week: '8-14', weeksToEvent: 1, event: '', priority: 1, period: '10', tss: 100, completed: 80, rampRate: 120, details: '', fitATP: 50, fitActual: 40, formATP: 80, formActual: 90, strength: 200 },
                    { week: '15-21', weeksToEvent: 1, event: '', priority: 1, period: '10', tss: 100, completed: 80, rampRate: 120, details: '', fitATP: 50, fitActual: 40, formATP: 80, formActual: 90, strength: 200 },
                    { week: '22-28', weeksToEvent: 1, event: '', priority: 1, period: '10', tss: 100, completed: 80, rampRate: 120, details: '', fitATP: 50, fitActual: 40, formATP: 80, formActual: 90, strength: 200 },
                    { week: '28-31', weeksToEvent: 1, event: '', priority: 1, period: '10', tss: 100, completed: 80, rampRate: 120, details: '', fitATP: 50, fitActual: 40, formATP: 80, formActual: 90, strength: 200 }
                ]
            }
        })
        ///@ts-ignore
        function populateChart(type) {
            const len = 21
            switch (type) {
                case 'past':
                    return [...new Array(len)].map((c, i) => Math.floor(Math.random() * 5) + i + 90)

                case 'now':
                    ///@ts-ignore
                    return [].concat(...new Array(len - 1).fill(null), [23 + 90])
                case 'planned':
                    ///@ts-ignore
                    return [].concat([...new Array(len - 1)].fill(null), [...new Array(len)].map((c, i) => Math.floor(Math.random() * 6) + 21 + i + 90))
                case 'goal':
                    ///@ts-ignore
                    return [].concat([...new Array(2 * (len - 1))].fill(null), [42 + 90])
            }
            return -1
        }
        return {
            columns, rows, populateChart
        }
    },
    mounted() {
        var chartDom = document.getElementById('main');
        ///@ts-ignore
        var myChart = echarts.init(chartDom);



        var option;

        option = {
            height: 240,

            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'line'
                }
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '3%',
                top: '10%',
                containLabel: false,
                show: false
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                    },
                },
                {
                    type: 'category',
                    id: 'months',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                    },
                    show: true,
                    data: [...new Array(12)].map((m, i) => {
                        return {
                            value: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
                            textStyle: {
                                fontSize: 10,
                                backgroundColor: null,
                                direction: 'rtl'
                            }
                        }
                    }),
                    position: "top",
                    nameLocation: "start",
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.05)']
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false,
                    ///@ts-ignore
                    max: function (value) {
                        return value.max + 70;
                    }
                }
            ],
            series: [
                {
                    data: [...new Array(41)].map(d => Math.random() * 100 + 90),
                    type: 'line',
                    areaStyle: {},
                    symbolSize: 0,
                    lineStyle: {
                        width: 0
                    },
                    z: 0,
                    animationDuration: 0,
                    smooth: true
                },
                {
                    name: 'Completed',
                    type: 'bar',
                    stack: 'a',
                    data: [
                        {
                            value: 120,
                            itemStyle: {
                                color: '#3d3d3d'
                            }
                        },
                        {
                            value: 150,
                            itemStyle: {
                                color: '#3d3d3d'
                            }
                        },
                        {
                            value: 90,
                            itemStyle: {
                                color: '#3d3d3d'
                            }
                        },
                        {
                            value: 200,
                            itemStyle: {
                                color: '#3d3d3d'
                            }
                        },
                        {
                            value: 120,
                            itemStyle: {
                                color: '#6590b2'
                            }
                        },
                        {
                            value: 150,
                            itemStyle: {
                                color: '#6590b2'
                            }
                        },
                        {
                            value: 90,
                            itemStyle: {
                                color: '#6590b2'
                            }
                        },
                        {
                            value: 200,
                            itemStyle: {
                                color: '#6590b2'
                            }
                        },
                        {
                            value: 120,
                            itemStyle: {
                                color: '#0b5787'
                            }
                        },
                        {
                            value: 140,
                            itemStyle: {
                                color: '#0b5787'
                            }
                        },
                        {
                            value: 120,
                            itemStyle: {
                                color: '#0b5787'
                            }
                        },
                        {
                            value: 50,
                            itemStyle: {
                                color: '#0b5787'
                            }
                        },
                        {
                            value: 160,
                            itemStyle: {
                                color: '#509932'
                            }
                        },
                        {
                            value: 80,
                            itemStyle: {
                                color: '#509932'
                            }
                        },
                        {
                            value: 150,
                            itemStyle: {
                                color: '#509932'
                            }
                        },
                        {
                            value: 120,
                            itemStyle: {
                                color: '#509932'
                            }
                        },
                        {
                            value: 75,
                            itemStyle: {
                                color: '#82a83b'
                            }
                        },
                        {
                            value: 140,
                            itemStyle: {
                                color: '#82a83b'
                            }
                        },
                        {
                            value: 90,
                            itemStyle: {
                                color: '#82a83b'
                            }
                        },
                        {
                            value: 110,
                            itemStyle: {
                                color: '#82a83b'
                            }
                        },
                        {
                            value: 200,
                            itemStyle: {
                                color: '#82a83b'
                            }
                        }
                    ]
                },
                {
                    name: 'Diff',
                    type: 'bar',
                    stack: 'a',
                    itemStyle: {
                        color: '#d2d2d2'
                    },
                    data: [50, 20, 110, 0, 50, 50, 20, 10, 50, 20, 110, 0, 50, 50, 20, 10, 50, 50, 20, 30, 90, 200, 150, 110, 170, 150, 200, 150, 110, 170, 150, 200, 150, 110, 170, 150, 200, 150, 110, 170, 150]
                },
                {
                    ///@ts-ignore
                    data: this.populateChart('past'),
                    type: 'line',
                    itemStyle: {
                        color: '#978073',
                    },
                    lineStyle: {
                        shadowColor: "rgba(0, 0, 0, 0.20)",
                        shadowOffsetY: 2
                    },
                    symbolSize: 1,
                    animationDuration: 0,
                    smooth: true
                },
                {
                    ///@ts-ignore
                    data: this.populateChart('now'),
                    type: 'line',
                    itemStyle: {
                        color: '#FF6600'
                    },
                    symbolSize: 8,
                    animationDuration: 0,
                    smooth: true
                },
                {
                    ///@ts-ignore
                    data: this.populateChart('planned'),
                    type: 'line',
                    itemStyle: {
                        color: '#FF9F5F'
                    },
                    lineStyle: {
                        type: 'dashed',
                        shadowColor: "rgba(0, 0, 0, 0.20)",
                        shadowOffsetY: 2
                    },
                    symbolSize: 1,
                    animationDuration: 0,
                    smooth: true
                },
                {
                    ///@ts-ignore
                    data: this.populateChart('goal'),
                    type: 'line',
                    itemStyle: {
                        color: '#FF6600'
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    animationDuration: 0,
                    smooth: true
                }
            ]
        };

        option && myChart.setOption(option);

        const colors = ['#3d3d3d', '#6590b2', '#0b5787', '#509932', '#82a83b']
        ///@ts-ignore
        const periods = [...document.getElementsByClassName('data-period')]
        periods.forEach((p, index) => {
            p.style.backgroundColor = colors[Math.floor(index / 5) % 5]
        })
    }
}