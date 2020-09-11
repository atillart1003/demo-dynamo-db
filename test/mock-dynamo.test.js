/*
const AWSMock = require("aws-sdk-mock");
const AWS = require("aws-sdk");
beforeAll(async (done) => {
    //get requires env vars
    done();
});
describe("the module", () => {
    it("should mock getItem from DynamoDB", async () => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB', 'getItem', (params, callback) => {
            console.log('DynamoDB', 'getItem', 'mock called');
            callback(null, { pk: "foo", sk: "bar" });
        });
        let input = { TableName: '', Key: {} };
        const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
        expect(await dynamodb.getItem(input).promise()).toStrictEqual({ pk: 'foo', sk: 'bar' });
        AWSMock.restore('DynamoDB');
    });
    it("should mock reading from DocumentClient", async () => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
            console.log('DynamoDB.DocumentClient', 'get', 'mock called');
            callback(null, { pk: "foo", sk: "bar" });
        });
        let input = { TableName: '', Key: {} };
        const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
        expect(await client.get(input).promise()).toStrictEqual({ pk: 'foo', sk: 'bar' });
        AWSMock.restore('DynamoDB.DocumentClient');
    });
});
*/

const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;
const config = {
    convertEmptyValues: true,
    ...(isTest && { endpoint: 'localhost:8000', sslEnabled: false, region: 'ap-southaest-1' })
};

const ddb = new DocumentClient(config);

beforeAll(async (done) => {
    done()
})

describe("the module", () => {
    it('should insert item into table', async () => {
        console.log(config)
        await ddb.put({ TableName: 'files', Item: { id: '1', hello: 'world' } }).promise();

        const { Item } = await ddb.get({ TableName: 'files', Key: { id: '1' } }).promise();

        expect(Item).toEqual({
            id: '1',
            hello: 'world'
        });
    });
})