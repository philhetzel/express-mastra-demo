import {Eval, wrapMastraAgent} from "braintrust";
import { mastra } from '../mastra';


async function task(input: string) {
    const agent = wrapMastraAgent(mastra.getAgent('demoAgent'));
    const response = await agent.generateVNext(input);
    return response.text;
}

const data = [
    {
        input: "What is the capital of France?",
        expected: "Paris"
    },  
    {
        input: "What's the weather in London?",
    }
]

Eval(
    "MastraAppTest",
    {
        task: task,
        data: data,
        scores: [],
    }
)