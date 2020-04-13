import {
  trimValue,
  calcDollarsInFlight,
  calinfectionsByRequestedTime
} from './utils';

const covid19ImpactEstimator = (data) => {
  const time = data.timeToElapse;
  const availableBeds = data.totalHospitalBeds * (35 / 100);
  let factor;
  let days;
  const impact = {};
  const severeImpact = {};
  if (data.periodType === 'days') {
    days = time;
    factor = trimValue(time / 3);
  } else if (data.periodType === 'weeks') {
    days = 7 * time;
    factor = trimValue((7 * time) / 3);
  } else if (data.periodType === 'months') {
    days = 30 * time;
    factor = (30 * time) / 3;
  }
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  severeImpact.infectionsByRequestedTime = calinfectionsByRequestedTime(
    severeImpact.currentlyInfected,
    factor
  );
  impact.severeCasesByRequestedTime = trimValue(
    (15 / 100) * impact.infectionsByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = trimValue(
    (15 / 100) * severeImpact.infectionsByRequestedTime
  );
  impact.hospitalBedsByRequestedTime = trimValue(
    availableBeds - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = trimValue(
    availableBeds - severeImpact.severeCasesByRequestedTime
  );
  impact.casesForICUByRequestedTime = trimValue(
    (5 / 100) * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = trimValue(
    (5 / 100) * severeImpact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = trimValue(
    (2 / 100) * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = trimValue(
    (2 / 100) * severeImpact.infectionsByRequestedTime
  );
  impact.dollarsInFlight = trimValue(
    calcDollarsInFlight(
      impact.infectionsByRequestedTime,
      data.region.avgDailyIncomePopulation,
      data.region.avgDailyIncomeInUSD,
      days
    )
  );
  severeImpact.dollarsInFlight = trimValue(
    calcDollarsInFlight(
      severeImpact.infectionsByRequestedTime,
      data.region.avgDailyIncomePopulation,
      data.region.avgDailyIncomeInUSD,
      days
    )
  );

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
