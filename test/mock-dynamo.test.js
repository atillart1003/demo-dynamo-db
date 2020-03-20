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
