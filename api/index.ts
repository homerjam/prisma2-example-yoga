import { createServer, proxy, Response } from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { NowRequest, NowResponse } from '@now/node';

import { server } from '../src/server';

const endpoint = '/api';

server.start({
  endpoint,
  playground: endpoint,
});

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

const expressServer = createServer(server.express, null, binaryMimeTypes);

export default async function(req: NowRequest, res: NowResponse) {
  let requestBody = req.body
    ? JSON.stringify(req.body).replace(/\\\n/g, '')
    : undefined;

  const event: APIGatewayProxyEvent = {
    path: endpoint,
    httpMethod: req.method,
    // @ts-ignore
    headers: req.headers,
    // @ts-ignore
    queryStringParameters: req.query,
    body: requestBody,
    isBase64Encoded: false,
  };

  // @ts-ignore
  const awsContext: Context = {};

  const awsResponse: Response = await proxy(
    expressServer,
    event,
    awsContext,
    'PROMISE'
  ).promise;

  res.status(awsResponse.statusCode);

  Object.entries(awsResponse.headers).map(([key, value]: any) => {
    res.setHeader(key, value);
  });

  const responseBody = Buffer.from(
    awsResponse.body,
    // @ts-ignore
    awsResponse.isBase64Encoded ? 'base64' : 'utf8'
  );

  res.send(responseBody.toString());
}
