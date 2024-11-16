import React, { useState } from 'react';
import InputComponent from "./InputComponent";
import OutputComponent from "./OutputComponent";
import { Template } from "../constants/templates";

// @ts-ignore
const InputOutputComponent = ({ template }) => {
    const [output, setOutput] = useState("");

    const handleClearOutput = () => {
        setOutput("");
    };

    const generateOutputHandler = async (template: Template, inputsData: { [key: string]: string }) => {
        try {
            const result = await fetch("/api/chatgpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    template,
                    inputsData
                }),
            });

            const data = await result.json();
            console.log("API response:", data);  // Debugging log
            const { reply } = data;
            setOutput(reply || '');  // Set output or empty string if reply is undefined
        } catch (error) {
            console.error("Error generating output:", error);
            setOutput("Error generating output");  // Display error message in output
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full h-full">
            <InputComponent
                template={template}
                generateOutput={generateOutputHandler}
            />
            <OutputComponent
                onClearOutput={handleClearOutput}
                generatedOutput={output}
            />
        </div>
    );
};

export default InputOutputComponent;
