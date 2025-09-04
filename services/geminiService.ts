
import { GoogleGenAI, Modality } from "@google/genai";

// As per guidelines, API key is initialized from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a data URL string to its MIME type and base64 data parts.
 * @param dataUrl The data URL to convert.
 * @returns An object containing the MIME type and base64 data.
 */
const dataUrlToParts = (dataUrl: string): { mimeType: string, data: string } => {
    const parts = dataUrl.split(',');
    if (parts.length !== 2) {
        throw new Error('Invalid data URL.');
    }
    const mimeMatch = parts[0].match(/:(.*?);/);
    if (!mimeMatch || mimeMatch.length < 2) {
        throw new Error('Could not determine MIME type from data URL.');
    }
    const mimeType = mimeMatch[1];
    const data = parts[1];
    return { mimeType, data };
};

export const generateImage = async (
    prompt: string,
    functionId: string, // Kept for potential future routing based on function
    aspectRatio: string,
): Promise<{ imageUrl: string }> => {

    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("A API não retornou nenhuma imagem.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
    return { imageUrl };
};

export const editImage = async (
    prompt: string,
    functionId: string, // Kept for potential future routing based on function
    image1: string | null,
    image2: string | null,
): Promise<{ imageUrl: string | null; text: string | null }> => {

    if (!image1) {
        throw new Error("A imagem principal é necessária para a edição.");
    }
    
    const parts: any[] = [];
    
    const { mimeType, data } = dataUrlToParts(image1);
    parts.push({
        inlineData: {
            data: data,
            mimeType: mimeType,
        },
    });

    if (image2) {
        const { mimeType: mimeType2, data: data2 } = dataUrlToParts(image2);
        parts.push({
            inlineData: {
                data: data2,
                mimeType: mimeType2,
            },
        });
    }

    if (prompt) {
        parts.push({ text: prompt });
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: parts },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    
    let imageUrl: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                text = part.text;
            } else if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageMimeType = part.inlineData.mimeType;
                imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
            }
        }
    }

    if (!imageUrl && !text) {
        throw new Error("A edição não produziu uma nova imagem ou texto.");
    }
    
    return { imageUrl, text };
};
