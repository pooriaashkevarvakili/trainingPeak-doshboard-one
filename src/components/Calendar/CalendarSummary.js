export default function calendarSummary (props, week, empty) {
  const header = () => {
    return ('<header class="q-pa-xs q-px-sm bg-grey-3 row justify-between" style="border-top-left-radius: 5px; border-top-right-radius: 5px;">' +
      '<div>Week ' + week + '</div>' + '<div><button onclick="weekMenuClicked(' + week + ')" class="q-btn weekBTN">' +
      '<img height="17px" src="https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Navigation/SVG/ic_fluent_navigation_20_regular.svg"></button>' +
      '<div tabindex="-1" class="weekMenu q-menu q-position-engine scroll" style="visibility: hidden; right: 30px;"><div data-v-6fe9c4e2="" class="q-pa-xs" style="width: 100px; font-size: 90%;"><div data-v-6fe9c4e2="" class="q-list q-list--dense"><div data-v-6fe9c4e2="" tabindex="0" class="q-item q-item-type row no-wrap row justify-start q-item--clickable q-link cursor-pointer q-focusable q-hoverable"><div tabindex="-1" class="q-focus-helper"></div><div data-v-6fe9c4e2="" class="self-center" style="font-size: 105%;">' +
      '                      Copy' +
      '                    </div></div><div data-v-6fe9c4e2="" tabindex="0" class="q-item q-item-type row no-wrap row justify-start q-item--clickable q-link cursor-pointer q-focusable q-hoverable"><div tabindex="-1" class="q-focus-helper"></div><div data-v-6fe9c4e2="" class="self-center" style="font-size: 105%;">' +
      '                      Cut' +
      '                    </div></div><div data-v-6fe9c4e2="" tabindex="0" class="q-item q-item-type row no-wrap row justify-start q-item--clickable q-link cursor-pointer q-focusable q-hoverable"><div tabindex="-1" class="q-focus-helper"></div><div data-v-6fe9c4e2="" class="self-center" style="font-size: 105%;">' +
      '                      Paste' +
      '                    </div></div><div data-v-6fe9c4e2="" tabindex="0" class="q-item q-item-type row no-wrap row justify-start q-item--clickable q-link cursor-pointer q-focusable q-hoverable"><div tabindex="-1" class="q-focus-helper"></div><div data-v-6fe9c4e2="" class="self-center" style="font-size: 105%;">' +
      '                      Delete' +
      '                    </div></div></div></div></div>' +
      '</div>' +
      '</header>'
    )
  }

  const main = () => {
    return '<div class="row justify-between">' +
      '<div>Total Duration</div>' +
      '<div style="display: flex;"><div class="summary-goal">15:56 </div><strong class="q-ml-xs">10:00</strong></div>' +
      '</div>' +
      '<progress class="row full-width main-progress" value="0.4"></progress>' +
      '<div class="row justify-between">Total TSS' +
      '<div style="display: flex;"><div class="summary-goal">15:56 </div><strong class="q-ml-xs">10:00</strong></div>' +
      '</div>' +
      '<progress class="row full-width" value="0.4"></progress>'
  }
  // const swim = () => {
  //   return '<div class="row justify-between">Swim Duration' +
  //     '<div>15:56 <strong class="q-ml-xs">10:00</strong></div>' +
  //     '</div>' +
  //     '<progress class="row full-width" value="0.4"></progress>' +
  //     '<div class="row">Swim Distance</div>' +
  //     '<progress class="row full-width" value="0.4"></progress>'
  // }
  const bike = () => {
    return '<div class="row justify-between">Bike Duration' +
      '<div style="display: flex;"><div class="summary-goal">15:56 </div><strong class="q-ml-xs">10:00</strong></div>' +
      '</div>' +
      '<progress class="row full-width" value="0.4"></progress>'
  }
  const run = () => {
    return '<div class="row justify-between">Run Duration' +
      '<div style="display: flex;"><div class="summary-goal">15:56 </div><strong class="q-ml-xs">10:00</strong></div>' +
      '</div>' +
      '<progress class="row full-width" value="0.4"></progress>' +
      '<div class="row justify-between">Run Distance' +
      '<div style="display: flex;"><div class="summary-goal">15:56 </div><strong class="q-ml-xs">10:00</strong></div>' +
      '</div>' +
      '<progress class="row full-width" value="0.4"></progress>'
  }
  const generalStyling = () => {
    return '<style>' +
      `
         @media (max-width: 1280px) {
                .summary-goal {display: none;}
            }
        ` +
      'progress[value] {' +
      '  -webkit-appearance: none;' +
      '   appearance: none;' +
      '-moz-appearance: none;' +
      'border: none;' +
      'color: #393ccf; ' +
      '  height: 8px;' +
      '  margin-bottom: 6px' +
      '}' +
      'progress[value]::-webkit-progress-bar {' +
      '  background-color: #d2d2d2;' +
      '  border-radius: 2px;' +
      '  box-shadow: 0;' +
      '}' +
      'progress[value]::-webkit-progress-value {' +
      '  background-color: #393ccf;' +
      '    border-radius: 2px; ' +
      '    background-size: 35px 20px, 100% 100%, 100% 100%;' +
      '}' +
      'progress[value]::-moz-progress-bar { ' +
      '  background-color: #393ccf;' +
      '  border-radius: 2px; ' +
      '  background-size: 35px 20px, 100% 100%, 100% 100%; ' +
      '}' +
      'progress[value]:first-of-type {height: 12px;}' +

      '</style>'
  }

  if (empty) {
    return header() + generalStyling()
  }
  return header() +
    '<div class="col q-pa-xs" style="font-size: 80%;">' +
    main() +
    bike() +
    run() +
    '</div>' +
    generalStyling()
}

window.weekMenuClicked = function (_week) {
  document.getElementsByClassName('weekMenu')[parseInt(_week) - 1].style.visibility =
    document.getElementsByClassName('weekMenu')[parseInt(_week) - 1].style.visibility === 'visible' ? 'hidden' : 'visible'

  if (document.getElementsByClassName('weekMenu')[parseInt(_week) - 1].style.visibility === 'visible') {
    const specifiedElement = document.getElementsByClassName('weekBTN')[parseInt(_week) - 1]

    const weekDays = [...document.getElementsByClassName(`week-${_week}`)].filter((item) => {
      return item.classList.contains('in-month')
    })
    weekDays.forEach((day) => {
      day.children[0].style.transition = 'background-color 75ms linear'
      day.children[0].style.border = '1px dashed black'
      day.children[0].style['background-color'] = 'rgba(0,0,0,0.25)'
    })

    function clickOutsideEvent (event) {
      const isClickInside = specifiedElement.contains(event.target)

      if (!isClickInside) {
        document.getElementsByClassName('weekMenu')[parseInt(_week) - 1].style.visibility = 'hidden'
        document.removeEventListener('click', clickOutsideEvent)
        weekDays.forEach((day) => {
          day.children[0].style.border = '1px solid rgba(0, 0, 0, 0.12)'
          day.children[0].style['background-color'] = 'rgba(0,0,0,0)'
        })
      }
    }

    document.addEventListener('click', clickOutsideEvent)
  }
}
