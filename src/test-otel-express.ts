import { mastra } from './mastra';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();


async function testOpenTelemetryWithExpress() {
  try {
    console.log('\n=== Testing OpenTelemetry with Express App ===\n');
    console.log('Configuration:');
    console.log('- Project Name:', process.env.BRAINTRUST_PROJECT_NAME || 'MastraAppTest');
    console.log('- API Key:', process.env.BRAINTRUST_API_KEY ? '✓ Set' : '✗ Missing');
    console.log('\n');
    
    // Get the agent from mastra instance
    const agent = mastra.getAgent('demoAgent');
    
    // Test 1: Weather query
    console.log('📍 Test 1: Weather Query');
    console.log('Sending: "What\'s the weather in London?"');
    
    const weatherResponse = await agent.generateVNext("What's the weather in London?"
  );
    
    console.log('Response:', weatherResponse.text?.substring(0, 150) + '...');
    console.log('\n');
    
    // Test 2: Calculator query
    console.log('🧮 Test 2: Calculator Query');
    console.log('Sending: "Calculate 42 multiplied by 3"');
    
    const calcResponse = await agent.generateVNext("Calculate 42 multiplied by 3", {
      telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      }
    });
    
    console.log('Response:', calcResponse.text?.substring(0, 150) + '...');
    console.log('\n');
    
    // Test 3: Combined query
    console.log('🌤️🧮 Test 3: Combined Query');
    console.log('Sending: "What\'s the weather in Paris and calculate 15 + 27?"');
    
    const combinedResponse = await agent.generateVNext("What's the weather in Paris and calculate 15 + 27?", {
      telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      }
    });
    
    console.log('Response:', combinedResponse.text?.substring(0, 150) + '...');
    console.log('\n');
    
    console.log('✅ All tests completed!');
    console.log('\nWaiting for traces to be sent to Braintrust...');
    
    // Give time for traces to flush
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    
    console.log('\n📊 Check your Braintrust dashboard at:');
    console.log(`https://www.braintrust.dev/app/org/phillip-hetzel-s-projects-f40dac/project/${process.env.BRAINTRUST_PROJECT_NAME || 'MastraAppTest'}/logs`);
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
  }
}

// Run the test
testOpenTelemetryWithExpress().then(() => {
  console.log('\n✨ Done!');
  process.exit(0);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});