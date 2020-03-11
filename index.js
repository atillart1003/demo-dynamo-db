const AwsDynamoDb = require('./dao')
const dynamo = new AwsDynamoDb()

const main = async () => {
    await dynamo.insert()
    await dynamo.query()
    await dynamo.update()

}

// main()