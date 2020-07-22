import { utcToHongKongDate, numberToMonth } from './date-time';

export function createServicesFromShifts(shiftCost, services){
    addService( 
        shiftCost['Service Name'], 
        shiftCost['General Charges'], 
        shiftCost['Shift Range']['Start Date'],
        services
    );

    if(shiftCost['Night Shift Charges']){
        addService( 
            shiftCost['Service Name'] + ' Night Shift Charges', 
            shiftCost['Night Shift Charges'], 
            shiftCost['Shift Range']['Start Date'],
            services
        );
    } 

    if(shiftCost['Holiday Charges']){
        addService( 
            shiftCost['Service Name'] + ' Holiday Charges', 
            shiftCost['Holiday Charges'], 
            shiftCost['Shift Range']['Start Date'],
            services
        );
    }

    return services;
}

function addService(serviceName, charge, startDate, services){
    const hongKongStartDate = utcToHongKongDate(startDate);

    //initialize
    initializeService(serviceName, charge, services);
    
    services[serviceName].quantity += 1;

    const month = hongKongStartDate.getUTCMonth();
    const dateString = services[serviceName].dates[month];

    services[serviceName].dates[month] = 
        dateString ? dateString : numberToMonth[month] + ' ';
    services[serviceName].dates[month] += hongKongStartDate.getUTCDate() + ',';
}

function initializeService(serviceName, charge, services){
    if(!services[serviceName]){
        const dates = {};

        services[serviceName] = {
            cost: charge,
            quantity: 0,
            dates: dates 
        }
    } 
}