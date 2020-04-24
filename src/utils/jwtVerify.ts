import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

dotenv.config();

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

export const jwtVerify = async (token: string) => {
  return new Promise<{ sub: string }>((resolve, reject) => {
    jwt.verify(
      token,
      (header, callback) => {
        client.getSigningKey(header.kid, (error, key: any) => {
          var signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      },
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
      (error, decoded: any) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(decoded);
      }
    );
  });
};
