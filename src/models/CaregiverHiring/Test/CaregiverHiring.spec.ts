import JobData from './DummyData';
import Doodle from '../../Doodle/Doodle';
import CaregiverHiring from '../CaregiverHiring';

const expect = require('chai').expect;
const sinon = require("sinon");

describe('Create Doodles and Generate Messages', async function() {

    sinon.stub(Doodle.prototype, "createDoodlePoll").returns({
        id: 'Test ID'
    });
    
    JobData.forEach(job => {
        const jobData = {
            "client": job.ClientData,
            "ranges": job.Ranges,
            "cgRank": job.CGRank
        };

        it('Create doodle for Client ' + job.ClientData["Client Number"] + ' Test Case: ' + job.TestName, async function() {
            const doodle = new Doodle(jobData);

            const caregiverHiring = new CaregiverHiring(jobData, doodle);
            const messages = await caregiverHiring.createDoodleAndMessages();
            
            expect(caregiverHiring.shiftsCost).to.eql(job.Validation);
        });
    }); 
});