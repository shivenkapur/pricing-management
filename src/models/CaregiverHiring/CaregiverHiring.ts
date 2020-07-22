
import { MessageGenerator } from '../MessageGenerator/MessageGenerator';
import Doodle from '../Doodle/Doodle';
import { getCosting } from '../../helper/shift';
import { CaregiverPricingChart } from '../../data/PricingChart';

export default class CaregiverHiring {
    jobData; 
    messageGenerator; shiftsCost = []; doodle: Doodle; shiftDates = [];

    constructor(jobData, doodle){
        this.jobData = jobData;
        this.doodle = doodle;
    }
    
    async createDoodleAndMessages(){

        this.generateJobDetails();
        this.messageGenerator = new MessageGenerator(this.jobData["client"], this.jobData["cgRank"], this.shiftsCost);

        await this.doodle.handleDoodlePollCreation(this.messageGenerator, this.shiftDates);
        return this.getCaregiverMessages();
    }

    generateJobDetails(){
        let costingObject;

        this.jobData["ranges"].forEach(dateRange => {
            costingObject = getCosting(dateRange, this.jobData["cgRank"], CaregiverPricingChart);

            const jobCost = costingObject.rangesCostingDistribution();
            const shiftDatesForRange = costingObject.getShiftDates();

            this.shiftDates = [...this.shiftDates, ...shiftDatesForRange];
            this.shiftsCost = [...this.shiftsCost, ...jobCost];
        });
    }

    getCaregiverMessages(){
        const doodleData = this.doodle.getDoodleData();
        const broadcastMessage = this.messageGenerator.getBroadcastMessage(doodleData["Description"], doodleData["ID"])
        const cgMessage = this.messageGenerator.getCGMessage(doodleData["Title"])
        
        return {
            "Broadcast Message": broadcastMessage,
            "CG Message": cgMessage
        };
    }
}



