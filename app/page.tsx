"use client"
import Split from "react-split";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { Navbar } from "@/components/NavBar";
import { ResizableEditorProps } from "../components/ResizableEditor";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Boxes } from "@/components/ui/background-boxes";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Vortex } from "@/components/ui/vortex";

import { Button } from "@/components/ui/stateful-button";
import { extractIdentifiersWithCounts } from "@/lib/extractIdentifiersWithCounts";
import { Identifiers } from "@/components/Identifier";

import { Sidebar } from "@/components/Sidebar";
const ResizableEditor = dynamic(() => import('../components/ResizableEditor'), {
  ssr: true,
});

export default function Home() {
  
  const [tabs,setTabs] = useState<ResizableEditorProps[]>([]);
  const [currentTabId, setcurrentId] = useState<Number|null>(null);
  const [output,setOutput] = useState<String>("Whatever your good (trash) code splits out will be displayed Here");
  const [keyThings,setKeyThings] = useState<Record<string, number>>({})


  const handleTabs = (data : ResizableEditorProps) =>
  {
    setcurrentId(data.id);
    setOutput(" Compiler Set to " + data.language)
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
    if (currentTab)
    {

    
    setKeyThings(()=>
      {
        return extractIdentifiersWithCounts(currentTab.code,currentTab?.language)
      })
    }
  };
  const runCode = async () => {
    if (!currentTab) return;
    setOutput("Compling")
    const response = await fetch("api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: currentTab.language, // e.g., 'python'
        code: currentTab.code,
        input : "",       // e.g., 'print("Hello")'
      }),
    });
  
    const result = await response.json();
    console.log("Execution Output:", result.output);
    
    setOutput(result.output + "Execution Time\n " + result.execution_time +"\n"+result.error);
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
      sizes={[25, 75]} // Sidebar 20%, Main area 80%
      minSize={100}
      direction="horizontal"
      gutterSize={3}
    >
      {/* Sidebar */}
      <CardSpotlight className="rounded-none" >
      { 
      Object.keys(keyThings).length <=0 && 
      <Sidebar/>
      }
      {Object.keys(keyThings).length > 0 &&
       (
    <div className=" flex-colgap-2 z-20">
    
    {Object.entries(keyThings).map(([identifier, count]) => (
      <Identifiers   key={identifier} token = {identifier} count = {count}/>
    ))}
    </div>

)}
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
  <div className="w-full h-full overflow-hidden m-0 p-0">
    <Vortex
      backgroundColor="black"
      className="w-full h-full flex items-center justify-center flex-col m-0 p-0"
    >
      <h2 className="text-white text-2xl md:text-6xl font-bold text-center m-0">
        The hell is this?
      </h2>
      <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center m-0">
        This is CSE. It&apos;ll hurt more than you&apos;ve ever been
        hurt and you&apos;ll have a scar.
      </p>
      
    </Vortex>
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

              <Button className="absolute bottom-4 right-4 z-10"
                onClick={runCode}>
              Run
              </Button>
            </>
          )}
        </div>

        {/* Bottom Panel */}
        <div className="bg-black text-white  border-t-1 border-neutral-800 p-4 overflow-auto">
        <h2 className="  mx-auto text-l md:text-3xl font-bold text-white  font-sans">
       {output}
      </h2>
        </div>
      </Split>
    </Split>
  </div>
</div>

  )
}
