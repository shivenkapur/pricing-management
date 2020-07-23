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
        ClientData: getRandomClient(79),
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

]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomClient(clientNumber) {
    return {
        'Client Number': clientNumber,
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
