'use strict'

let stepTypes;
(function (stepTypes) {
  stepTypes[stepTypes.WARMUP = 0] = 'WARMUP'
  stepTypes[stepTypes.WORK = 1] = 'WORK'
  stepTypes[stepTypes.RECOVER = 2] = 'RECOVER'
  stepTypes[stepTypes.COOLDOWN = 3] = 'COOLDOWN'
})(stepTypes || (stepTypes = {}))

let stepLengthTypes;
(function (stepLengthTypes) {
  stepLengthTypes[stepLengthTypes.DURATION = 0] = 'DURATION'
  stepLengthTypes[stepLengthTypes.DISTANCE = 1] = 'DISTANCE'
})(stepLengthTypes || (stepLengthTypes = {}))

let stepGoalTypes;
(function (stepGoalTypes) {
  stepGoalTypes[stepGoalTypes.RANGE = 0] = 'RANGE'
  stepGoalTypes[stepGoalTypes.TARGET = 1] = 'TARGET'
})(stepGoalTypes || (stepGoalTypes = {}))

let blockTypes;
(function (blockTypes) {
  blockTypes[blockTypes.WARMUP = 0] = 'WARMUP'
  blockTypes[blockTypes.ACTIVE = 1] = 'ACTIVE'
  blockTypes[blockTypes.RECOVERY = 2] = 'RECOVERY'
  blockTypes[blockTypes.COOLDOWN = 3] = 'COOLDOWN'
  blockTypes[blockTypes.TWOREPEATS = 4] = 'TWOREPEATS'
  blockTypes[blockTypes.THREEREPEATS = 5] = 'THREEREPEATS'
  blockTypes[blockTypes.RAMPUP = 6] = 'RAMPUP'
  blockTypes[blockTypes.RAMPDOWN = 7] = 'RAMPDOWN'
})(blockTypes || (blockTypes = {}))

export { stepTypes, stepLengthTypes, stepGoalTypes, blockTypes }
