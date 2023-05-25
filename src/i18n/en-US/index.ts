// This is just an example,
// so you can safely delete all default props below

export default {
  branding: {
    short: 'VO2',
    normal: 'VO2 Academy',
    full: 'VO2 Cycling Academy',
    motto: 'Hit Your Stride'
  },
  layout: {
    drawer: {
      title: 'Menu',
      dashboard: 'Dashboard',
      calendar: 'Calendar',
      analysis: 'Analysis',
      sportManagment: 'ATP',
      CollectPractive: 'CollectPractive',
      settings: 'Settings',
      Strategy: 'Strategy',
      activity: 'activity',
      signOut: 'signOut',
      home: 'home',
    }
  },
  activities: {
    cycling: {
      athlete: 'Cyclist',
      name: 'Cycling'
    },
    running: {
      name: 'Running',
      athlete: 'Runner'
    },
    fitness: {
      name: 'Weights',
      athlete: 'Lifter'
    }
  },
  components: {
    perfMetrics: {
      title: 'Performance Metrics',
      fatigue: 'Fatigue',
      fitness: 'Fitness',
      form: 'Form'
    },
    frr: {
      title: 'Fitness Ramp Rates',
      last7: 'Last 7 Days',
      last28: 'Last 28 Days',
      last90: 'Last 90 Days',
      last365: 'Last 365 Days'
    },
    nextEvent: {
      title: 'Next Event'
    },
    plans: {
      yesterday: 'Yesterday',
      today: 'Today',
      tomorrow: 'Tomorrow'
    },
    reminders: {
      sure: 'Are you sure?'
    },
    articles: {
      title: 'Helpful Blog Articles'
    }
  },
  pages: {
    index: {
      athlete: 'Athlete'
    },
    settings: {
      general: {
        title: 'General',
        sections: {
          lang: {
            title: 'Language',
            subtitle: 'Choose the App Language'
          }
        }
      },
      appearance: {
        title: 'Appearance',
        sections: {
          theme: {
            title: 'Theme',
            subtitle: 'Select App Theme',
            dark: 'Dark',
            light: 'Light'
          }
        }
      },
      zones: {
        title: 'Zones',
        sections: {
          heartRate: {
            title: 'Heart Rate',
            subtitle: 'Default Heart Rate',
            threshold: 'Threshold Values',
            thresh: 'Threshold Heart Rate',
            max: 'Max Heart Rate'
          }
        }
      },
      calendar: {
        title: 'Calendar'
      },
      charts: {
        title: 'Charts'
      },
      payments: {
        title: 'Payments'
      }
    },
    analysis: {
      settings: {
        customTitle: 'Custom Title',
        dateOptions: {
          title: 'Date Options',
          from: 'from',
          to: 'to',
          dates: {
            useDashboard: 'Use Dashboard Settings',
            custom: 'Custom Dates',
            customThrough: 'Custom Dates Through Today',
            last7: 'Last 7 Days',
            last14: 'Last 14 Days',
            last28: 'Last 28 Days',
            last90: 'Last 90 Days',
            last180: 'Last 180 Days',
            last365: 'Last 365 Days',
            last730: 'Last 730 Days',
            thisWeek: 'This Week',
            thisMonth: 'This Month',
            thisYear: 'This Year',
            lastWeek: 'Last Week',
            lastMonth: 'Last Month',
            last3Months: 'Last 3 Months',
            lastYear: 'Last Year',
            last2Years: 'Last 2 Years',
            thisWeekLastYear: 'This Week Last Year',
            thisMonthLastYear: 'This Month Last Year',
            nextWeek: 'Next Week',
            last28andNext7: 'Last 28 and Next 7 Days',
            last90andNext21: 'Last 90 and Next 21 Days',
            last180andNext45: 'Last 180 and Next 45 Days',
            customThroughNext7: 'Custom Date Through Next 7 Days'
          }
        },
        workouts: {
          title: 'Workout Types',
          all: 'All'
        },
        constants: {
          title: 'Constants',
          atlStart: 'ATL Constant',
          atlValue: 'ATL Start',
          ctlValue: 'CTL Constant',
          ctlStart: 'CTL Start'
        },
        misc: {
          title: 'Other',
          showTSBFill: 'Show TSB Fill',
          showSecondATL: 'Show Second ATL Series',
          showTSS: 'Show TSS Per Day',
          showIF: 'Show IF Per Day'
        },
        cancel: 'Cancel',
        save: 'Save & Close'
      }
    }
  }
}
