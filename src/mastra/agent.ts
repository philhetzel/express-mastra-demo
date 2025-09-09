import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from './tools/weather-tool';
import { calculatorTool } from './tools/calculator-tool';

export type DemoAgentRuntimeContext = {
  instructions?: string;
}

const defaultInstructions = `
  You are a helpful assistant that can provide weather information and perform mathematical calculations.
  Always be accurate and provide helpful responses.
`;

export const demoAgent = new Agent({
  name: 'Demo Assistant',
  instructions: defaultInstructions,
  model: openai('gpt-4o-mini'),
  tools: { weatherTool, calculatorTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});