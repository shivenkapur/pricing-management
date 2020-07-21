import { ContinuousRangeCosting, RecurringRangeCosting } from '../models/Costing';
import { CaregiverPricingChart } from '../models/PricingChart';

export class CaregiverPricing {
    ranges; cgRank;
    constructor(ranges, cgRank){
        this.ranges = ranges;
        this.cgRank = cgRank;
    }
    
    getJobDetails(){
        const jobsCost = [];
    
        let costing;
        this.ranges.forEach(dateRange => {
            costing = this.getCosting(dateRange);
            const jobCost = costing.rangesCostingDistribution();
            jobsCost.push(jobCost);
        });
    
        return {
            "cost": jobsCost,
            "dateRanges": costing.getDateRanges()
        };
    }
    
    getCosting(dateRange): (ContinuousRangeCosting | RecurringRangeCosting){
        let costing: (ContinuousRangeCosting | RecurringRangeCosting);
        
        const type = dateRange['24 Hours']?'24 Hours':'Recurring';
        console.log("TYPE: ", type);
        switch(type){
            case '24 Hours': 
                costing = new ContinuousRangeCosting(dateRange, this.cgRank, CaregiverPricingChart, 12);
                break;
            case 'Recurring': 
                costing = new RecurringRangeCosting(dateRange, this.cgRank, CaregiverPricingChart);
                break;
        }
        return costing;
    }
}

