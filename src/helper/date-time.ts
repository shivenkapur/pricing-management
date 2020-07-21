export function hongKongtoUTCTimestamp(time){
    const date = new Date(time);
    return date.setHours(date.getHours() - 8);
}

export function hongKongtoUTCDate(date){
    return new Date(date.setHours(date.getHours() - 8));
}

export function utcToHongKongDate(date){
    return new Date(date.setHours(date.getHours() + 8));
}

export function timeOverlap(startTime1, endTime1, startTime2, endTime2){
    if( (startTime1 > startTime2 && startTime1 < endTime2) ||
        (endTime1 > startTime2 && endTime1 < endTime2) || 
        (startTime1 <= startTime2 && endTime1 >= endTime2) )
        return true
    else 
      return false
}

export const months = {"January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, 
    "July": 6, "August": 7, "September": 8, 
    "October": 9, "November": 10, "December": 11};

export const numberToMonth = Object.keys(months);

export function getDoodleDates(dateRanges){
    
    const newDateRanges = dateRanges.map(dateRange => {
        return {
            "start": hongKongtoUTCTimestamp(dateRange["Start Date"]),
            "end": hongKongtoUTCTimestamp(dateRange["End Date"]),
        };
    })

    return newDateRanges;
}

export function getDateString(dateRanges){
    let dateString = '';

    dateRanges.forEach(dateRange => {
        const hongKongStartDate = utcToHongKongDate(new Date(dateRange["Start Date"]));
        const hongKongEndDate = utcToHongKongDate(new Date(dateRange["End Date"]));
        
        dateString += numberToMonth[hongKongStartDate.getMonth()] + " " + hongKongStartDate.getDate() + " - " + numberToMonth[hongKongEndDate.getMonth()] + " " + hongKongEndDate.getDate() + ', ';
    })

    return dateString;
    
}

export function getTimeString(date){
    const hours = date.getHours().toString().length == 1 ? '0' + date.getHours(): date.getHours();
    const minutes = date.getMinutes().toString().length == 1 ? '0' + date.getMinutes(): date.getMinutes();
    return hours + ':' + minutes;
}

export function splitDates(dates){

    const doodleDates = [];
    for(const dateIndex in dates){
        const date = dates[dateIndex];
        let startDate = date["start"];

        while(startDate < date["end"]){
            const endDate = Math.min(parseInt(startDate) + 12*60*60*1000, date["end"]);

            doodleDates.push(
                {
                    "start": startDate,
                    "end": endDate
                }
            )
            startDate = endDate;
        }
    } 
    return doodleDates;
}