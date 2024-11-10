import { generateHttpResponse } from "@src/lib/generateHttpResponse";
import { generateRandomName } from "@src/lib/generateRandomName";
import { logger } from "@src/lib/logger";
import {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  Context,
} from "aws-lambda";
import { validateDogBreed } from "./validate";

export async function handler(
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback
) {
  const {
    pathParameters: { breed },
  } = event;

  try {
    validateDogBreed(breed);

    const name = generateRandomName(breed);

    logger.info(`Generated name for breed ${breed}: ${name}`);

    return callback(
      null,
      generateHttpResponse({
        statusCode: 200,
        body: JSON.stringify({
          name,
        }),
      })
    );
  } catch (err) {
    logger.error(err.message);

    return callback(
      null,
      generateHttpResponse({
        statusCode: 500,
        body: JSON.stringify({
          error: {
            message: err.message,
          },
        }),
      })
    );
  }
}
