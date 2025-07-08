// components/CodeEditor.tsx
'use client'; // Required if using App Router (Next.js 13+)

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  language?: string;

  onChange?: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, language = 'javascript', onChange }) => {
  return (
    <div style={{ height: '500px' }}>
      <Editor
        defaultLanguage={language}
        defaultValue={value}
        theme="high-constrast-dark"
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;
