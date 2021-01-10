[![Netlify Status](https://api.netlify.com/api/v1/badges/25cb6de7-ba37-4736-b165-1b002fb311d8/deploy-status)](https://app.netlify.com/sites/chiubaca-blog/deploys)

# [chiubca.com](chiubca.com)

> This is my personal website. The source code is open for learning purposes. Feel free to re-use _*parts*_ of this codebase with attribution.

This site has been bootstrapped with [Gridsome](https://gridsome.org/) and makes use of my [DEV.to source plugin](https://github.com/chiubaca/gridsome-source-devto) which I developed specifically for this blog.

## Local Development

### Pre-requisite Setup
Ensure you have `.env` file with two variables

`DEVTO_KEY` - Your DEV.to API key

`CF_TOKEN` - Your Cloudflare Analytics token

Example `.env` file.
```
DEVTO_KEY=<your-token-goes-here>
CF_TOKEN=<your-token-goes-here>
```

### Install Dependencies

```
npm install
```

### Start Local Server with GraphQL Explorer 
```
npm run dev
```

## Build For Production
```
npm run generate
```