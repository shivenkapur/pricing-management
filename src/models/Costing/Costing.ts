import { shiftCost, dayOrNightShift } from '../../helper/shift';
import { timeOverlap } from '../../helper/date-time';
import { holidays, getHolidayDate } from '../../data/Holidays';
export class RangeCosting {
    
    ONE_HOUR: number = 60*60*1000;
    dateRange; caregiverRank: string; pricing;
    firstShiftEndTime: Date; lastShiftStartTime: Date;

    constructor(dateRange, caregiverRank, pricing) {
        this.dateRange = { "Start Date": new Date(dateRange["Start Date"]), "End Date": new Date(dateRange["End Date"]) };
        this.caregiverRank = caregiverRank;
        this.pricing = pricing;
    }

    generalCharges(dateRange){
        const hours = this.getHours(dateRange);
        let jobCost = shiftCost(hours, this.pricing, this.caregiverRank);
        return jobCost;
    }

    nightShiftCharge(dateRange){
        return dayOrNightShift(dateRange["Start Date"], dateRange["End Date"]) == "night"
            ? this.pricing[this.caregiverRank]["Night Shift"] : 0;
    }

    holidayCharge(dateRange)
    {
        const hours = this.getHours(dateRange);
        let holidayCost = 0;
        holidays.forEach(
            holiday => {
                const holidayDate = getHolidayDate(holiday);
                if( timeOverlap(dateRange["Start Date"], dateRange["End Date"], holidayDate["Start Date"], holidayDate["End Date"]) )
                {
                    holidayCost += shiftCost(hours, this.pricing, this.caregiverRank);
                }
            }
        );
        return holidayCost;
    }

    costingDistribution(dateRange){
                
        const generalCharge = this.generalCharges(dateRange);
        const nightShiftCharge = this.nightShiftCharge(dateRange);
        const holidayCharge = this.holidayCharge(dateRange);

        return {
            "General Charges": generalCharge,
            "Night Shift Charges": nightShiftCharge,
            "Holiday Charges": holidayCharge,
            "Total Charge": generalCharge + nightShiftCharge + holidayCharge,
            "Shift Range": dateRange,
            "Service Name": this.getHours(dateRange) + " hour(s) " + this.caregiverRank + " service" 
        }
    }

    getHours(dateRange){
        const hours = ( dateRange["End Date"].getTime() - dateRange["Start Date"].getTime() ) / this.ONE_HOUR;
        return hours;
    }
}

export class ContinuousRangeCosting extends RangeCosting{
    maxShiftHours: number;
    shiftDates = [];
    constructor(dateRange, caregiverRank, pricing, maxShiftHours) {
        super(dateRange, caregiverRank, pricing);
        this.maxShiftHours = maxShiftHours;
        this.setShiftDates();
    }

    setShiftDates() {
        let startDate: Date = this.dateRange["Start Date"];
        while( startDate < this.dateRange["End Date"]){
            const endDate = Math.min(startDate.getTime() + this.maxShiftHours * this.ONE_HOUR, this.dateRange["End Date"].getTime());
            this.shiftDates.push({
                "Start Date": new Date(startDate),
                "End Date": new Date(endDate)
            });
            
            startDate = new Date(endDate);
        }
    }

    getShiftDates(){
        return this.shiftDates;
    }

    rangesCostingDistribution(){
        const costingDistribution = [];
        this.shiftDates.forEach(
            dateRange => {
                costingDistribution.push(this.costingDistribution(dateRange));
            }
        );

        return costingDistribution;
    }
}

export class RecurringRangeCosting extends RangeCosting{
    shiftDates = [];
    constructor(dateRange, caregiverRank, pricing) {
        super(dateRange, caregiverRank, pricing);
        this.setShiftDates();
    }

    setShiftDates() {
        const rangeStartDate: Date = this.dateRange["Start Date"];
        const rangeEndDate: Date = this.dateRange["End Date"];

        const startTime = {
            hours: rangeStartDate.getUTCHours(),
            minutes: rangeStartDate.getUTCMinutes()
        } , endTime = {
            hours: rangeEndDate.getUTCHours(),
            minutes: rangeEndDate.getUTCMinutes()
        };

        let startDate = rangeStartDate;
        let endDate = rangeStartDate;

        while(endDate < rangeEndDate){
            endDate = new Date(startDate.getTime());
            endDate.setUTCHours(endTime.hours, endTime.minutes, 0);

            if(endDate.getTime() <= startDate.getTime())
                endDate.setTime(endDate.getTime() + 24 * this.ONE_HOUR);

            this.shiftDates.push({
                "Start Date": startDate,
                "End Date": endDate
            });
            
            startDate = new Date(startDate.getTime() + 24 * this.ONE_HOUR);
        }
    }

    getShiftDates(){
        return this.shiftDates;
    }

    rangesCostingDistribution(){
        const costingDistribution = [];
        this.shiftDates.forEach(
            dateRange => {
                costingDistribution.push(this.costingDistribution(dateRange));
            }
        );   
        return costingDistribution;
    } 
}