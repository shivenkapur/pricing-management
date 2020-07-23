export default [
    {
        Ranges: [
            {
                "Start Date": 1577577600000, //December 29, 2019 8:00:00 AM GMT+08:00
                "End Date": 1578052800000, //January 3, 2020 8:00:00 PM GMT+08:00
                "24 Hours": false
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
                'General Charges': 2200,
                'Night Shift Charges': 0,
                'Holiday Charges': 0,
                'Total Charge': 2200,
                'Shift Range': {
                    'Start Date': new Date('2019-12-29T00:00:00.000Z'),
                    'End Date': new Date('2019-12-29T12:00:00.000Z')
                },
                'Service Name': '12 hour(s) RN service'
            },
            {
                'General Charges': 2200,
                'Night Shift Charges': 0,
                'Holiday Charges': 0,
                'Total Charge': 2200,
                'Shift Range': {
                    'Start Date': new Date('2019-12-30T00:00:00.000Z'),
                    'End Date': new Date('2019-12-30T12:00:00.000Z')
                },
                'Service Name': '12 hour(s) RN service'
            },
            {
                'General Charges': 2200,
                'Night Shift Charges': 0,
                'Holiday Charges': 0,
                'Total Charge': 2200,
                'Shift Range': {
                    'Start Date': new Date('2019-12-31T00:00:00.000Z'),
                    'End Date': new Date('2019-12-31T12:00:00.000Z')
                },
                'Service Name': '12 hour(s) RN service'
            },
            {
                'General Charges': 2200,
                'Night Shift Charges': 0,
                'Holiday Charges': 2200,
                'Total Charge': 4400,
                'Shift Range': {
                    'Start Date': new Date('2020-01-01T00:00:00.000Z'),
                    'End Date': new Date('2020-01-01T12:00:00.000Z')
                },
                'Service Name': '12 hour(s) RN service'
            },
            {
                'General Charges': 2200,
                'Night Shift Charges': 0,
                'Holiday Charges': 0,
                'Total Charge': 2200,
                'Shift Range': {
                    'Start Date': new Date('2020-01-02T00:00:00.000Z'),
                    'End Date': new Date('2020-01-02T12:00:00.000Z')
                },
                'Service Name': '12 hour(s) RN service'
            },
            {
                'General Charges': 2200,
                'Night Shift Charges': 0,
                'Holiday Charges': 0,
                'Total Charge': 2200,
                'Shift Range': {
                    'Start Date': new Date('2020-01-03T00:00:00.000Z'),
                    'End Date': new Date('2020-01-03T12:00:00.000Z')
                },
                'Service Name': '12 hour(s) RN service'
            }
        ],
        TestName: 'Holiday Test'
    },

    {
        Ranges: [
            {
                "Start Date": 1601362800000, //September 29, 2020 3:00:00 PM GMT+08:00
                "End Date": 1601629200000, //October 2, 2020 5:00:00 PM GMT+08:00
                "24 Hours": false
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
              'General Charges': 700,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 700,
              'Shift Range': {
                'Start Date': new Date('2020-09-29T07:00:00.000Z'),
                'End Date': new Date('2020-09-29T09:00:00.000Z')
              },
              'Service Name': '2 hour(s) RN service'
            },
            {
              'General Charges': 700,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 700,
              'Shift Range': {
                'Start Date': new Date('2020-09-30T07:00:00.000Z'),
                'End Date': new Date('2020-09-30T09:00:00.000Z')
              },
              'Service Name': '2 hour(s) RN service'
            },
            {
              'General Charges': 700,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 700,
              'Shift Range': {
                'Start Date': new Date('2020-10-01T07:00:00.000Z'),
                'End Date': new Date('2020-10-01T09:00:00.000Z')
              },
              'Service Name': '2 hour(s) RN service'
            },
            {
              'General Charges': 700,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 700,
              'Shift Range': {
                'Start Date': new Date('2020-10-02T07:00:00.000Z'),
                'End Date': new Date('2020-10-02T09:00:00.000Z')
              },
              'Service Name': '2 hour(s) RN service'
            }
        ],
        TestName: 'Holiday Edge Case Test'
    },
    {
        Ranges: [
            {
                "Start Date": 1601380800000, //September 29, 2020 8:00:00 PM GMT+08:00
                "End Date": 1601596800000, //October 2, 2020 8:00:00 AM GMT+08:00
                "24 Hours": false
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2300,
              'Shift Range': {
                'Start Date': new Date('2020-09-29T12:00:00.000Z'),
                'End Date': new Date('2020-09-30T00:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2300,
              'Shift Range': {
                'Start Date': new Date('2020-09-30T12:00:00.000Z'),
                'End Date': new Date('2020-10-01T00:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 2200,
              'Total Charge': 4500,
              'Shift Range': {
                'Start Date': new Date('2020-10-01T12:00:00.000Z'),
                'End Date': new Date('2020-10-02T00:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            }
          ],
        TestName: 'Holiday Test + Night Charges'
    },
    {
        Ranges: [
            {
                "Start Date": 1595383200000, //July 22, 2020 10:00:00 AM GMT+08:00
                "End Date": 1595419200000, //July 22, 2020 8:00:00 PM GMT+08:00
                "24 Hours": false
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
              'General Charges': 1900,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 1900,
              'Shift Range': {
                'Start Date': new Date('2020-07-22T02:00:00.000Z'),
                'End Date': new Date('2020-07-22T12:00:00.000Z')
              },
              'Service Name': '10 hour(s) RN service'
            }
          ],
        TestName: 'Same Day Start-End Time Test'
    },
    {
        Ranges: [
            {
                "Start Date": 1595509200000, //July 23, 2020 9:00:00 PM GMT+08:00
                "End Date": 1595545200000, //July 24, 2020 7:00:00 AM GMT+08:00
                "24 Hours": false
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
              'General Charges': 1900,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2000,
              'Shift Range': {
                'Start Date': new Date('2020-07-23T13:00:00.000Z'),
                'End Date': new Date('2020-07-23T23:00:00.000Z')
              },
              'Service Name': '10 hour(s) RN service'
            }
          ],
        TestName: 'Night Charge Edge Case when GMT finish time is on previous day'
    },
    {
        Ranges: [
            {
                "Start Date": 1595451600000,  //July 23, 2020 5:00:00 AM GMT+08:00
                "End Date": 1595527200000,  //July 24, 2020 2:00:00 AM GMT+08:00
                "24 Hours": true
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2300,
              'Shift Range': {
                'Start Date': new Date('2020-07-22T21:00:00.000Z'),
                'End Date': new Date('2020-07-23T09:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 1750,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 1850,
              'Shift Range': {
                'Start Date': new Date('2020-07-23T09:00:00.000Z'),
                'End Date': new Date('2020-07-23T18:00:00.000Z')
              },
              'Service Name': '9 hour(s) RN service'
            }
          ],
        TestName: '2 day shift where start time is less than end time (24 Hours shift)'
    },
    {
        Ranges: [
            {
                "Start Date": 1597096800000,  //August 11, 2020 6:00:00 AM GMT+08:00
                "End Date": 1597294800000,  //August 13, 2020 1:00:00 PM GMT+08:00
                "24 Hours": true
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
              'General Charges': 2200,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 2200,
              'Shift Range': {
                'Start Date': new Date('2020-08-10T22:00:00.000Z'),
                'End Date': new Date('2020-08-11T10:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2300,
              'Shift Range': {
                'Start Date': new Date('2020-08-11T10:00:00.000Z'),
                'End Date': new Date('2020-08-11T22:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 2200,
              'Shift Range': {
                'Start Date': new Date('2020-08-11T22:00:00.000Z'),
                'End Date': new Date('2020-08-12T10:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2300,
              'Shift Range': {
                'Start Date': new Date('2020-08-12T10:00:00.000Z'),
                'End Date': new Date('2020-08-12T22:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 1450,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 1450,
              'Shift Range': {
                'Start Date': new Date('2020-08-12T22:00:00.000Z'),
                'End Date': new Date('2020-08-13T05:00:00.000Z')
              },
              'Service Name': '7 hour(s) RN service'
            }
          ],
        TestName: '24 Hours Shift'
    },

    {
        Ranges: [
            {
                "Start Date": 1601334000000,  //September 28, 2020 11:00:00 PM
                "End Date": 1601629200000,  //October 2, 2020 5:00:00 PM GMT+08:00
                "24 Hours": true
            },
        ],
        CGRank: 'RN',
        ClientData: getRandomClient(3000),
        Validation: [
            {
              'General Charges': 2200,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 2200,
              'Shift Range': {
                'Start Date': new Date('2020-09-28T23:00:00.000Z'),
                'End Date': new Date('2020-09-29T11:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2300,
              'Shift Range': {
                'Start Date': new Date('2020-09-29T11:00:00.000Z'),
                'End Date': new Date('2020-09-29T23:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 2200,
              'Shift Range': {
                'Start Date': new Date('2020-09-29T23:00:00.000Z'),
                'End Date': new Date('2020-09-30T11:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 0,
              'Total Charge': 2300,
              'Shift Range': {
                'Start Date': new Date('2020-09-30T11:00:00.000Z'),
                'End Date': new Date('2020-09-30T23:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 0,
              'Holiday Charges': 2200,
              'Total Charge': 4400,
              'Shift Range': {
                'Start Date': new Date('2020-09-30T23:00:00.000Z'),
                'End Date': new Date('2020-10-01T11:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 2200,
              'Night Shift Charges': 100,
              'Holiday Charges': 2200,
              'Total Charge': 4500,
              'Shift Range': {
                'Start Date': new Date('2020-10-01T11:00:00.000Z'),
                'End Date': new Date('2020-10-01T23:00:00.000Z')
              },
              'Service Name': '12 hour(s) RN service'
            },
            {
              'General Charges': 1900,
              'Night Shift Charges': 0,
              'Holiday Charges': 0,
              'Total Charge': 1900,
              'Shift Range': {
                'Start Date': new Date('2020-10-01T23:00:00.000Z'),
                'End Date': new Date('2020-10-02T09:00:00.000Z')
              },
              'Service Name': '10 hour(s) RN service'
            }
          ],
        TestName: '24 Hours Shift + holiday'
    }

]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomClient(max) {
    return {
        'Client Number': getRandomInt(max),
        'Client Gender': 'M',
        'Age Group': '60-70',
        'Weight Group': '120 KGs - 130Kgs',
        'District': 'Hong Kong Island',
        'Medical Condition': 'Diabetes',
        'Level of Dependence': 'Mobile',
        'Mobility': 'Pretty',
        'Service': 'Random',
        'Language': 'Random',
        'Additional Instructions': 'Random',
        "Patient's Name": 'Random',
        'Last Name': 'Random',
        'Phone Number': 'Random',
        'Full Address': 'Random',
    };
}
