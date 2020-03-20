// const AwsDynamoDb = require('./dao')
// const dynamo = new AwsDynamoDb()

// const main = async () => {
//     await dynamo.insert()
//     await dynamo.query()
//     await dynamo.update()

// }

// main()

const DynamoDbLocal = require('dynamodb-local');
const dynamoLocalPort = 8000;

const main = async () => {
    const child = await DynamoDbLocal.launch(dynamoLocalPort, null, [], false, true); // must be wrapped in async function

    console.log(child)

    await DynamoDbLocal.stopChild(child);
}

main()