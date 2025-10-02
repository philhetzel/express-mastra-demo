import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import * as dotenv from 'dotenv';
import { BraintrustExporter } from '@mastra/braintrust';
import { demoAgent } from './agent';

// Load environment variables
dotenv.config();

export const mastra = new Mastra({
  agents: { demoAgent },
  storage: new LibSQLStore({
    // File-based storage to persist telemetry and tool call data
    url: 'file:../mastra.db',
  }),
  telemetry: {
    enabled: false, // Disable OTEL tracing since we're using AI Tracing
  },
  observability: {
    default: { enabled: false },
    configs: {
      braintrust: {
        serviceName: 'my-service',
        exporters: [
          new BraintrustExporter({
            apiKey: process.env.BRAINTRUST_API_KEY,
            projectName: process.env.BRAINTRUST_PROJECT_NAME,
          }),
        ],
      },
    },
    configSelector: () => 'braintrust',
  },
});

export async function initializeMastra() {
  console.log('Mastra initialized successfully');
}