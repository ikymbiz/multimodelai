// 注意: 変数名を promptRegistry に変更しています
export const promptRegistry = [
    {
        id: "default",
        name: "デフォルト (親切なAI)",
        file: "./prompts/default.txt"
    },
    {
        id: "engineer",
        name: "プロンプト作成",
        file: "./prompts/prompt_creator.txt"
    },
    {
        id: "engineer",
        name: "シニアエンジニア",
        file: "./prompts/engineer.txt"
    },
    {
        id: "translator",
        name: "英語翻訳家",
        file: "./prompts/translator.txt"
    }
];