'use strict'
let CIMStates;
(function (CIMStates) {
  CIMStates[CIMStates.SUMMARY = 0] = 'SUMMARY'
  CIMStates[CIMStates.WORKOUTBUILD = 1] = 'WORKOUTBUILD'
  CIMStates[CIMStates.ANALYSIS = 2] = 'ANALYSIS'
  CIMStates[CIMStates.NOTE = 3] = 'NOTE'
  CIMStates[CIMStates.GOALS = 4] = 'GOALS'
  CIMStates[CIMStates.EVENT = 5] = 'EVENT'
  CIMStates[CIMStates.METRICS = 6] = 'METRICS'
})(CIMStates || (CIMStates = {}))

export { CIMStates }
