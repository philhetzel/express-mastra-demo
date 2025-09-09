import { demoAgent } from './mastra/agent';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testOpenTelemetryWithExpress() {
  try {
    console.log('\n=== Testing OpenTelemetry with Express App ===\n');
    console.log('Configuration:');
    console.log('- Service Name:', process.env.OTEL_SERVICE_NAME || 'express-mastra-demo');
    console.log('- OTLP Endpoint:', process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces');
    console.log('\n');
    
    // Test 1: Weather query
    console.log('📍 Test 1: Weather Query');
    console.log('Sending: "What\'s the weather in London?"');
    
    const weatherResponse = await demoAgent.generateVNext("What's the weather in London?", { telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
    }});
    
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
    console.log('\nWaiting for traces to be sent...');
    
    // Give time for traces to flush
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('\n📊 Check your observability dashboard for traces');
    
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