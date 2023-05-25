import { defineStore } from 'pinia';
///@ts-ignore
let EChartTypes;
(function (EChartTypes) {
  ///@ts-ignore
  EChartTypes[EChartTypes.BAR = 0] = 'BAR'
  ///@ts-ignore
  EChartTypes[EChartTypes.PIE = 3] = 'PIE'
  ///@ts-ignore
  EChartTypes[EChartTypes.LINE = 4] = 'LINE'
  ///@ts-ignore
  EChartTypes[EChartTypes.AREA = 5] = 'AREA'
  ///@ts-ignore
  EChartTypes[EChartTypes.MIXED = 6] = 'MIXED'
  ///@ts-ignore
  EChartTypes[EChartTypes.SCATTER = 7] = 'SCATTER'
  ///@ts-ignore
  EChartTypes[EChartTypes.TABLE = 8] = 'TABLE'
  ///@ts-ignore
  EChartTypes[EChartTypes.MAP = 9] = 'MAP'
})(EChartTypes || (EChartTypes = {}))
///@ts-ignore
let EChartCategories;
(function (EChartCategories) {
  ///@ts-ignore
  EChartCategories[EChartCategories.TIMEPERIOD = 0] = 'TIMEPERIOD'
  ///@ts-ignore
  EChartCategories[EChartCategories.LONGEST = 1] = 'LONGEST'
  ///@ts-ignore
  EChartCategories[EChartCategories.PEAK = 2] = 'PEAK'
  ///@ts-ignore
  EChartCategories[EChartCategories.ZONE = 3] = 'ZONE'
  ///@ts-ignore
  EChartCategories[EChartCategories.MISC = 4] = 'MISC'
})(EChartCategories || (EChartCategories = {}))
export const useCounterStore = defineStore('counter', {
  state: () => ({
    ItemAnalysis: {
      available: [
        {
          ///@ts-ignore
          type: EChartTypes.MIXED,
          title: 'Graph',
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'value'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Distribution Chart - Cadence',
          xAxis: {
            type: 'value',
            label: 'Cadence'
          },
          yAxis: {
            type: 'value',
            label: 'Minutes'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Distribution Chart - Heart Rate',
          xAxis: {
            type: 'value',
            label: 'Heart Rate'
          },
          yAxis: {
            type: 'value',
            label: 'Minutes'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Distribution Chart - Power',
          xAxis: {
            type: 'value',
            label: 'Power'
          },
          yAxis: {
            type: 'value',
            label: 'Minutes'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Distribution Chart - Speed/Pace',
          xAxis: {
            type: 'value',
            label: 'Speed/Pace'
          },
          yAxis: {
            type: 'value',
            label: 'Minutes'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Time in Zones - Heart Rate',
          xAxis: {
            type: 'value',
            label: 'Zones'
          },
          yAxis: {
            type: 'value',
            label: 'Minutes'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Time in Zones - Power',
          xAxis: {
            type: 'value',
            label: 'Zones'
          },
          yAxis: {
            type: 'value',
            label: 'Minutes'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Time in Zones - Speed',
          xAxis: {
            type: 'value',
            label: 'Zones'
          },
          yAxis: {
            type: 'value',
            label: 'Minutes'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.TABLE,
          title: 'Data Grid'
        },
        {
          ///@ts-ignore
          type: EChartTypes.TABLE,
          title: 'Laps and Splits'
        },
        {
          ///@ts-ignore
          type: EChartTypes.MAP,
          title: 'Map'
        },
        {
          ///@ts-ignore
          type: EChartTypes.AREA,
          title: 'Peak Pace by Distance',
          xAxis: {
            type: 'time',
            label: 'Time'
          },
          yAxis: {
            type: 'value',
            label: 'Watts'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.AREA,
          title: 'Peaks - Cadence',
          xAxis: {
            type: 'time',
            label: 'Time'
          },
          yAxis: {
            type: 'value',
            label: 'Watts'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.AREA,
          title: 'Peaks - Heart Rate',
          xAxis: {
            type: 'time',
            label: 'Time'
          },
          yAxis: {
            type: 'value',
            label: 'Watts'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.AREA,
          title: 'Peaks - Power',
          xAxis: {
            type: 'time',
            label: 'Time'
          },
          yAxis: {
            type: 'value',
            label: 'Watts'
          }
        },
        {
          ///@ts-ignore
          type: EChartTypes.AREA,
          title: 'Peaks - Speed',
          xAxis: {
            type: 'time',
            label: 'Time'
          },
          yAxis: {
            type: 'value',
            label: 'Watts'
          }
        }
      ],
      selected: [{
        ///@ts-ignore
        type: EChartTypes.BAR,
        title: 'Distribution Chart - Speed/Pace',
        xAxis: {
          type: 'value',
          label: 'Speed/Pace'
        },
        yAxis: {
          type: 'value',
          label: 'Minutes'
        }
      }]
    },
    Analysis: {
      available: [
        {
          ///@ts-ignore
          category: EChartCategories.TIMEPERIOD,
          ///@ts-ignore
          type: EChartTypes.BAR,
          title: 'Calories by Time Period',
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value'
          }
        },
        ...['Distance', 'Duration', 'Elevation Gain', 'Kilojoules', 'TSS'].map(item => {
          // cuz im lazy :)
          return {
            ///@ts-ignore
            category: EChartCategories.TIMEPERIOD,
            ///@ts-ignore
            type: EChartTypes.BAR,
            title: `${item} by Week/Day`,
            xAxis: {
              type: 'time'
            },
            yAxis: {
              type: 'value'
            }
          }
        }),
        ...['HR', 'Power', 'Speed'].map(item => {
          // very lazy.
          return {
            ///@ts-ignore
            category: EChartCategories.ZONE,
            ///@ts-ignore
            type: EChartTypes.BAR,
            title: `Time in ${item} Zones`,
            xAxis: {
              type: 'time'
            },
            yAxis: {
              type: 'value'
            }
          }
        }),
        ...['Cadence', 'HR', 'Pace', 'Power', 'Speed'].map(item => {
          // oh well.
          return {
            ///@ts-ignore
            category: EChartCategories.PEAK,
            ///@ts-ignore
            type: EChartTypes.AREA,
            title: `Peak ${item}`,
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'value'
            }
          }
        })
      ],
      selected: []
    },
    ///@ts-ignore
    EChartTypes: EChartTypes,
    ///@ts-ignore
    EChartCategories: EChartCategories,
    chartIcons: [
      ///@ts-ignore
      { type: EChartTypes.BAR, icon: 'icon-ic_fluent_data_histogram_24_regular' },
      ///@ts-ignore
      { type: EChartTypes.PIE, icon: 'icon-ic_fluent_data_pie_20_regular' },
      ///@ts-ignore
      { type: EChartTypes.LINE, icon: 'icon-ic_fluent_data_line_20_regular' },
      ///@ts-ignore
      { type: EChartTypes.AREA, icon: 'icon-ic_fluent_data_area_24_regular' },
      ///@ts-ignore
      { type: EChartTypes.MIXED, icon: 'icon-ic_fluent_data_sunburst_24_regular' },
      ///@ts-ignore
      { type: EChartTypes.SCATTER, icon: 'icon-ic_fluent_data_scatter_24_regular' },
      ///@ts-ignore
      { type: EChartTypes.TABLE, icon: 'icon-ic_fluent_table_20_regular' },
      ///@ts-ignore
      { type: EChartTypes.MAP, icon: 'icon-ic_fluent_map_20_regular' }
    ]

  }),
  getters: {
    getItemAnalysisCharts: (state) => {
      return state.ItemAnalysis.available
    },

    getItemAnalysisSelectedCharts: (state) => {
      return state.ItemAnalysis.selected
    },

    getChartTypes: (state) => {
      return state.EChartTypes
    },

    getAnalysisCharts: (state) => {
      return state.Analysis.available
    },

    getAnalysisSelectedCharts: (state) => {
      return state.Analysis.selected
    },

    getChartCategories: (state) => {
      return state.EChartCategories
    },

    getChartIcons: (state) => {

      return state.chartIcons
    }
  },
  actions: {
    ///@ts-ignore
    addSelectedItemAnalysisChart: (state, chart) => {
      state.ItemAnalysis.selected.push(chart)
    },
    ///@ts-ignore
    removeSelectedItemAnalysisChart: (state, chart) => {
      ///@ts-ignore
      state.ItemAnalysis.selected.splice(state.ItemAnalysis.selected.findIndex(item => item === chart), 1)
    },
    ///@ts-ignore
    changeChartIndex: (state, { oldIndex, newIndex }) => {
      const arr = state.ItemAnalysis.selected
      if (newIndex >= arr.length) {
        let k = newIndex - arr.length + 1
        while (k--) {
          arr.push(undefined)
        }
      }
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    },

    // For the analysis page
    ///@ts-ignore
    addSelectedAnalysisChart: (state, chart) => {
      state.Analysis.selected.push(chart)
    },
    ///@ts-ignore
    removeSelectedAnalysisChart: (state, chart) => {
      ///@ts-ignore
      state.Analysis.selected.splice(state.Analysis.selected.findIndex(item => item === chart), 1)
    }
  }
});
