
import React, { useState, useCallback } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { MobileModal } from './components/MobileModal';
import { generateImage, editImage } from './services/geminiService';
import { Mode, FunctionCardData } from './types';
import { CREATE_FUNCTIONS, EDIT_FUNCTIONS } from './constants';

function App() {
  const [mode, setMode] = useState<Mode>('create');
  const [activeCreateFunction, setActiveCreateFunction] = useState<string>(CREATE_FUNCTIONS[0].id);
  const [activeEditFunction, setActiveEditFunction] = useState<string>(EDIT_FUNCTIONS[0].id);
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeFunctionId = mode === 'create' ? activeCreateFunction : activeEditFunction;
  const functions = mode === 'create' ? CREATE_FUNCTIONS : EDIT_FUNCTIONS;
  const activeFunction = functions.find(f => f.id === activeFunctionId) as FunctionCardData;

  const handleGenerate = useCallback(async () => {
    if (!prompt && !image1) {
      setError("Por favor, descreva sua ideia ou envie uma imagem.");
      return;
    }
    if (activeFunction.requiresOneImage && !image1) {
      setError("Esta função requer uma imagem.");
      return;
    }
    if (activeFunction.requiresTwoImages && (!image1 || !image2)) {
        setError("Esta função requer duas imagens.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setGeneratedText(null);

    try {
      let result;
      if (mode === 'create') {
        result = await generateImage(prompt, activeCreateFunction, aspectRatio);
        setGeneratedImage(result.imageUrl);
      } else {
        result = await editImage(prompt, activeEditFunction, image1, image2);
        setGeneratedImage(result.imageUrl);
        setGeneratedText(result.text);
      }
      if (window.innerWidth < 768) {
          setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, mode, activeCreateFunction, activeEditFunction, activeFunction, image1, image2, aspectRatio]);

  const resetStateForNewImage = () => {
    setGeneratedImage(null);
    setGeneratedText(null);
    setError(null);
    setPrompt('');
    setImage1(null);
    setImage2(null);
    setMode('create');
    setActiveCreateFunction(CREATE_FUNCTIONS[0].id);
    setAspectRatio('1:1');
    setIsModalOpen(false);
  }
  
  const editCurrentImage = () => {
      if (generatedImage) {
        setMode('edit');
        setActiveEditFunction(EDIT_FUNCTIONS[0].id);
        setImage1(generatedImage);
        setImage2(null);
        setGeneratedImage(null);
        setGeneratedText(null);
        if (window.innerWidth < 768) {
            setIsModalOpen(false);
        }
      }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-900 text-gray-200">
      <LeftPanel
        mode={mode}
        setMode={setMode}
        activeFunctionId={activeFunctionId}
        setActiveCreateFunction={setActiveCreateFunction}
        setActiveEditFunction={setActiveEditFunction}
        activeFunction={activeFunction}
        prompt={prompt}
        setPrompt={setPrompt}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        image1={image1}
        setImage1={setImage1}
        image2={image2}
        setImage2={setImage2}
        isLoading={isLoading}
        onGenerate={handleGenerate}
        error={error}
        setError={setError}
      />
      <RightPanel
        isLoading={isLoading}
        generatedImage={generatedImage}
        generatedText={generatedText}
        onEditCurrentImage={editCurrentImage}
      />
      {isModalOpen && generatedImage && (
        <MobileModal 
            image={generatedImage}
            onEdit={editCurrentImage}
            onNewImage={resetStateForNewImage}
        />
      )}
    </div>
  );
}

export default App;