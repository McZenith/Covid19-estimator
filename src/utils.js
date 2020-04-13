const trimValue = (num) => Math.trunc(num);

function calcDollarsInFlight(infections, avgDailyIncomePopulation, avgDailyIncomeInUSD, days) {
  return (infections * avgDailyIncomePopulation * avgDailyIncomeInUSD) / days;
}

function calinfectionsByRequestedTime(currentlyInfected, factor) {
  return currentlyInfected * 2 ** factor;
}
export { trimValue, calcDollarsInFlight, calinfectionsByRequestedTime };
