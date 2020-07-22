import AWS_CREDENTIALS from '../config/aws-credentials';
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: AWS_CREDENTIALS.AWS_ACCESS_KEY,
    secretAccessKey: AWS_CREDENTIALS.AWS_SECRET_KEY,
    s3_signature_version: 'v4',
    region: AWS_CREDENTIALS.REGION
});

const ddbDocumentClient = new AWS.DynamoDB.DocumentClient();
const tableName: string = "Zoho Contacts";
const id: number = 1;

export async function getZohoContact(): Promise<string> {
    
    try {
        const params = {
            Key: {
                "clientId": id, 
            }, 
            TableName: tableName
        };
        const result = await ddbDocumentClient.get(params).promise()
    
        console.log(result["Item"]["lastRunTime"])
        return result["Item"]["lastRunTime"]
        
    } catch (error) {
        console.error(error);
    }
}

export async function setZohoContact(id: number, zohoCustomerId): Promise <string> {
    
    try {
        const params = {
            TableName: tableName,
            Key:{
                "clientId": id,
            },
            UpdateExpression: "set zohoCustomerId = :d",
            ExpressionAttributeValues:{
                ":d": zohoCustomerId,
            },
            ReturnValues:"UPDATED_NEW"
        };
        const result = await ddbDocumentClient.update(params).promise()
        return JSON.stringify(result)
    } catch (error) {
        console.error(error);
    }
}

