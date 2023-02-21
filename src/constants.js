const dangerLevelValues = ["gult", "oransje", "rødt"]



const eventValues = [
    "snøflokk",
    "skogbrann",
    "kuling",
    "is",
    "ising",
    "polart lavtrykk",
    "regn",
    "regnflod",
    "snø",
    "stormflo",
    "vind",
    "torden"
  ]

  /*

  blowingSnow = snøflokk
  forestFire = skogbrann
  gale = kuling
  ice = is
  icing = ising
  polarLow = polart lavtrykk
  rain = regn
  rainFlood = regnflod
  snow = snø
  stormSurge =  stormflo
  wind = vind
  lightning = torden
  */

const eventTypeURL = "https://api.met.no/weatherapi/metalerts/1.1/precipitation&event="

export {dangerLevelValues, eventValues, eventTypeURL}