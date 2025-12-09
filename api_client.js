// api_client.js

/**
 * Gemini API 呼び出し
 */
export async function callGemini(apiKey, model, messages, systemPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    // Gemini用にメッセージ履歴を変換
    const contents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));

    // システムプロンプトの追加 (v1beta仕様)
    const body = {
        contents: contents,
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Gemini API Error');
    return data.candidates[0].content.parts[0].text;
}

/**
 * OpenAI (GPT) API 呼び出し
 */
export async function callOpenAI(apiKey, model, messages, systemPrompt) {
    const url = 'https://api.openai.com/v1/chat/completions';

    // システムプロンプトを履歴の先頭に追加
    const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
    ];

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: apiMessages
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'OpenAI API Error');
    return data.choices[0].message.content;
}

/**
 * Anthropic (Claude) API 呼び出し
 * 注意: ブラウザから直接叩くとCORSエラーになる可能性が高いです
 */
export async function callClaude(apiKey, model, messages, systemPrompt) {
    const url = 'https://api.anthropic.com/v1/messages';

    // Claude用にロールを変換 (user/assistant)
    const apiMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
    }));

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'dangerously-allow-browser': 'true' // デモ用: ブラウザ実行を強制するフラグ
        },
        body: JSON.stringify({
            model: model,
            system: systemPrompt,
            messages: apiMessages,
            max_tokens: 1024
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Claude API Error');
    return data.content[0].text;
}