import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { demoAgent } from './agent';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const mastra = new Mastra({
  agents: { demoAgent },
  storage: new LibSQLStore({
    // File-based storage to persist telemetry and tool call data
    url: 'file:../mastra.db',
  }),
  telemetry: {
    serviceName: "express-mastra-demo",
    enabled: true,
    export: {
      type: "otlp",
    },
  },
});

export async function initializeMastra() {
  console.log('Mastra initialized successfully');
}