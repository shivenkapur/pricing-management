import { getCosting } from '../../helper/shift';
import { ClientPricingChart } from '../../data/PricingChart';

export default class ClientBooking {
    jobData; invoiceData; zoho;
    shiftsCost = []; zohoInvoiceItems = [];
    services = {};
    constructor(jobData, zoho){
        this.jobData = jobData;
        this.zoho = zoho;
    }

    createZohoInvoice(){
        this.generateJobDetails();
        this.zoho.generateZohoInvoiceItems(this.shiftsCost);
        this.zoho.createInvoice();
    }

    generateJobDetails(){
        let costingObject;

        this.jobData["ranges"].forEach(dateRange => {
            costingObject = getCosting(dateRange, this.jobData["cgRank"], ClientPricingChart);

            const jobCost = costingObject.rangesCostingDistribution();
            this.shiftsCost = [...this.shiftsCost, ...jobCost];
        });
    }

}
  
/*{
    "customer_id": "469760000000937001",
    "date": "2021-01-01",
    "invoice_number": "INV",
    "line_items": [{
      "description": "Obla",
      "name": "di",
      "rate": 1,
      "quantity": 5
    }],
}*/