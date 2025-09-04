
import React from 'react';
import { FunctionCardData } from '../types';

interface FunctionGridProps {
    functions: FunctionCardData[];
    activeFunctionId: string;
    onSelect: (id: string) => void;
}

export const FunctionGrid: React.FC<FunctionGridProps> = ({ functions, activeFunctionId, onSelect }) => {
    return (
        <div className="functions-grid grid grid-cols-2 gap-3">
            {functions.map((func) => (
                <div
                    key={func.id}
                    data-function={func.id}
                    className={`function-card p-3 border rounded-lg cursor-pointer transition flex flex-col items-center justify-center text-center ${
                        activeFunctionId === func.id
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => onSelect(func.id)}
                >
                    <div className="text-2xl">{func.icon}</div>
                    <div className="text-sm font-semibold mt-1">{func.name}</div>
                </div>
            ))}
        </div>
    );
};
