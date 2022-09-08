const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { generateRandomName } = require('../../lib/generate-random-name');

function generateHttpResponse({ statusCode, body = null }) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body,
    statusCode
  };
}

 module.exports.handler = async (event, context, callback) => {
  const { pathParameters: { breed } } = event;

  try {
  const client = new DynamoDBClient({ Region: "ap-southeast-2" });
  const command = new QueryCommand({
    ConsistentRead: true,
  TableName: "dogBreeds",
    KeyConditionExpression: "#DogBreed = :ref",
    ExpressionAttributeValues: {
      ":ref": { S: breed },
    },
  });

  const response = await client.send(command);

  if (response.Count === 0) {
    throw new Error("Breed provided is not valid");
  }

    return callback(null, generateHttpResponse({
      statusCode: 200,
      body: JSON.stringify({
        name: generateRandomName(breed)
      })
    }))
  } catch (err) {
    console.log(JSON.stringify({ level: 'error', detail: err.message }));

    return callback(null, generateHttpResponse({
      statusCode: 500,
      body: JSON.stringify({
        error: {
          message: err.message
        }
      })
    }));
  }
};