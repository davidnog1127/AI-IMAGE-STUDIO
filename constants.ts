
import { FunctionCardData } from './types';

export const CREATE_FUNCTIONS: FunctionCardData[] = [
  {
    id: 'generate-image',
    name: 'Gerar Imagem',
    icon: '✨',
    description: 'Crie uma imagem do zero usando um prompt de texto.',
    requiresPrompt: true,
    promptPlaceholder: 'Ex: Um astronauta surfando em um cometa...',
    isAspectRatioControlAvailable: true,
  },
  {
    id: 'create-variation',
    name: 'Criar Variação',
    icon: '🎨',
    description: 'Gere uma variação de uma imagem que você enviar.',
    requiresOneImage: true,
    requiresPrompt: false,
    isAspectRatioControlAvailable: true,
  }
];

export const EDIT_FUNCTIONS: FunctionCardData[] = [
  {
    id: 'edit-with-prompt',
    name: 'Editar com Prompt',
    icon: '✏️',
    description: 'Modifique uma imagem existente com base em um prompt.',
    requiresOneImage: true,
    requiresPrompt: true,
    promptPlaceholder: 'Ex: Adicione um chapéu de cowboy no gato',
  },
  {
    id: 'combine-images',
    name: 'Combinar Imagens',
    icon: '🔗',
    description: 'Combine duas imagens em uma única composição, guiado por um prompt.',
    requiresTwoImages: true,
    requiresPrompt: true,
    promptPlaceholder: 'Ex: Misture as duas imagens no estilo de Van Gogh',
  },
];
