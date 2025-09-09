import express from 'express';
import { demoAgent } from './mastra/agent';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await demoAgent.generateVNext(message, {
      telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      }
    });
    res.json({ response: response.text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});