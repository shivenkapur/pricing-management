import { getContactByID } from '../services/hubspot';

import { RangeCosting, ContinuousRangeCosting, RecurringRangeCosting } from '../models/Costing';
import { CaregiverPricingChart } from '../models/PricingChart';

import { MessageGenerator } from '../models/MessageGenerator';
import { getDoodleDates, getDateString } from '../helper/date-time';

import { createDoodle } from '../services/doodle';

export default async function calculateCaregiverPrice(req, res) {
    const { clientNumber, ranges, cgRank } = req.body;
    if(clientNumber){
        const contact = await getContactByID(clientNumber);
        const jobDetails = await getJobDetails(ranges, cgRank);
        const jobsCost = jobDetails["cost"];

        const messageGenerator = new MessageGenerator(contact, cgRank, jobsCost);
        const messages = await handleDoodlePollCreation(messageGenerator, jobDetails["dateRanges"], ranges, clientNumber);

        res.json(messages);
    } else {
        res.sendStatus(400);
    }
}

async function getJobDetails(ranges, cgRank){
    const jobsCost = [];

    let costing;
    ranges.forEach(dateRange => {
        costing = getCosting(dateRange, cgRank);
        const jobCost = costing.rangesCostingDistribution();
        jobsCost.push(jobCost);
    })

    return {
        "cost": jobsCost,
        "dateRanges": costing.getDateRanges()
    };
}

function getCosting(dateRange, cgRank): (ContinuousRangeCosting | RecurringRangeCosting){
    let costing: (ContinuousRangeCosting | RecurringRangeCosting);
    
    const type = dateRange['24 Hours']?'24 Hours':'Recurring';
    console.log("TYPE: ", type);
    switch(type){
        case '24 Hours': 
            costing = new ContinuousRangeCosting(dateRange, cgRank, CaregiverPricingChart, 12);
            break;
        case 'Recurring': 
            costing = new RecurringRangeCosting(dateRange, cgRank, CaregiverPricingChart);
            break;
    }
    return costing;
}

async function handleDoodlePollCreation(messageGenerator, dates, ranges, clientNumber){
    
    const doodleMessage = messageGenerator.createDoodleMessage();
    const doodleDates = getDoodleDates(dates);
    const doodleTitle = 'Case ' + clientNumber + '_' + getDateString(ranges);

    const doodleData = {
        'Title': doodleTitle,
        'Description': doodleMessage,
        'Dates': doodleDates
    };

    const data = await createDoodle(doodleData)
    console.log("Doodle Dates: ", doodleDates)
    
    const broadcastMessage = messageGenerator.getBroadcastMessage(doodleMessage, data.id)
    const cgMessage = messageGenerator.getCGMessage(doodleTitle)
    
    return {
        "Broadcast Message": broadcastMessage,
        "CG Message": cgMessage
    };
}