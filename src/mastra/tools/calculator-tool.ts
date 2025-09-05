import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const calculatorTool = createTool({
  id: 'calculator',
  description: 'Perform basic mathematical operations',
  inputSchema: z.object({
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']).describe('The operation to perform'),
    a: z.number().describe('The first number'),
    b: z.number().describe('The second number'),
  }),
  outputSchema: z.object({
    result: z.number(),
    operation: z.string(),
    a: z.number(),
    b: z.number(),
    formula: z.string(),
  }),
  execute: async ({ context }) => {
    return await calculate(context.operation, context.a, context.b);
  },
});

async function calculate(operation: 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number) {
  let result: number;
  let formula: string;
  
  switch (operation) {
    case 'add':
      result = a + b;
      formula = `${a} + ${b} = ${result}`;
      break;
    case 'subtract':
      result = a - b;
      formula = `${a} - ${b} = ${result}`;
      break;
    case 'multiply':
      result = a * b;
      formula = `${a} × ${b} = ${result}`;
      break;
    case 'divide':
      if (b === 0) {
        throw new Error('Division by zero is not allowed');
      }
      result = a / b;
      formula = `${a} ÷ ${b} = ${result}`;
      break;
  }
  
  return {
    result,
    operation,
    a,
    b,
    formula,
  };
}