import JobData from './DummyData';
import ClientBooking from '../ClientBooking';
import Zoho from '../../Zoho/Zoho';
const util = require('util')

const expect = require('chai').expect;
const sinon = require("sinon");

describe('Create Zoho Invoice', async function() {

    sinon.stub(Zoho.prototype, "handleInvoiceCreation").returns({
        id: 'Test ID'
    });

    JobData.forEach((job, index) => {
        const jobData = {
            "client": job.ClientData,
            "ranges": job.Ranges,
            "cgRank": job.CGRank
        };

        it('Create doodle for Client ' + job.ClientData["Client Number"] + ' Test Case: ' + job.TestName, async function() {
            const zoho = new Zoho(jobData);
            const clientBooking = new ClientBooking(jobData, zoho);
            await clientBooking.createZohoInvoice();
            
            expect(clientBooking.shiftsCost).to.eql(job.Validation);
        });
    }); 
});