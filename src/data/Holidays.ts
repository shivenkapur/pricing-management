import { hongKongtoUTCDate, months } from '../helper/date-time';

export const holidays =  [  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 1,
        hour: 0,
        minutes: 0,
        seconds: 0,
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 1,
        hour: 23,
        minutes: 59,
        seconds: 59,
    },
    "Name": "New Year's Day"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 24,
        hour: 17,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 24,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "Lunar New Year's Day I"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 25,
        hour: 0,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 25,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "Lunar New Year's Day II"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 26,
        hour: 0,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 26,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "Lunar New Year's Day III"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 27,
        hour: 0,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "January",
        date: 27,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "Lunar New Year's Day IV"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "October",
        date: 1,
        hour: 17,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "October",
        date: 1,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "National Day"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 21,
        hour: 17,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 21,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": ""
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 25,
        hour: 0,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 25,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "Christmas Day"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 26,
        hour: 0,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 26,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "Boxing Day"
  },
  {
    "Start Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 31,
        hour: 17,
        minutes: 0,
        seconds: 0
    },
    "End Date": {
        year: new Date().getFullYear(),
        month: "December",
        date: 31,
        hour: 23,
        minutes: 59,
        seconds: 59
    },
    "Name": "New Year's Eve"
  }
]

export function getHolidayDate(date){
    return {
        "Start Date": getHongKongDate(date["Start Date"]),
        "End Date": getHongKongDate(date["End Date"])
    }
}

function getHongKongDate(holidayDate){
    return hongKongtoUTCDate(
        new Date(Date.UTC(
            holidayDate.year, 
            months[holidayDate.month], 
            holidayDate.date, 
            holidayDate.hour, 
            holidayDate.minutes, 
            holidayDate.seconds
        ))
    );
}