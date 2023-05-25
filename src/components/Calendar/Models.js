let CalendarItemTypes;
(function (CalendarItemTypes) {
  CalendarItemTypes[CalendarItemTypes.WORKOUT = 0] = 'WORKOUT'
  CalendarItemTypes[CalendarItemTypes.NOTE = 3] = 'NOTE'
  CalendarItemTypes[CalendarItemTypes.GOALS = 4] = 'GOALS'
  CalendarItemTypes[CalendarItemTypes.EVENT = 5] = 'EVENT'
  CalendarItemTypes[CalendarItemTypes.METRICS = 6] = 'METRICS'
})(CalendarItemTypes || (CalendarItemTypes = {}))

let WorkoutTypes;
(function (WorkoutTypes) {
  WorkoutTypes[WorkoutTypes.WORKOUT = 0] = 'RUN'
  WorkoutTypes[WorkoutTypes.GOAL = 1] = 'CYCLE'
  WorkoutTypes[WorkoutTypes.METRICS = 2] = 'SWIM'
  WorkoutTypes[WorkoutTypes.NOTE = 3] = 'WEIGHT'
  WorkoutTypes[WorkoutTypes.EVENT = 4] = 'REST'
})(WorkoutTypes || (WorkoutTypes = {}))

export { CalendarItemTypes, WorkoutTypes }
