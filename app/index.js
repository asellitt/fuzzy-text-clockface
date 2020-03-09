import clock from "clock"
import { HeartRateSensor } from "heart-rate"
import { today } from "user-activity"
import { battery } from "power"
import document from "document"
import { preferences } from "user-settings"
import * as util from "../common/utils"

const minutesText = document.getElementById("minutes")
const joinText = document.getElementById("join")
const hoursText = document.getElementById("hours")
const oClockHoursText = document.getElementById("oClockHours")
const oClockText = document.getElementById("oClock")
const dateText = document.getElementById("date")

clock.granularity = "minutes"
clock.ontick = (event) => {
  const today = event.date
  const hours = today.getHours()
  const minutes = today.getMinutes()

  const oClock = util.endWord(minutes)
  if(oClock) {
    oClockHoursText.text = util.hourToWord(hours, minutes)
    oClockText.text = oClock
    minutesText.text = ""
    joinText.text = ""
    hoursText.text = ""
  }
  else {
    minutesText.text = util.minutesToWord(minutes)
    joinText.text = util.joinWord(minutes)
    hoursText.text = util.hourToWord(hours, minutes)
    oClockHoursText.text = ""
    oClockText.text = ""
  }
  
  dateText.text = util.dateString()
}

const heartRateText = document.getElementById("heartRate")
const caloriesBurnedText = document.getElementById("caloriesBurned")
const stepsText = document.getElementById("steps")

const hrm = new HeartRateSensor()
hrm.onreading = () => {
  heartRateText.text = hrm.heartRate
  caloriesBurnedText.text = today.adjusted.calories
  stepsText.text = today.adjusted.steps
}

hrm.start()

const batteryImage = document.getElementById("batteryIcon")
const batteryText = document.getElementById("battery")

batteryImage.href = util.batteryIcon(battery.chargeLevel, battery.charging)
batteryText.text = `${Math.floor(battery.chargeLevel)}%`
battery.onchange = (charger, event) => {
  batteryImage.href = util.batteryIcon(battery.chargeLevel, battery.charging)
  batteryText.text = `${Math.floor(battery.chargeLevel)}%`
}