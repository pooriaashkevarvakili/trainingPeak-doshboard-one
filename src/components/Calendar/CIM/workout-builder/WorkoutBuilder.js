import { stepTypes, stepLengthTypes, stepGoalTypes, blockTypes } from './Models'

const WorkoutStep = ({ title, length, goal, type }) => ({
  title,
  length,
  goalType: goal.type,
  goal: (goal.type === stepGoalTypes.RANGE ? { min: goal.min, max: goal.max } : goal.value),
  type,
  note: null
})

const WarmUp = () => ({
  structure: [
    WorkoutStep({
      title: 'Warm up',
      length: { type: stepLengthTypes.DURATION, value: 20 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 40, max: 50 },
      type: stepTypes.WARMUP
    })
  ]
})

const Active = () => ({
  structure: [
    WorkoutStep({
      title: 'Active',
      length: { type: stepLengthTypes.DURATION, value: 10 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 70, max: 80 },
      type: stepTypes.WORK
    })
  ]
})

const Recovery = () => ({
  structure: [
    WorkoutStep({
      title: 'Recovery',
      length: { type: stepLengthTypes.DURATION, value: 5 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 50, max: 60 },
      type: stepTypes.RECOVER
    })
  ]
})

const CoolDown = () => ({
  structure: [
    WorkoutStep({
      title: 'Cool Down',
      length: { type: stepLengthTypes.DURATION, value: 10 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 40, max: 50 },
      type: stepTypes.COOLDOWN
    })
  ]
})

const TwoSteps = () => ({
  structure: [
    WorkoutStep({
      title: 'Hard',
      length: { type: stepLengthTypes.DURATION, value: 6 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 85, max: 95 },
      type: stepTypes.WORK
    }),
    WorkoutStep({
      title: 'Easy',
      length: { type: stepLengthTypes.DURATION, value: 3 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 50, max: 60 },
      type: stepTypes.RECOVER
    })
  ]
})

const ThreeSteps = () => ({
  structure: [
    WorkoutStep({
      title: 'Hard',
      length: { type: stepLengthTypes.DURATION, value: 3 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 75, max: 85 },
      type: stepTypes.WORK
    }),
    WorkoutStep({
      title: 'Harder',
      length: { type: stepLengthTypes.DURATION, value: 1 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 90, max: 100 },
      type: stepTypes.WORK
    }),
    WorkoutStep({
      title: 'Easy',
      length: { type: stepLengthTypes.DURATION, value: 1 * 60 * 1000 },
      goal: { type: stepGoalTypes.RANGE, min: 50, max: 60 },
      type: stepTypes.RECOVER
    })
  ]
})

const Ramp = (down) => {
  const generateStructure = (steps) => {
    return [...new Array(steps)].map((item, index) => {
      return WorkoutStep({
        length: { type: stepLengthTypes.DURATION, value: 3 * 60 * 1000 },
        goal: { type: stepGoalTypes.RANGE, min: 55 + index * (95 - 55) / steps, max: 55 + (index + 1) * (95 - 55) / steps },
        type: stepTypes.WORK
      })
    })
  }

  const _obj = {
    steps: 4,
    structure: (down) ? generateStructure(4).reverse() : generateStructure(4)
  }

  const _stepsHandler = {
    set (obj, prop, value) {
      if (prop === 'steps') {
        if (Reflect.set(...arguments)) {
          obj.structure = generateStructure(value)
          return true
        }
      }
    }
  }

  return new Proxy(_obj, _stepsHandler)
}

export default class WorkoutBuilder {
  static types = blockTypes
  static EGoal = stepGoalTypes
  static ELength = stepLengthTypes
  static EWork = stepTypes

  static setGoalType (step, newType) {
    // ex: target 50 will be transformed to (45,55)
    const targetToRangeTransformFactor = 10
    const newStep = step
    newStep.goalType = newType
    if (newType === stepGoalTypes.TARGET) { newStep.goal = Math.floor((step.goal.min + step.goal.max) / 2) } else if (newType === stepGoalTypes.RANGE) { newStep.goal = { min: step.goal - targetToRangeTransformFactor / 2, max: step.goal + targetToRangeTransformFactor / 2 } }
    return newStep
  }

  static setLengthType (step, newType, newLength) {
    // newLength is currently optional (and is a hack)
    // i should figure out a way to calculate the correct-ish value of "newLength"
    // but the function probably needs to iterate over the WHOLE training plan each time it is called
    // which is not ideal.
    // for now though, i will set to 3 minutes.
    const defaultDurationLength = 3 * 60 * 1000
    const defaultDistanceLength = 0.01 * 10000000
    const newStep = step
    newStep.length.type = newType
    if (newType === stepLengthTypes.DISTANCE) {
      newStep.length.value = newLength | defaultDistanceLength
    } else if (newType === stepLengthTypes.DURATION) {
      newStep.length.value = newLength | defaultDurationLength
    }
    return newStep
  }

  static build (type) {
    switch (type) {
      case blockTypes.WARMUP:
        return WarmUp()
      case blockTypes.ACTIVE:
        return Active()
      case blockTypes.RECOVERY:
        return Recovery()
      case blockTypes.COOLDOWN:
        return CoolDown()
      case blockTypes.TWOREPEATS:
        return TwoSteps()
      case blockTypes.THREEREPEATS:
        return ThreeSteps()
      case blockTypes.RAMPDOWN:
        return Ramp(true)
      case blockTypes.RAMPUP:
        return Ramp()
    }
  }
}
