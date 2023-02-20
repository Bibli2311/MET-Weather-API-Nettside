const dangerLevelValues = ["gult", "oransje", "rødt"]

const eventValues = [
    "blowingSnow",
    "forestFire",
    "gale",
    "ice",
    "icing",
    "polarLow",
    "rain",
    "rainFlood",
    "snow",
    "stormSurge",
    "wind",
    "lightning"
  ]

const eventTypeURL = "https://api.met.no/weatherapi/metalerts/1.1/precipitation&event="

export {dangerLevelValues, eventValues, eventTypeURL}