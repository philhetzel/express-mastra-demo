import { demoAgent } from './mastra/agent';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testAgent() {
  try {
    console.log('Testing Demo Agent...\n');
    
    // Test 1: Weather query
    console.log('Test 1: Weather Query');
    console.log('Message: "What\'s the weather in London?"');
    const weatherResponse = await demoAgent.generateVNext("What's the weather in London?");
    console.log('Response:', weatherResponse.text);
    console.log('\n---\n');
    
    // Test 2: Calculator query
    console.log('Test 2: Calculator Query');
    console.log('Message: "Calculate 25 multiplied by 4"');
    const calcResponse = await demoAgent.generateVNext("Calculate 25 multiplied by 4");
    console.log('Response:', calcResponse.text);
    console.log('\n---\n');
    
    // Test 3: Combined query
    console.log('Test 3: Combined Query');
    console.log('Message: "What\'s the weather in Paris and calculate 15 + 27?"');
    const combinedResponse = await demoAgent.generateVNext("What's the weather in Paris and calculate 15 + 27?");
    console.log('Response:', combinedResponse.text);
    
  } catch (error) {
    console.error('Error testing agent:', error);
  }
}

// Run the test
testAgent();