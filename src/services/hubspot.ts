var fetch = require("node-fetch");

export async function getContactByID(clientNumber){
    let response = await fetch(`https://hubspot-eight.vercel.app/getClientByClientID?clientNumber=${clientNumber}`,
        {
            headers: {},
            method: "GET"
        }
    );
    const data = await response.json()
    return data;
}

