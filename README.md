# Express Mastra Demo with OpenTelemetry Tracing

This repository demonstrates OpenTelemetry (OTel) tracing behavior for Mastra agents in an Express application using V2 Vercel AI SDK language models.

## Overview

The demo showcases how Mastra agents can be instrumented with OpenTelemetry to send traces to Braintrust for monitoring and analysis. The agent uses modern V2 AI SDK models and includes weather and calculator tools.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file with the following variables:

```env
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Braintrust Configuration (required for tracing)
BRAINTRUST_API_KEY=your_braintrust_api_key_here
BRAINTRUST_PROJECT_NAME=your_project_name
BRAINTRUST_PROJECT_ID=your_project_id

# OpenTelemetry Configuration
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.braintrust.dev/otel
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer your_braintrust_api_key,x-bt-parent=project_id:your_project_id
```


## Running the Demo

### Test Agent Functionality

To test basic agent functionality without tracing:

```bash
npx ts-node src/test-agent.ts
```

### Test OpenTelemetry Integration

To test the agent with full OpenTelemetry tracing to Braintrust:

```bash
npx ts-node src/test-otel-express.ts
```

This will:
- Initialize OpenTelemetry with BraintrustSpanProcessor
- Run three test scenarios (weather query, calculator, combined)
- Send traces to your Braintrust project
- Properly shutdown the telemetry system

## Project Structure

```
src/
├── mastra/
│   ├── agent.ts              # Main agent with V2 AI SDK model
│   ├── index.ts              # Mastra configuration with telemetry
│   └── tools/
│       ├── weather-tool.ts   # Real weather API tool
│       └── calculator-tool.ts # Math operations tool
├── tracing.ts                # OpenTelemetry initialization for Express
├── test-agent.ts             # Basic agent testing
└── test-otel-express.ts      # OpenTelemetry integration test
```

## Key Features

### Mastra Agent Configuration
- Uses **V2 AI SDK models** (`openai('gpt-4o-mini')`)
- Supports `generateVNext` method (modern approach)
- Includes memory persistence with LibSQL
- Configured with proper telemetry export

### OpenTelemetry Integration
- **BraintrustSpanProcessor** for Express applications
- Automatic trace collection from AI SDK calls
- Proper span hierarchy and metadata
- Graceful shutdown handling

### Tools
- **Weather Tool**: Fetches real weather data from Open-Meteo API
- **Calculator Tool**: Performs basic mathematical operations
- Both tools are properly instrumented for tracing

## Viewing Traces

After running the OpenTelemetry test, view your traces in the Braintrust dashboard:

```
https://www.braintrust.dev/app/projects/[your-project-name]/logs
```

Traces will show:
- Agent generation calls
- Tool invocations
- Token usage and timing
- Custom metadata and labels


## Notes

- This demo uses Express-specific OpenTelemetry setup (not Next.js)
- Mastra is used as the agent framework
- The Mastra agent is using the V2 language models with `agent.generateVNext()` instead of `generate()`