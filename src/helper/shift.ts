import { timeOverlap, utcToHongKongDate } from './date-time';
import { ContinuousRangeCosting, RecurringRangeCosting } from '../models/Costing/Costing';

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

export function dayOrNightShift(startDate, endDate){
  const hongKongStartDate = utcToHongKongDate(startDate);
  const hongKongEndDate = utcToHongKongDate(endDate);

  const midnight = new Date(new Date(hongKongEndDate.getTime()).setUTCHours(0,0,0,0)), 
  sixam = new Date(new Date(hongKongEndDate.getTime()).setUTCHours(6,0,0,0));
  
  if(!validShift(hongKongStartDate, hongKongEndDate))
    return "invalid";
  else if( timeOverlap(hongKongStartDate, hongKongEndDate, midnight, sixam) )
    return "night";
  else
    return "day"
}

export function validShift(startTime, endTime){
  if(startTime >= endTime)
    return false

  return true
}

export function getCosting(dateRange, cgRank, pricingChart): (ContinuousRangeCosting | RecurringRangeCosting){
        
  const type = dateRange['24 Hours']?'24 Hours':'Recurring';
  let costingObject;

  switch(type){
      case '24 Hours': 
          costingObject = new ContinuousRangeCosting(dateRange, cgRank, pricingChart, 12);
          break;
      case 'Recurring': 
          costingObject = new RecurringRangeCosting(dateRange, cgRank, pricingChart);
          break;
  }
  return costingObject;
}
