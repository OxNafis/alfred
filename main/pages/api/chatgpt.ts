import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from 'openai';
import { Template, TemplateInput } from "../../constants/templates";

// Initialize OpenAI client
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Debugging: Log the API key to verify it's loading correctly (be cautious in production)
console.log("API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(configuration);

export type InputsData = {
    [key: string]: string;
};

// Function to create structured instructions from template inputs
const createInstruction = (inputs: TemplateInput[], inputsData: InputsData): string => {
    return inputs.map((input) => `${input.label}: ${inputsData[input.id]}`).join("\n");
};

// Main handler function for API endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    const { template, inputsData } = req.body as { template: Template; inputsData: InputsData };

    // Validate that both template and inputsData are provided
    if (!template || !inputsData) {
        return res.status(400).json({ error: 'Invalid input: template or inputsData is missing.' });
    }

    // Create instruction string from template inputs and inputsData
    const instruction = createInstruction(template.inputs, inputsData);
    const mainGoal = template.command;

    try {
        // Call OpenAI API
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Your task is: "${mainGoal}".\n\nHere are the details:\n${instruction}.\n Please suggest 3 outputs, and number them 1,2,3.` }
            ],
            temperature: 1,
        });

        const reply = completion.data.choices[0]?.message?.content;

        if (!reply) {
            return res.status(500).json({ error: 'No response from OpenAI API.' });
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error("Error while making the API call:", error);

        if (error instanceof Error && error.hasOwnProperty("response")) {
            const err = error as any;
            return res.status(err.response.status).json({
                error: err.response.data?.error?.message || 'An error occurred'
            });
        }

        return res.status(500).json({ 
            error: 'An unexpected error occurred',
            details: error instanceof Error ? error.message : String(error)
        });
    }
}
