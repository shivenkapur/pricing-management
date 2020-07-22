import { credentials, setAccessToken, getAccessToken } from '../config/zoho-credentials';
const fetch = require("node-fetch");
const urls = {
    'item': 'https://invoice.zoho.com/api/v3/items',
    'contact': 'https://invoice.zoho.com/api/v3/contacts',
    'invoice': 'https://invoice.zoho.com/api/v3/invoices?organization_id=639877202'
};

export async function handleAPICall(type, body) {

    let data = await apiCall(type, body);

    if(!data){
        const credentials = await fetchAccessToken();
        setAccessToken(credentials);
        data = await apiCall(type, body);
    }

    return data;
}

export async function fetchAccessToken(){
    let response = await fetch(`https://accounts.zoho.com/oauth/v2/token`,
        {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'},
        }
    );
    const data = await response.json();
    return data["access_token"];
}

export async function apiCall(type, body){
    const accessToken = getAccessToken();

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