var fetch = require("node-fetch");

export async function createDoodle(doodleData){
    let response = await fetch(`https://doodle.vercel.app/createPoll`,
        {
            method: "POST",
            body: JSON.stringify(doodleData),
            headers: {'Content-Type': 'application/json'},
        }
    );
    const data = await response.json()
    return data;
}

