import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import * as dotenv from 'dotenv';
import {BraintrustSpanProcessor} from 'braintrust';

// Load environment variables
dotenv.config
();

const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  spanProcessors: [new BraintrustSpanProcessor({
    parent: 'project_id:fdb997ff-4a7a-419c-942e-ce58070fc5c4'
  })],
});

sdk.start();