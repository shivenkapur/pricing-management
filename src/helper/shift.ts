import { hongKongtoUTCTimestamp, timeOverlap } from './date-time';

export function shiftCost(hours, pricing, caregiverRank){
    let jobCost = 0;
    const caregiverPricing = pricing[caregiverRank];

    for(let hour = 1; hour <= hours; hour++){

      if(caregiverPricing[hour] != undefined){
        jobCost += pricing[caregiverRank][hour];
      }
      else {
        const leftOverHours = hours - hour + 1;
        jobCost += caregiverPricing["+"] * leftOverHours;

        break;
      }

    }
    return jobCost;
}

export function dayOrNightShift(startTime, endTime){
  const midnightTimestamp = new Date(endTime.getTime()).setHours(0,0,0,0), 
    sixamTimestamp = new Date(endTime.getTime()).setHours(6,0,0,0);

  const midnight = new Date(hongKongtoUTCTimestamp(midnightTimestamp));
  const sixam = new Date(hongKongtoUTCTimestamp(sixamTimestamp));
 
  if(!validShift(startTime, endTime))
    return "invalid";
  else if( timeOverlap(startTime, endTime, midnight, sixam) )
    return "night";
  else
    return "day"
}

export function validShift(startTime, endTime){
  if(startTime >= endTime)
    return false

  return true
}