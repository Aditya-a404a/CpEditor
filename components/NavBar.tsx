import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ResizableEditorProps } from "./ResizableEditor";
import { CardSpotlight } from "./ui/card-spotlight";
import clsx from "clsx";
import { cn } from "@/lib/utils";


const languages = [
  {
    label: "JavaScript",
    value: "javascript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    label: "TypeScript",
    value: "typescript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    label: "Python",
    value: "python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    label: "Java",
    value: "java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    label: "C++",
    value: "cpp",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
];

interface NavbarProps {
  handleTabs: (value: ResizableEditorProps) => void;
  currentTabId: Number | null;
  tabs: ResizableEditorProps[];
  handleNewTab: (value: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  handleTabs,
  tabs,
  currentTabId,
  handleNewTab,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [fileName, setFileName] = useState<string>("untitled");

  const selectedLang = languages.find((l) => l.value === selected);

  const handleSubmit = () => {
    if (!fileName || !selectedLang) {
      alert("Please enter a name and select a language.");
      return;
    }
    handleNewTab({
      title: fileName,
      language: selectedLang.value,
      code: "// New tab " + selectedLang.value,
      onCodeChange: () => {},
      id: Date.now(),
    });
    setFileName("untitled");
    setSelected("");
  };

  return (
    <CardSpotlight className="rounded-none flex flex-col">
  {/* Header */}
  <div className="flex w-full items-center justify-between px-2 z-20 shadow-sm   border-gray-800">
    {/* Left: Tabs + "+" Button */}
    <div className="flex items-center gap-2">
      {tabs.map((data: ResizableEditorProps, id: number) => {
        const lang = languages.find((l) => l.value === data.language);
        const isActive = data.id === currentTabId;

        return (
          <button
          className={cn(
            "px-4 py-2 rounded-sm relative z-20 text-white text-sm transition duration-200 border border-white hover:shadow-2xl hover:shadow-white/[0.1]",isActive ? "bg-black" : "bg-neutral-800"
          )}
          onClick={() => handleTabs(data)}
          key={id}
        >
        <div className={cn("absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r", isActive ? "bg-gradient-to-r from-transparent via-violet-600 to-transparent" : "") }/>
        <span className="relative z-20 flex">{data.title}
            {lang?.icon && (
              <Image
                src={lang.icon}
                alt={lang.label}
                width={14}
                height={14}
                className="ml-2"
              />
            )}</span>
          </button>
        );
      })}

      {/* + Button */}
      <Popover>
        <PopoverTrigger asChild>
        <button className="group relative inline-flex h-10 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#4b5563_50%,#ffffff_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-black px-3  text-sm font-medium text-white backdrop-blur-3xl">
          +
        </span>
      </button>


        </PopoverTrigger>
        <PopoverContent className="w-80 bg-neutral-900 border border-neutral-800 text-gray-100">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-100">New File</h4>
              <p className="text-sm text-gray-400">
                Give a name and choose file extension
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="Name" className="text-gray-200">
                  Name
                </Label>
                <Input
                  id="Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="col-span-2 h-8 bg-neutral-800 text-white border-neutral-600"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="language" className="text-gray-200">
                  Language
                </Label>
                <Select onValueChange={setSelected} value={selected}>
                  <SelectTrigger className="col-span-2 h-8 bg-neutral-800 text-white border-neutral-600">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 text-white border border-neutral-600">
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          <Image
                            src={lang.icon}
                            alt={lang.label}
                            width={16}
                            height={16}
                          />
                          {lang.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="mt-4 bg-white border-2 border-neutral-800 hover:bg-white text-black"
                onClick={handleSubmit}
              >
                Create Tab
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>

    {/* Right: Input or Status */}
    <div className="text-white flex gap-2">
    <Popover>
        <PopoverTrigger asChild>
        <button className="group relative inline-flex h-10 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#4b5563_50%,#ffffff_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-black px-3  text-sm font-medium text-white backdrop-blur-3xl">
          Notes
        </span>
      </button>
        </PopoverTrigger>
        <PopoverContent className="w-96 bg-neutral-900 border border-neutral-800 text-gray-100">
  <div className="grid gap-4">
    <div className="space-y-2">
      <h4 className="font-medium text-gray-100">Add Description</h4>
      <p className="text-sm text-gray-400">
        Enter detailed information or notes
      </p>
    </div>
    <div className="grid gap-2">
      <textarea
        value=""
        onChange={(e) => {}}
        rows={6}
        className="w-full rounded-md bg-neutral-800 text-white border border-neutral-800 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-white-500 text-sm"
        placeholder="Start typing..."
      />
      
    </div>
  </div>
</PopoverContent>
      </Popover>
    <Popover>
        <PopoverTrigger asChild>
        <button className="group relative inline-flex h-10 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#4b5563_50%,#ffffff_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-black px-3  text-sm font-medium text-white backdrop-blur-3xl">
          AI
        </span>
      </button>
        </PopoverTrigger>
        <PopoverContent className="w-96 bg-neutral-900 border border-neutral-800 text-gray-100">
  <div className="grid gap-4">
    <div className="space-y-2">
      <h4 className="font-medium text-gray-100">Add Description</h4>
      <p className="text-sm text-gray-400">
        Enter detailed information or notes
      </p>
    </div>
    <div className="grid gap-2">
      <textarea
        value=""
        onChange={(e) => {}}
        rows={6}
        className="w-full rounded-md bg-neutral-800 text-white border border-neutral-800 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-white-500 text-sm"
        placeholder="Start typing..."
      />
      <Button
        className="mt-4 bg-white hover:bg-gray-100 text-black"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  </div>
</PopoverContent>
      </Popover>
    <Popover>
        <PopoverTrigger asChild>
        <button className="group relative inline-flex h-10 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#4b5563_50%,#ffffff_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-black px-3  text-sm font-medium text-white backdrop-blur-3xl">
          Input
        </span>
      </button>
        </PopoverTrigger>
        <PopoverContent className="w-96 bg-neutral-900 border border-gray-600 text-gray-100">
  <div className="grid gap-4">
    <div className="space-y-2">
      <h4 className="font-medium text-gray-100">Add Description</h4>
      <p className="text-sm text-gray-400">
        Enter detailed information or notes
      </p>
    </div>
    <div className="grid gap-2">
      <textarea
        value=""
        onChange={(e) => {}}
        rows={6}
        className="w-full rounded-md bg-neutral-800 text-white border border-gray-600 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-white text-sm"
        placeholder="Start typing..."
      />
      <Button
        className="mt-4 bg-white hover:bg-white text-black"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  </div>
</PopoverContent>


      </Popover>
    </div>
  </div>
</CardSpotlight>
  
  );
};
