# Transaction Ingestion Microservice

A secure NestJS microservice for ingesting pension contribution notifications from external partners like banks and M-Pesa.

## Features

- JWT-based authentication for external partners
- Idempotent transaction recording
- Validation and audit trail
- PostgreSQL database with automatic schema synchronization
- Swagger API documentation at `/api`

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/transactions_db
JWT_SECRET=your_secret_key_here
PORT=3000
```

## Database Setup

The app uses PostgreSQL with TypeORM and auto-synchronizes schema on startup (no manual migrations needed in development).

### For Production Deployments

**Build and deploy command:**
```bash
npm install && npm run build
```

The app handles database synchronization automatically via TypeORM's `synchronize: true` setting.

**If you need to generate migrations:**
```bash
npm run db:migrate:generate
npm run db:migrate:run
```

**To revert migrations:**
```bash
npm run db:migrate:revert
```

## Running the app

```bash
# development (with hot reload)
npm run start:dev

# production
npm run start:prod

# debug mode
npm run start:debug
```

## API Documentation

Access Swagger UI at: **http://localhost:3000/api**

## API Endpoints

### Authenticate Partner

POST /auth/token

Body:
```json
{
  "client_id": "bank_client_1",
  "client_secret": "plain_secret"
}
```

Response:
```json
{
  "access_token": "jwt_token"
}
```

### Ingest Transaction

POST /api/v1/transactions

Headers:
```
Authorization: Bearer <jwt_token>
```

Body:
```json
{
  "transactionId": "9875JHJHSJHDJSH888",
  "amount": "45000",
  "AutoNestID": "DF202600000003",
  "transactionDate": "2026-02-16 13:59:24",
  "origin": "BANK"
}
```

Response:
```json
{
  "success": true,
  "message": "Transaction recorded",
  "transactionId": "9875JHJHSJHDJSH888"
}
```

## Security

- JWT tokens expire in 15 minutes
- Client secrets are hashed
- Idempotency prevents duplicate transactions
- Validation ensures data integrity
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
