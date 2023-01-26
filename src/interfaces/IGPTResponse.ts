/**
 * Used for GPT-3 responses
 * @param data.choices.text the text generated by GPT-3
 * @param data.choices the choices generated by GPT-3
 */
export interface IGPTResponse {
    data: {
        choices: [
            {
                text: string;
            }
        ];
    };
}