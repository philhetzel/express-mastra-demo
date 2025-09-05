import { NodeSDK } from "@opentelemetry/sdk-node";
import { BraintrustSpanProcessor } from "braintrust";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let sdk: NodeSDK | null = null;

export function initializeTracing() {
  if (sdk) {
    console.log('OpenTelemetry SDK already initialized');
    return;
  }

  console.log('Initializing OpenTelemetry with Braintrust...');
  
  sdk = new NodeSDK({
    spanProcessors: [
      new BraintrustSpanProcessor({
        parent: `project_name:${process.env.BRAINTRUST_PROJECT_NAME || 'MastraAppTest'}`,
        apiKey: process.env.BRAINTRUST_API_KEY,
        filterAISpans: true,
      }),
    ],
  });

  sdk.start();
  console.log('OpenTelemetry SDK started with Braintrust processor');
  
  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('Shutting down OpenTelemetry SDK...');
    await shutdownTracing();
    process.exit(0);
  });
}

export async function shutdownTracing() {
  if (sdk) {
    await sdk.shutdown();
    console.log('OpenTelemetry SDK shutdown complete');
    sdk = null;
  }
}