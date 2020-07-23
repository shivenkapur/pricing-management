import { utcToHongKongDate, numberToMonth } from '../../helper/date-time';
import { handleAPICall } from '../../services/zoho';
import { setZohoContact, getZohoContact } from '../../services/dynamoDB';

export default class Zoho {
    services = {}; zohoInvoiceItems = [];
    jobData; 

    constructor(jobData){
        this.jobData = jobData;
    }
    
    async handleInvoiceCreation(shiftsCost){
        this.generateZohoInvoiceItems(shiftsCost);
        
        let zohoContact = await getZohoContact(this.jobData["client"]["Client Number"].toString());
        let zohoCustomerId = await this.getZohoCustomerId(zohoContact);
        
        const response = await this.createInvoice(zohoCustomerId);
        
        
        if(response.message == 'Statement of Accounts does not exist.'){
            zohoCustomerId = await this.getZohoCustomerId(false);
            await this.createInvoice(zohoCustomerId);
        }   
    }

    async createInvoice(zohoCustomerId){
        const data = {
            "customer_id": zohoCustomerId,
            "date": new Date().toISOString().split('T')[0],
            "invoice_number": "C" + this.jobData["client"]["Client Number"] + "_" + this.jobData["client"]["Patient's Name"] +
                "_" + new Date().toISOString().split('T')[0].replace(/-/g,''),
            "line_items": this.zohoInvoiceItems,
        }
    
        let response = await handleAPICall('invoice', data);
        return response;
    }

    async getZohoCustomerId(zohoContact) {
        let zohoCustomerId;
        if(!zohoContact){
            const contactCreated = await handleAPICall('contact', {
                "contact_name": this.jobData["client"]["Client Number"]  + ' ' + this.jobData["client"]["Patient's Name"]
            });
            zohoCustomerId = contactCreated["contact"]["contact_id"];

            let res = await setZohoContact(this.jobData["client"]["Client Number"].toString(), zohoCustomerId);
            
        } else{
            zohoCustomerId = zohoContact.zohoCustomerId;
        }

        return zohoCustomerId;
    }
   
    generateZohoInvoiceItems(shiftsCost){
        shiftsCost.forEach(
            shiftCost => {
                this.createServicesFromShifts(shiftCost);
            }
        )
        for (const [key, value] of Object.entries(this.services)) {

            let dates = '';
            for (const [dateKey, dateValue] of Object.entries(value["dates"])) {
                dates += dateValue;
                dates = dates.substring(-1) + ' ';
            }

            this.zohoInvoiceItems.push({
                "description": dates,
                "name": key,
                "rate": value["cost"],
                "quantity": value["quantity"]
            });
        }
    }

    createServicesFromShifts(shiftCost){
        this.addService( 
            shiftCost['Service Name'], 
            shiftCost['General Charges'], 
            shiftCost['Shift Range']['Start Date']
        );

        if(shiftCost['Night Shift Charges']){
            this.addService( 
                shiftCost['Service Name'] + ' Night Shift Charges', 
                shiftCost['Night Shift Charges'], 
                shiftCost['Shift Range']['Start Date']
            );
        } 

        if(shiftCost['Holiday Charges']){
            this.addService( 
                shiftCost['Service Name'] + ' Holiday Charges', 
                shiftCost['Holiday Charges'], 
                shiftCost['Shift Range']['Start Date']
            );
        }
    }

    addService(serviceName, charge, startDate){
        const hongKongStartDate = utcToHongKongDate(startDate);

        //initialize
        this.initializeService(serviceName, charge, this.services);
        
        this.services[serviceName].quantity += 1;

        const month = hongKongStartDate.getUTCMonth();
        const dateString = this.services[serviceName].dates[month];

        this.services[serviceName].dates[month] = 
            dateString ? dateString : numberToMonth[month] + ' ';
        this.services[serviceName].dates[month] += hongKongStartDate.getUTCDate() + ',';
    }

    initializeService(serviceName, charge, services){
        if(!services[serviceName]){
            const dates = {};

            services[serviceName] = {
                cost: charge,
                quantity: 0,
                dates: dates 
            }
        } 
    }
}