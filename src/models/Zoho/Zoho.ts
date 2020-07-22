import { utcToHongKongDate, numberToMonth } from '../../helper/date-time';
import { handleAPICall } from '../../services/zoho';

export default class Zoho {
    services = {}; zohoInvoiceItems = [];

    createInvoice(){
        const body = {};
        handleAPICall('invoice', body);
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