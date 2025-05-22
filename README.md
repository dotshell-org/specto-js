# Specto JS SDK

A TypeScript/JavaScript SDK for interacting with the Specto log management server API.

## Features
- Fully typed API client for all Specto endpoints
- Handles authentication (API key and Basic Auth)
- Error handling and validation
- Ready for Node.js and browser usage

## Installation

```bash
npm install specto-js
```

## Getting Started

### Create a client
```ts
import { SpectoClient } from 'specto-js';

const client = new SpectoClient({
  baseUrl: 'http://localhost:8989',
  apiKey: 'YOUR_API_KEY',
  password: 'yourpassword',
});
```

### Logs
```ts
// Fetch logs
const logs = await client.getLogs({ severity: 'error' });

// Create a log
await client.createLog({
  message: 'Something went wrong',
  severity: 'error',
  pageId: 'PAGE_ID',
});

// Delete a log
await client.deleteLog('LOG_ID');
```

### Log Analytics & Insights
```ts
const analytics = await client.getLogAnalytics();
const anomalies = await client.getLogAnomalies();
const patterns = await client.getLogPatterns();
const perf = await client.getLogPerformance();
```

### Pages
```ts
const pages = await client.getPages();
await client.createPage({ title: 'My Page', emoji: '📄' });
const page = await client.getPage('PAGE_ID');
await client.updatePage('PAGE_ID', { title: 'Updated Title', emoji: '📝' });
await client.deletePage('PAGE_ID');
await client.deleteAllPages(); // dev only
```

### Retention Policies
```ts
const policies = await client.getRetentionPolicies();
await client.createRetentionPolicy({ name: '30 days', daysToRetain: 30 });
await client.updateRetentionPolicy('RETENTION_ID', { name: '60 days', daysToRetain: 60 });
await client.deleteRetentionPolicy('RETENTION_ID');
```

## Development
- Build: `npm run build`
- Types: TypeScript definitions included

---

See the Specto server documentation for full API details.
