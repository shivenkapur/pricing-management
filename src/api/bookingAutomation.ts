import { getContactByID } from '../services/hubspot';
import CaregiverHiring from '../models/CaregiverHiring/CaregiverHiring';
import Doodle from '../models/Doodle/Doodle';

export default async function bookingAutomation(req, res) {
    const { clientNumber, ranges, cgRank } = req.body;

    if(clientNumber){
        
        const client = await getContactByID(clientNumber);
        client["Client Number"] = clientNumber;

        const jobData = {
            "client": client,
            "ranges": ranges,
            "cgRank": cgRank
        };

        const messages = await handleCaregiverHiring(jobData); 
        res.json(messages);

        handleClientBooking(jobData);
    } else {
        res.sendStatus(400);
    }
}

async function handleCaregiverHiring(jobData){
    const doodle = new Doodle(jobData);

    const caregiverHiring = new CaregiverHiring(jobData, doodle);
    const messages = await caregiverHiring.createDoodleAndMessages();

    return messages;
}

async function handleClientBooking(jobData){

}

