// components/ResizableEditor.tsx
'use client';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import { OnMount } from '@monaco-editor/react';
import { useEffect } from 'react';


export interface ResizableEditorProps {
  code: string;
  language: string;
  onCodeChange: (value: string) => void;
  title : string;
  id : Number;
}
const ResizableEditor: React.FC<ResizableEditorProps> = ({
code,onCodeChange,language
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // Resize observer to trigger Monaco relayout
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      editorRef.current?.layout();
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
      <Editor
      className='rounded-b-md'
        height="100%"
        width="100%"
        defaultLanguage={language}
        defaultValue="// Start coding..."
        theme="vs-dark"
        options={{ minimap: { enabled: true } }}
        value={code}
        onChange={(value) => onCodeChange(value || '')}
      />
  );
};
export default ResizableEditor;
