export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ExamplePrompt {
  id: string;
  title: string;
  prompt: string;
  category: 'Price' | 'Comparison' | 'Returns' | 'News';
}
