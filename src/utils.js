const trimValue = (num) => Math.trunc(num);

function calcDollarsInFlight(infections, avgDaily, days) {
  return (infections * avgDaily * avgDaily) / days;
}

function calinfectionsByRequestedTime(currentlyInfected, factor) {
  return currentlyInfected * 2 ** factor;
}
export { trimValue, calcDollarsInFlight, calinfectionsByRequestedTime };
