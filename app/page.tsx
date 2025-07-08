"use client"
import Split from "react-split";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { Navbar } from "@/components/NavBar";
import { ResizableEditorProps } from "../components/ResizableEditor";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Boxes } from "@/components/ui/background-boxes";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Button } from "@/components/ui/button";
const ResizableEditor = dynamic(() => import('../components/ResizableEditor'), {
  ssr: true,
});

export default function Home() {
  
  const [tabs,setTabs] = useState<ResizableEditorProps[]>([]);
  const [currentTabId, setcurrentId] = useState<Number|null>(null);
  const [output,setOutput] = useState<String>("No Compiler Selected");

  const handleTabs = (data : ResizableEditorProps) =>
  {
    setcurrentId(data.id);
    setOutput(" Complier Set to " + data.language)
    setTabs((prevTabs : ResizableEditorProps[]) =>
    {
        const exists = prevTabs.find(tab => tab.id === data.id);
        if (!exists) {
          return [...prevTabs, data];
        }
        return prevTabs;
      });
  }

  const handleEditorChange = (value: string | undefined) => {
    if (currentTabId === null) return;
  
    const newCode = value || '';
    setTabs(prevTabs =>
      prevTabs.map(tab =>
        tab.id === currentTabId ? { ...tab, code: newCode } : tab
      )
    );
  };
  const runCode = async () => {
    if (!currentTab) return;
    setOutput("Compling")
    const response = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: currentTab.language, // e.g., 'python'
        code: currentTab.code          // e.g., 'print("Hello")'
      }),
    });
  
    const result = await response.json();
    console.log("Execution Output:", result.stdout);
    
    setOutput(result.stdout);
    console.log(result)
    // Optionally show this in your UI
  };

  const handleNewTab = (Data : any) => {
    const newTab: ResizableEditorProps = {
      id: Date.now(), // simple unique ID
      title: Data.title,
      code: "// New tab " + Data.language,
      language: Data.language,
      onCodeChange: () => {},
    };
    handleTabs(newTab);
  };
  let currentTab = tabs.find(tab => tab.id === currentTabId)
  
  return (
    <div className="overflow-hidden h-screen w-screen">
  <Navbar handleTabs={handleTabs} currentTabId={currentTabId} tabs={tabs} handleNewTab={handleNewTab} />

  <div className="h-screen w-screen flex flex-row">
    {/* Sidebar + Main Area Split */}
    <Split
      className="flex flex-row w-full h-full"
      sizes={[20, 80]} // Sidebar 20%, Main area 80%
      minSize={100}
      direction="horizontal"
      gutterSize={3}
    >
      {/* Sidebar */}
      <CardSpotlight className="rounded-none" >
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        CODE REVIEW WILL BE ADDED 
      </p>
      </CardSpotlight>

      {/* Main Area: Editor + Bottom Panel */}
      <Split
        className="flex flex-col w-full h-full"
        sizes={[70, 30]} // Editor 70%, Bottom panel 30%
        minSize={100}
        direction="vertical"
        gutterSize={3}
      >
        {/* Editor Area */}
        <div className="relative h-full w-full bg-gray-950 border-t-1 border-r-1 border-neutral-800">
          {!currentTab && (
            <div className="text-white bg-black p-4 min-h-full overflow-auto">
              CREATE A FILE USING THE TAB 
            </div>
          )}

          {currentTab && (
            <>
              <ResizableEditor
                title={currentTab.title}
                code={currentTab.code}
                language={currentTab.language}
                onCodeChange={handleEditorChange}
                id={currentTab.id}
              />

              <Button className="absolute bottom-4 right-4 bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded shadow-lg z-10"
                onClick={runCode}>
              Run
              </Button>

  
            </>
          )}
        </div>

        {/* Bottom Panel */}
        <div className="bg-black text-white  border-t-1 border-neutral-800 p-4 overflow-auto">
          { output }
        </div>
      </Split>
    </Split>
  </div>
</div>

  )
}
