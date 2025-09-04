
import React from 'react';

interface RightPanelProps {
  isLoading: boolean;
  generatedImage: string | null;
  generatedText: string | null;
  onEditCurrentImage: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ isLoading, generatedImage, generatedText, onEditCurrentImage }) => {
    
  const downloadImage = () => {
    if (generatedImage) {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `ai_image_${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div id="loadingContainer" className="loading-container text-center">
          <div className="loading-spinner w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin mx-auto"></div>
          <p className="loading-text mt-4 text-lg text-gray-300">Gerando sua imagem...</p>
        </div>
      );
    }
    if (generatedImage) {
      return (
        <div id="imageContainer" className="image-container w-full h-full flex flex-col items-center justify-center relative group">
          <img 
            id="generatedImage" 
            src={generatedImage} 
            alt="Arte gerada por IA" 
            className="generated-image max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
          />
          <div className="image-actions absolute bottom-4 flex space-x-3 bg-black bg-opacity-50 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="action-btn text-2xl hover:text-indigo-400 transition" title="Editar" onClick={onEditCurrentImage}>✏️</button>
            <button className="action-btn text-2xl hover:text-indigo-400 transition" title="Download" onClick={downloadImage}>💾</button>
          </div>
          {generatedText && (
            <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-60 backdrop-blur-sm p-3 rounded-lg text-sm text-gray-200 shadow-lg">
                <p>{generatedText}</p>
            </div>
          )}
        </div>
      );
    }
    return (
      <div id="resultPlaceholder" className="result-placeholder text-center text-gray-500">
        <div className="result-placeholder-icon text-7xl mb-4">🎨</div>
        <p className="text-xl">Sua obra de arte aparecerá aqui</p>
      </div>
    );
  };
  
  return (
    <div className="right-panel hidden md:flex w-full md:w-2/3 lg:w-3/4 bg-gray-900 p-8 items-center justify-center h-full">
      {renderContent()}
    </div>
  );
};
