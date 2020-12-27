---
title: TypeScript and Netlify Functions
test: this is a test
---

Did you know that Netlify Functions are just using AWS Lambdas behind the scenes?

This means you can use the same type definitions available for aws-lambda for your Netlify functions too. Install the aws-lamda types by running the following.

```bash
npm install @types/aws-lambda --save-dev
```

You only need  to import the `APIGatewayProxyEvent`, `APIGatewayProxyCallback` types like so.

```ts
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  callback: APIGatewayProxyCallback
) {
  // Do some stuff here	
};
```

Note, there are no type declarations available for `context` as this includes properties and methods specific to Netlify such as [Netlify Identity](https://docs.netlify.com/functions/functions-and-identity/#access-identity-info-via-clientcontext) .  

However, having auto completion for `event` alone makes this hugely useful!

I'm putting together some TypeScript Netlify Functions examples over at this [repo](https://github.com/chiubaca/typescript-netlify-functions-starter). Feel free to give it a star if you find it helpful.
