import { tool } from '@langchain/core/tools'
import { z } from 'zod/v4'
import { ChatGoogle } from '@langchain/google'
import path from 'path';
import { AIMessage, SystemMessage, HumanMessage, ToolMessage } from '@langchain/core/messages';
import { START, END, StateGraph, StateSchema, MessagesValue, ReducedValue } from '@langchain/langgraph'
process.loadEnvFile(path.resolve('.env'));


// DEFINING TOOLS AND MODELS
const llm = new ChatGoogle({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-flash-lite-latest"
});

const multiply = tool(
    async ({ a, b }) => {
        return a * b;
    },
    {
        name: "multiply",
        description: "Returns the result of two numbers",
        schema: z.object({
            a: z.number().describe("first number"),
            b: z.number().describe("Second number")
        })
    }
);

const add = tool(
    async ({ a, b }) => {
        return a + b;
    },
    {
        name: "add",
        description: "returns the sum of two numbers",
        schema: z.object({
            a: z.number().describe('first number'),
            b: z.number().describe('second number')
        })
    }
);

const divide = tool(
    async ({ a, b }) => {
        return a / b;
    },
    {
        name: "divide",
        description: "Divides two numbers",
        schema: z.object({
            a: z.number().describe('numerator number'),
            b: z.number().describe('denominator number')
        })
    }
);

const toolsByName = {
  [add.name]: add,
  [multiply.name]: multiply,
  [divide.name]: divide,
};
const tools = Object.values(toolsByName)
const llmWithTools = llm.bindTools(tools);


// DEFINING STATES
const MessageState = new StateSchema({
    messages: MessagesValue,
    llmCalls: new ReducedValue(
        z.number().default(0),
        { reducer: (x, y) => x+y }
    )
});

// DEFINE MODEL NODE
const llmCall = async(state) => {
    const response = await llmWithTools.invoke([
        new SystemMessage("You are a helpful assistant tasked with performing arithmetic on a set of inputs."),
        ...state.messages
    ]);

    return {
        messages: [response],
        llmCalls: 1
    };
};



// DEFINE TOOL NODE
const toolNode = async(state) => {
    const lastMessage = state.messages.at(-1);
    if(lastMessage == null || !AIMessage.isInstance(lastMessage))
        return { messages: [] }

    const results = [];
    for(const toolCall of lastMessage.tool_calls) {
        const tool = toolsByName[toolCall.name];
        const observation = await tool.invoke(toolCall.args);

        const formattedObservation = new ToolMessage({
            tool_call_id: toolCall.id,
            content: typeof observation === 'string' ? observation : JSON.stringify(observation),
            name: toolCall.name
        });

        results.push(formattedObservation);
    }

    return {
        messages: results
    };
};



// DEFINE END LOGIC
const shouldContinue = (state) => {
    const lastMessage = state.messages.at(-1);

    if(lastMessage == null || !AIMessage.isInstance(lastMessage))
        return END;

    if(lastMessage.tool_calls.length) {
        return 'toolNode';
    }

    return END;
};




// BUILD AND COMPILE THE AGENT
const agent = new StateGraph(MessageState)
    .addNode("llmCall", llmCall)
    .addNode("toolNode", toolNode)
    .addEdge(START, "llmCall")
    .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
    .addEdge("toolNode", "llmCall")
    .compile();

const result = await agent.invoke({
    messages: [new HumanMessage("Add 3 and 4.")]
});

for(const message of result.messages) {
    console.log(`[${message.type}]: ${message.text}`);
}