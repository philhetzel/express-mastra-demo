import { demoAgent } from './mastra/agent';
import { initializeTracing, shutdownTracing } from './tracing';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenTelemetry tracing BEFORE any AI SDK calls
initializeTracing();

async function testOpenTelemetryWithExpress() {
  try {
    console.log('\n=== Testing OpenTelemetry with Express App ===\n');
    console.log('Configuration:');
    console.log('- Project Name:', process.env.BRAINTRUST_PROJECT_NAME || 'MastraAppTest');
    console.log('- API Key:', process.env.BRAINTRUST_API_KEY ? '✓ Set' : '✗ Missing');
    console.log('\n');
    
    // Test 1: Weather query
    console.log('📍 Test 1: Weather Query');
    console.log('Sending: "What\'s the weather in London?"');
    
    const weatherResponse = await demoAgent.generateVNext("What's the weather in London?");
    
    console.log('Response:', weatherResponse.text?.substring(0, 150) + '...');
    console.log('\n');
    
    // Test 2: Calculator query
    console.log('🧮 Test 2: Calculator Query');
    console.log('Sending: "Calculate 42 multiplied by 3"');
    
    const calcResponse = await demoAgent.generateVNext("Calculate 42 multiplied by 3");
    
    console.log('Response:', calcResponse.text?.substring(0, 150) + '...');
    console.log('\n');
    
    // Test 3: Combined query
    console.log('🌤️🧮 Test 3: Combined Query');
    console.log('Sending: "What\'s the weather in Paris and calculate 15 + 27?"');
    
    const combinedResponse = await demoAgent.generateVNext("What's the weather in Paris and calculate 15 + 27?");
    
    console.log('Response:', combinedResponse.text?.substring(0, 150) + '...');
    console.log('\n');
    
    console.log('✅ All tests completed!');
    console.log('\nWaiting for traces to be sent to Braintrust...');
    
    // Give time for traces to flush
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Properly shutdown OpenTelemetry
    await shutdownTracing();
    
    console.log('\n📊 Check your Braintrust dashboard at:');
    console.log(`https://www.braintrust.dev/app/org/phillip-hetzel-s-projects-f40dac/project/${process.env.BRAINTRUST_PROJECT_NAME || 'MastraAppTest'}/logs`);
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    await shutdownTracing();
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