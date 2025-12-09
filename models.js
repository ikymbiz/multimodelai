// models.js
export const modelList = [
    // --- Google Gemini ---
    { 
        id: "gemini-2.5-flash", 
        name: "Gemini 2.5 Flash", 
        provider: "gemini" 
    },
    { 
        id: "gemini-3-pro-preview", 
        name: "gemini-3-pro-preview", 
        provider: "gemini" 
    },
    { 
        id: "gemini-2.5-flash-lite", 
        name: "Gemini 2.5-flash-lite", 
        provider: "gemini" 
    },
    
    // --- OpenAI ---
    { 
        id: "gpt-4o", 
        name: "GPT-4o", 
        provider: "openai" 
    },
    { 
        id: "gpt-3.5-turbo", 
        name: "GPT-3.5 Turbo", 
        provider: "openai" 
    },

    // --- Anthropic Claude ---
    { 
        id: "claude-3-5-sonnet-20240620", 
        name: "Claude 3.5 Sonnet", 
        provider: "claude" 
    }
];