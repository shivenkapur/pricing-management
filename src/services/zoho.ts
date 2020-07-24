import zohoCredentials from '../config/zoho-credentials';
const fetch = require("node-fetch");
const fs = require('fs');

const urls = {
    'item': 'https://invoice.zoho.com/api/v3/items',
    'contact': 'https://invoice.zoho.com/api/v3/contacts',
    'invoice': 'https://invoice.zoho.com/api/v3/invoices?organization_id=639877202'
};

export async function handleAPICall(type, body) {

    //let data = await apiCall(type, body);
   
    //if(data.message == 'You are not authorized to perform this operation'){
        const accessToken = await fetchAccessToken();
        let data = await apiCall(type, body, accessToken);
    //}

    return data;
}


export async function fetchAccessToken(){

    let response = await fetch(`https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.23ce1199effd30c909661fbecc02a84d.2cc6496552d3b48280ffbaa65158fca2&client_id=1000.AMXW1EDM9X6G9YZHTL4XQOX8THSXLH&client_secret=d05435da81f8d60cfa44d3024dfeda4094e3a5adb9&grant_type=refresh_token&redirect_uri=http://www.zoho.com/invoice`,
        {
            method: "POST",
            body: JSON.stringify(zohoCredentials),
            headers: {'Content-Type': 'application/json'},
        }
    );
    const data = await response.json();
    
    if(data["access_token"]){
        let credentials = JSON.stringify({
            "access_token": data["access_token"]
        });
        //fs.writeFileSync(process.cwd() + '/src/config/zoho-access-token.json', credentials);
    }

    return data["access_token"];
}

function getStoredAccessToken(){
    const fileData:string = fs.readFileSync(process.cwd() + '/src/config/zoho-access-token.json');
    const accessToken:string = JSON.parse(fileData.toString())["access_token"];

    return accessToken;
}

export async function apiCall(type, body, accessToken){
    //const accessToken = getStoredAccessToken();

    let response = await fetch(urls[type],
        {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Zoho-oauthtoken ' + accessToken
            },
        }
    );

    try {
        const data = await response.json();
        return data;
    } catch (error){
        return false;
    }
}