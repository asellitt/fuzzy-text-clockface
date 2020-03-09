const monthWords = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dayWords = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const hourWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
]

const minutesWords = [
  "five",
  "ten",
  "quarter",
  "twenty",
  "twenty five",
  "half",
]

export function minutesToWord(minutes) {
  const index = parseInt(((minutes+2) / 5), 10) - 1
  if(minutes <= 2 || minutes >= 58) return null
  if(minutes <= 30) return minutesWords[index]
  return minutesWords[(index - (index - minutesWords.length + 1) * 2)]
}

export function hourToWord(hours, minutes) {
  const hour = hours % 12 || 12
  if(minutes > 30) return hourWords[hour % hourWords.length]
  return hourWords[hour - 1 % hourWords.length]
}

export function joinWord(minutes) {
  if(minutes <= 2 || minutes >= 58) return null
  if(minutes > 32) return "to"
  return "past"
}

export function endWord(minutes) {
  if(minutes <= 2 || minutes >= 58) return "o'clock"
  return null
}

export function dateString() {
  const now = new Date()
  return `${dayWords[now.getDay()]}, ${monthWords[now.getMonth()]} ${now.getDate()}`
}

export function batteryIcon(chargeLevel, charging) {
  if(charging) return "battery_charging.png"
  return `battery_${Math.floor((chargeLevel+3)/25)*25}.png`
}