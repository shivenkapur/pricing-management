import { createDoodle } from '../../services/doodle';
import { utcToHongKongDate, numberToMonth } from '../../helper/date-time';

export default class Doodle {
    jobData; doodleData;
    constructor(jobData){
        this.jobData = jobData;
    }

    async handleDoodlePollCreation(messageGenerator, shiftDates){
    
        const doodleMessage = await messageGenerator.createDoodleMessage();
        const doodleDates = this.getDoodleDates(shiftDates);
        const doodleTitle = 'Case ' + this.jobData["client"]["Client Number"] + '_' + this.getDateString();
    
        const doodleData = {
            'Title': doodleTitle,
            'Description': doodleMessage,
            'Dates': doodleDates
        };
        
        this.doodleData = doodleData;
        const doodleResponse = await this.createDoodlePoll();
        
        this.doodleData['ID'] = doodleResponse.id;
    }

    async createDoodlePoll(){
        const doodleResponse = await createDoodle(this.doodleData);
        return doodleResponse;
    }

    getDoodleDates(shiftDates){
    
        const newShiftDates = shiftDates.map(shiftDate => {
            return {
                "start": shiftDate["Start Date"],
                "end": shiftDate["End Date"],
            };
        })
    
        return newShiftDates;
    }
    
    getDateString(){
        let dateString = '';
    
        this.jobData["ranges"].forEach(range => {
            const hongKongStartDate = utcToHongKongDate(new Date(range["Start Date"]));
            const hongKongEndDate = utcToHongKongDate(new Date(range["End Date"]));
            
            dateString += numberToMonth[hongKongStartDate.getUTCMonth()] + " " + hongKongStartDate.getUTCDate() + " - " + numberToMonth[hongKongEndDate.getUTCMonth()] + " " + hongKongEndDate.getUTCDate() + ', ';
        })
    
        return dateString;
        
    }

    getDoodleData(){
        return this.doodleData;
    }
}