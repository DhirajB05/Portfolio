export interface UsesItem {
  label: string;
  name: string;
  link?: string;
}

export interface UsesCategory {
  category: string;
  items: UsesItem[];
}

export const usesData: UsesCategory[] = [
  {
    category: 'Software & Tools',
    items: [
      { label: 'Editor', name: 'VS Code / Cursor AI', link: 'https://code.visualstudio.com/' },
      { label: 'Terminal', name: 'Ubuntu Bash / Zsh', link: 'https://ubuntu.com/' },
      { label: 'AI Models', name: 'Anthropic Claude 3.5 & Google Gemini 1.5', link: 'https://anthropic.com/' },
      { label: 'Security & ML', name: 'DeBERTa-v3 & LangChain', link: 'https://langchain.com/' },
      { label: 'Vector DB', name: 'FAISS & Supabase', link: 'https://supabase.com/' },
      { label: 'Backend API', name: 'FastAPI & Express.js', link: 'https://fastapi.tiangolo.com/' },
      { label: 'Deployment', name: 'Vercel & GitHub Pages', link: 'https://vercel.com/' },
      { label: 'API Testing', name: 'Postman', link: 'https://www.postman.com/' },
    ],
  },
  {
    category: 'Hardware & Gear',
    items: [
      { label: 'Laptop', name: 'Primary Development Machine (Linux & Windows Dual Boot)' },
      { label: 'Display', name: 'Full HD Monitor' },
      { label: 'Keyboard', name: 'Tactile Mechanical Keyboard' },
      { label: 'Mouse', name: 'Wireless Ergonomic Optical Mouse' },
      { label: 'Audio', name: 'Noise-Isolating Headphones' },
      { label: 'Microcontroller', name: 'Arduino / ESP32 (Autonomous Robotics)' },
    ],
  },
];
