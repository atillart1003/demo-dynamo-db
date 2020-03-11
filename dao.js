const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-southeast-1' });

function dynamoConnect() { }

const getItems = async (params) => {
    const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    return new Promise((resolve, reject) => {
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data.Item)
            }
        });
    })
}

const insert = async (params) => {
    const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

const update = async (params) => {
    const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    return new Promise((resolve, reject) => {
        docClient.update(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

const query = async (params) => {
    const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data.Items)
            }
        });
    })
}

const deleteById = async (params) => {
    const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    return new Promise((resolve, reject) => {
        docClient.delete(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

dynamoConnect.prototype = {
    getItems: async (key, table) => {
        const params = {
            TableName: table,
            Key: key
        }
        try {
            return await getItems(params)
        } catch (err) {
            throw err
        }
    },
    insert: async (items, table) => {
        const params = {
            TableName: table,
            Item: items
        }
        try {
            return await insert(params)
        } catch (err) {
            throw err
        }
    },
    update: async (params, table) => {
        const params = {
            TableName: table,
            ...params
        }
        try {
            return await update()
        } catch (err) {
            throw err
        }
    },
    query: async (params, table) => {
        const params = {
            ...params,
            TableName: table
        }
        try {
            return await query(params)
        } catch (err) {
            throw err
        }
    },
    deleteById: async (id, table) => {
        const params = {
            Key: {
                'id': id
            },
            TableName: table
        }
        try {
            return await deleteById(params)
        } catch (err) {
            throw err
        }
    }
}

module.exports = dynamoConnect

// คำสั่ง Query และ Scan จะสามารถดึงข้อมูลต่อคำสั่งได้ครั้งละ 1 MB. เท่านั้น 
// ส่วน BatchGetItem จะสามารถดึงข้อมูลได้เพียง 100 Items หรือ 16 MB.