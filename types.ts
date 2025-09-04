
export type Mode = 'create' | 'edit';

export interface FunctionCardData {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiresOneImage?: boolean;
  requiresTwoImages?: boolean;
  requiresPrompt?: boolean;
  promptPlaceholder?: string;
  isAspectRatioControlAvailable?: boolean;
}
