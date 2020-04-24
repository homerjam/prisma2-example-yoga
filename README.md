# prisma-2-example-yoga

## Development

- Start postgres

```
$ docker-compose up -d
```

- Install dependencies

```
$ yarn
```

- Migrate database

```
$ yarn migrate:save && yarn migrate:up
```

- Launch Poxa

```
$ docker run --rm --name poxa -p 8080:8080 edgurgel/poxa-automated:latest
```

- Start server

```
$ yarn dev
```

## Production

- Create Auth0 app, update `env` in `now.json`

- Create Pusher app, update `env` in `now.json`

- Deploy

```
$ now --prod
```

- Profit

```
https://prisma2-example-yoga.now.sh/api
```

## Endpoints

Prisma Studio

```
$ yarn studio

http://localhost:5555
```

GraphQL Playground

```
http://localhost:4000
```

## Environment Variables `(.env)`

    DATABASE_URL= # Postgres database URL

    AUTH0_DOMAIN= # Auth0 > Applications > SPA > Domain
    AUTH0_AUDIENCE= # Auth0 > APIs > Custom API > Audience

    PUSHER_HOST=poxa.herokuapp.com
    PUSHER_PORT=80
    PUSHER_APP_ID=app_id
    PUSHER_APP_KEY=app_key
    PUSHER_APP_SECRET=secret
