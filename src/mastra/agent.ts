import { openai } from '@ai-sdk/openai';
import { wrapLanguageModel } from 'ai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from './tools/weather-tool';
import { calculatorTool } from './tools/calculator-tool';
import { BraintrustMiddleware, initLogger} from "braintrust";

initLogger({
  projectName: "your-project-name",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

export type DemoAgentRuntimeContext = {
  instructions?: string;
}

const defaultInstructions = `
  You are a helpful assistant that can provide weather information and perform mathematical calculations.
  Always be accurate and provide helpful responses.
`;

export const demoAgent = new Agent({
  name: 'Demo Assistant',
  instructions: async ({runtimeContext}) => {
    return runtimeContext?.get("instructions") as string ?? defaultInstructions;
  },
  model: wrapLanguageModel({
    model: openai('gpt-4o-mini'),
    middleware: BraintrustMiddleware({ debug: true, name: "MastraMiddleware" })
  }),
  tools: { weatherTool, calculatorTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});