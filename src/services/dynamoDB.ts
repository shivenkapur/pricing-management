import AWS_CREDENTIALS from '../config/aws-credentials';
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: AWS_CREDENTIALS.AWS_ACCESS_KEY,
    secretAccessKey: AWS_CREDENTIALS.AWS_SECRET_KEY,
    s3_signature_version: 'v4',
    region: AWS_CREDENTIALS.REGION
});

const ddbDocumentClient = new AWS.DynamoDB.DocumentClient();
const tableName: string = "ZohoContactData";
const id: number = 1;

export async function getZohoContact(clientId: string) {
    
    try {
        const params = {
            Key: {
                "clientId": clientId, 
            }, 
            TableName: tableName
        };
        const result = await ddbDocumentClient.get(params).promise()
    
        return result["Item"];
        
    } catch (error) {
    }
}

export async function setZohoContact(clientId: string, zohoCustomerId): Promise <string> {
    
    try {
        const params = {
            TableName: tableName,
            Item:{
                "clientId": clientId,
                "zohoCustomerId": zohoCustomerId
            }
        }
        const result = await ddbDocumentClient.put(params).promise();
        return JSON.stringify(result);
    } catch (error) {
        console.error(error);
    }
}

