
import React, { useRef } from 'react';
import { FunctionCardData } from '../types';

interface ImageUploadProps {
    activeFunction: FunctionCardData;
    image1: string | null;
    setImage1: (image: string | null) => void;
    image2: string | null;
    setImage2: (image: string | null) => void;
}

const UploadArea: React.FC<{
    id: string;
    image: string | null;
    setImage: (image: string | null) => void;
    title: string;
    className?: string;
}> = ({ id, image, setImage, title, className }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div 
            className={`upload-area border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition relative overflow-hidden ${className}`}
            onClick={() => inputRef.current?.click()}
        >
            <input 
                type="file" 
                id={id} 
                accept="image/*" 
                className="hidden" 
                ref={inputRef}
                onChange={handleFileChange}
            />
            {image ? (
                <img src={image} alt="Preview" className="image-preview absolute inset-0 w-full h-full object-cover" />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <span className="text-3xl">📁</span>
                    <span className="font-semibold mt-2">{title}</span>
                    <span className="upload-text text-xs">Clique para selecionar</span>
                </div>
            )}
        </div>
    );
};


export const ImageUpload: React.FC<ImageUploadProps> = ({ activeFunction, image1, setImage1, image2, setImage2 }) => {
    if (activeFunction.requiresTwoImages) {
        return (
            <div id="twoImagesSection" className="functions-section space-y-3">
                <p className="section-title text-sm font-semibold text-gray-300">📸 Duas Imagens Necessárias</p>
                <div className="grid grid-cols-2 gap-3 h-28">
                    <UploadArea id="imageUpload1" image={image1} setImage={setImage1} title="Primeira Imagem" />
                    <UploadArea id="imageUpload2" image={image2} setImage={setImage2} title="Segunda Imagem" />
                </div>
            </div>
        );
    }
    
    if (activeFunction.requiresOneImage) {
        return (
             <div className="functions-section space-y-3">
                <p className="section-title text-sm font-semibold text-gray-300">📸 Imagem Necessária</p>
                <UploadArea id="imageUpload1" image={image1} setImage={setImage1} title="Enviar Imagem" className="h-28" />
             </div>
        );
    }

    return null;
}
