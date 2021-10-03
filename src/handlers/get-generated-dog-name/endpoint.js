const dogBreedData = require('../../lib/dog-breed.json');
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

module.exports.handler = (event, context, callback) => {
  const { pathParameters: { breed } } = event;

  try {
    if (!dogBreedData.some(x => x === breed)) {
      throw new Error('Breed provided is not valid');
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