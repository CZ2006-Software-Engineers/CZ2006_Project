const dict = {
  "ANG MO KIO": 221.00733276174975,
  BEDOK: 178.950997831084,
  BISHAN: 360.47986570014245,
  "BUKIT BATOK": 106.33516761048588,
  "BUKIT MERAH": 518.2836437479148,
  "BUKIT PANJANG": -51.20959931367491,
  "BUKIT TIMAH": 372.607556904717,
  CENTRAL: 644.3174370063756,
  "CHOA CHU KANG": -64.50867786231616,
  CLEMENTI: 391.3284499331841,
  GEYLANG: 269.53644513985796,
  HOUGANG: 64.64565301270322,
  "JURONG EAST": 202.18910606007327,
  "JURONG WEST": 122.94763754007357,
  "KALLANG/WHAMPOA": 398.81871643533276,
  "MARINE PARADE": 302.29241242425417,
  "PASIR RIS": 49.127435564917036,
  QUEENSTOWN: 475.01403326204513,
  SEMBAWANG: -84.94841640866963,
  SENGKANG: -6.57484678881093,
  SERANGOON: 248.2590896392583,
  TAMPINES: 172.14636369812857,
  "TOA PAYOH": 310.88332138087395,
  WOODLANDS: -60.14787480816099,
  YISHUN: 30.016623608146304,
  2: 480.25322250420277,
  3: 886.5222197653277,
  4: 1309.5644228289436,
  5: 1455.8284846207048,
  EXECUTIVE: 1561.2790059563783,
};

const b = 733.84482383;

export function getRecommendation(location, room) {
  return Math.round(
    b +
      (location.toUpperCase in dict ? dict[location.toUpperCase()] : 0) +
      (room in dict ? dict[room] : 0)
  );
}
