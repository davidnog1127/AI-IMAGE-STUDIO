
import React from 'react';
import { FunctionGrid } from './FunctionGrid';
import { ImageUpload } from './ImageUpload';
import { Mode, FunctionCardData } from '../types';
import { CREATE_FUNCTIONS, EDIT_FUNCTIONS } from '../constants';

interface LeftPanelProps {
    mode: Mode;
    setMode: (mode: Mode) => void;
    activeFunctionId: string;
    setActiveCreateFunction: (id: string) => void;
    setActiveEditFunction: (id: string) => void;
    activeFunction: FunctionCardData;
    prompt: string;
    setPrompt: (prompt: string) => void;
    aspectRatio: string;
    setAspectRatio: (ratio: string) => void;
    image1: string | null;
    setImage1: (image: string | null) => void;
    image2: string | null;
    setImage2: (image: string | null) => void;
    isLoading: boolean;
    onGenerate: () => void;
    error: string | null;
    setError: (error: string | null) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
    mode, setMode, activeFunctionId, setActiveCreateFunction, setActiveEditFunction,
    activeFunction, prompt, setPrompt, aspectRatio, setAspectRatio, image1, setImage1,
    image2, setImage2, isLoading, onGenerate, error, setError
}) => {
    
    const functions = mode === 'create' ? CREATE_FUNCTIONS : EDIT_FUNCTIONS;
    const handleFunctionSelect = (id: string) => {
        if (mode === 'create') {
            setActiveCreateFunction(id);
        } else {
            setActiveEditFunction(id);
        }
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError(null);
        setPrompt(e.target.value);
    }
    
    return (
        <div className="left-panel w-full md:w-1/3 lg:w-1/4 bg-gray-800 p-6 flex flex-col h-full overflow-y-auto">
            <header className="panel-header mb-6">
                <h1 className="text-2xl font-bold text-white">Estúdio de Imagem IA</h1>
                <p className="text-sm text-gray-400">Crie e edite imagens com o poder da IA generativa.</p>
            </header>

            <div className="mode-selector flex bg-gray-700 rounded-lg p-1 mb-6">
                <button
                    className={`mode-btn create w-1/2 p-2 rounded-md text-sm font-semibold transition ${mode === 'create' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                    onClick={() => setMode('create')}
                >
                    Criar
                </button>
                <button
                    className={`mode-btn edit w-1/2 p-2 rounded-md text-sm font-semibold transition ${mode === 'edit' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                    onClick={() => setMode('edit')}
                >
                    Editar
                </button>
            </div>

            <div className="functions-section space-y-3 mb-6">
                <p className="section-title text-sm font-semibold text-gray-300">{mode === 'create' ? 'O que você quer criar?' : 'Como você quer editar?'}</p>
                <FunctionGrid
                    functions={functions}
                    activeFunctionId={activeFunctionId}
                    onSelect={handleFunctionSelect}
                />
            </div>

            <div className="function-description mb-6 p-3 bg-gray-700 rounded-lg text-sm text-gray-300 min-h-[60px]">
                {activeFunction.description}
            </div>
            
            <ImageUpload 
                activeFunction={activeFunction}
                image1={image1}
                setImage1={setImage1}
                image2={image2}
                setImage2={setImage2}
            />

            {(activeFunction.requiresPrompt !== false) && (
                <div className="prompt-section space-y-3 mb-6">
                    <p className="section-title text-sm font-semibold text-gray-300">💡 Sua Ideia</p>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={handlePromptChange}
                        placeholder={activeFunction.promptPlaceholder || "Descreva o que você quer ver..."}
                        className="prompt-textarea w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white placeholder-gray-400"
                        rows={3}
                    />
                </div>
            )}
            
            {mode === 'create' && activeFunction.isAspectRatioControlAvailable && (
                <div className="aspect-ratio-section space-y-3 mb-6">
                     <p className="section-title text-sm font-semibold text-gray-300">📐 Proporção</p>
                     <select
                        id="aspectRatio"
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="aspect-ratio-select w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
                     >
                        <option value="1:1">Quadrado (1:1)</option>
                        <option value="16:9">Paisagem (16:9)</option>
                        <option value="9:16">Retrato (9:16)</option>
                        <option value="4:3">Padrão (4:3)</option>
                        <option value="3:4">Vertical (3:4)</option>
                     </select>
                </div>
            )}

            <div className="flex-grow"></div>

            {error && (
                <div id="errorMessage" className="error-message bg-red-900 border border-red-700 text-red-200 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <button
                id="generateButton"
                onClick={onGenerate}
                disabled={isLoading}
                className="generate-btn w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Gerando...
                    </>
                ) : (
                    'Gerar'
                )}
            </button>
        </div>
    );
};
