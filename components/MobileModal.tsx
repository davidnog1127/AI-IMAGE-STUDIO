
import React from 'react';

interface MobileModalProps {
    image: string;
    onEdit: () => void;
    onNewImage: () => void;
}

export const MobileModal: React.FC<MobileModalProps> = ({ image, onEdit, onNewImage }) => {

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `ai_image_${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id="mobileModal" className="mobile-modal fixed inset-0 bg-gray-900 z-50 flex flex-col md:hidden">
            <div className="modal-content flex-grow p-4 flex items-center justify-center">
                <img id="modalImage" src={image} alt="Generated Art" className="modal-image max-w-full max-h-full object-contain rounded-lg" />
            </div>
            <div className="modal-actions p-4 bg-gray-800 flex justify-around items-center">
                <button className="modal-btn edit flex flex-col items-center text-gray-300 hover:text-white" onClick={onEdit}>
                    <span className="text-2xl">✏️</span>
                    <span className="text-xs mt-1">Editar</span>
                </button>
                <button className="modal-btn download flex flex-col items-center text-gray-300 hover:text-white" onClick={downloadImage}>
                    <span className="text-2xl">💾</span>
                    <span className="text-xs mt-1">Salvar</span>
                </button>
                <button className="modal-btn new flex flex-col items-center text-gray-300 hover:text-white" onClick={onNewImage}>
                    <span className="text-2xl">✨</span>
                    <span className="text-xs mt-1">Nova Imagem</span>
                </button>
            </div>
        </div>
    );
};
