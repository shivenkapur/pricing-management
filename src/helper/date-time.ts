export function hongKongtoUTCTimestamp(time){
    const date = new Date(time);
    return date.setUTCHours(date.getUTCHours() - 8);
}

export function hongKongtoUTCDate(date){
    const tempDate = new Date(date.getTime());
    return new Date(tempDate.setUTCHours(tempDate.getUTCHours() - 8));
}

export function utcToHongKongDate(date){
    const tempDate = new Date(date.getTime());
    return new Date(tempDate.setUTCHours(tempDate.getUTCHours() + 8));
}

export function timeOverlap(startTime1, endTime1, startTime2, endTime2){
    if( (startTime1.getTime() > startTime2.getTime() && startTime1.getTime() < endTime2.getTime()) ||
        (endTime1.getTime() > startTime2.getTime() && endTime1.getTime() < endTime2.getTime()) || 
        (startTime1.getTime() <= startTime2.getTime() && endTime1.getTime() >= endTime2.getTime()) )
        return true
    else 
      return false
}

export const months = {"January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, 
    "July": 6, "August": 7, "September": 8, 
    "October": 9, "November": 10, "December": 11};

export const numberToMonth = Object.keys(months);

export function getTimeString(date){
    const hours = date.getUTCHours().toString().length == 1 ? '0' + date.getUTCHours(): date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().length == 1 ? '0' + date.getUTCMinutes(): date.getUTCMinutes();
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