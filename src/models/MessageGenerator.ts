import { utcToHongKongDate, getTimeString } from '../helper/date-time';
export class MessageGenerator {
    hubspotContact; caregiverRank; jobsCost;

    constructor(hubspotContact, caregiverRank, jobsCost){
        this.hubspotContact = hubspotContact;
        this.caregiverRank = caregiverRank;
        this.jobsCost = jobsCost;
    }

    createDoodleMessage(){
        
        const dateAndPriceString = this.getDoodleShiftCost(this.jobsCost);
        let message = this.getDoodleMessage(dateAndPriceString);

        return message;
    }

    getDoodleShiftCost(jobsCost) {
        let dateAndPriceString = '';
        jobsCost.forEach((job, index) => {
            job.forEach( (shift, index) => {
                const dateString = this.getDoodleDateString(shift["Shift Range"]["Start Date"], shift["Shift Range"]["End Date"]);
                dateAndPriceString += `\n*每更薪金*: ${shift['Total Charge']}\n`
                dateAndPriceString += `工作時段${index+1}：${dateString}\n`
            })   
        })

        return dateAndPriceString;
    }

    getDoodleMessage(dateAndPriceString){
        let doodleMessage = `Case： ${this.hubspotContact["Client Number"]}` +
        `\n${this.caregiverRank}` +
        `\n${dateAndPriceString}` +
        `\n服務對象：${this.hubspotContact["Client Gender"]} / ${this.hubspotContact["Age Group"]}} 歲` +
        `\n體重：${this.hubspotContact["Weight Group"]} 公斤` +
        `\n工作地點：${this.hubspotContact["District"]}` +
        `\n*客人情況*：${this.hubspotContact["Medical Condition"]} + ${this.hubspotContact["Level of Dependence"]} + ${this.hubspotContact["Mobility"]}` +
        `\n所需護理：${this.hubspotContact["Service"]}` +
        `\n語言：${this.hubspotContact["Language"]}` +
        `\n備註：${this.hubspotContact["Additional Instructions"]}`

        doodleMessage = doodleMessage.replace(/undefined/g, '')
        return doodleMessage;
    }

    getDoodleDateString(startDate, endDate){
        startDate = utcToHongKongDate(startDate);
        endDate = utcToHongKongDate(endDate);
        return `${startDate.getMonth() + 1}月${startDate.getDate()}日` 
            + ' 至 ' 
            + `${endDate.getMonth() + 1}月${endDate.getDate()}日`
            + ' ' + getTimeString(startDate)
            + ' - ' + getTimeString(endDate)
    }

    getBroadcastMessage(doodleMessage, doodleID){
        let broadcastMessage = doodleMessage +  
        `\n 1) 點擊網址, :bangbang:*只輸入電話號碼報名*:bangbang:, 在可行日子打Tick, 並遞交` +
        `\n*觀看教學影片https://bit.ly/2NUst9G`+
        `\n\nhttps://doodle.com/poll/${doodleID}`

        broadcastMessage = broadcastMessage.replace(/undefined/g, '')
        return broadcastMessage;
    }

    getCGMessage(title){
        let cgMessage = `*—確認個案 Case Confirmation—*` + 
        `\n恭喜你，已經成功配對。` +
        `\n\n客人：${title} ${this.hubspotContact["Patient's Name"]} / ${this.hubspotContact["Age Group"]} 歲 / ${this.hubspotContact["Weight Group"]} 公斤` +
        `\n聯絡人：${this.hubspotContact["Last Name"]}` +
        `\n聯絡人電話：${this.hubspotContact["Phone Number"]} (任何問題請先聯絡Evercare)` +
        `\n日期及時間: 下載更表以查閱自己的上班日子、時間` +
        `\n工作地點：${this.hubspotContact["Full Address"]}` +
        `\n*客人情況*：${this.hubspotContact["District"]} + ${this.hubspotContact["Level of Dependence"]} + ${this.hubspotContact["Mobility"]}` +
        `\n所需護理：${this.hubspotContact["Service"]}` +
        `\n備註：${this.hubspotContact["Additional Instructions"]}`  +
        `\n\n注意事項：` +
        `\n1. 請準時前往工作地點 及 出示*工作證*(只適用於機構工作)` +
        `\n2. 完成服務後24小時內於連結報更 https://evercare.typeform.com/to/oFV28h` +
        `\n*觀看教學影片 https://bit.ly/2C5sGo2` +
        `\n3. 上下班請填預定時間, 如遇OT情況，請Whatsapp我們並講明原因` +
        `\n\nEvercare會一直支援你，thank you:relaxed: `

        cgMessage = cgMessage.replace(/undefined/g, '');
        return cgMessage;
    }
}
  
