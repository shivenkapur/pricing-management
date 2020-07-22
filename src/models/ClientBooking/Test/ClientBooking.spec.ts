import JobData from './DummyData';
import ClientBooking from '../ClientBooking';
import Zoho from '../../Zoho/Zoho';
const util = require('util')

describe('Create Zoho Invoice', async function() {
    JobData.forEach(job => {
        const jobData = {
            "client": job.ClientData,
            "ranges": job.Ranges,
            "cgRank": job.CGRank
        };

        it('Create doodle for Client ' + job.ClientData["Client Number"] + ' Test Case: ' + job.TestName, async function() {
            
            const zoho = new Zoho();
            const clientBooking = new ClientBooking(jobData, zoho);
        });
    }); 
});