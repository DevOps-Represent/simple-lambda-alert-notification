export function generateHttpResponse({
  statusCode,
  body = null,
}: {
  statusCode: number;
  body?: string | null;
}) {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body,
    statusCode,
  };
}
