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
    <CardSpotlight className="rounded-none">
      <NavigationMenu className=" w-full shadow-sm">
        <NavigationMenuList className="flex w-full items-center px-2">
          <NavigationMenuItem className="flex gap-1">
            {tabs.map((data: ResizableEditorProps, id: number) => {
              const lang = languages.find((l) => l.value === data.language);
              const isActive = data.id === currentTabId;

              return (
                <NavigationMenuLink
                  key={id}
                  className={clsx(
                    "flex ",
                    isActive
                      ? "bg-neutral-800 text-white border-violet-700 border-1 "
                      : "bg-neutral-900 text-gray-400 hover:bg-gray-800 border-gray-800"
                  )}
                  asChild
                  onClick={() => handleTabs(data)}
                >
                  <Link className="flex " href="#">
                    <span>{data.title} {lang?.icon && (
                      <Image
                        src={lang.icon}
                        alt={lang.label}
                        width={14}
                        height={14}
                        className="inline-block"
                      />
                    )}</span>
                  </Link>
                </NavigationMenuLink>
              );
            })}
            </NavigationMenuItem>

            {/* + Button */}
            <NavigationMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className=""
                >
                  +
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-neutral-900 border border-gray-600 text-gray-100">
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
                        className="col-span-2 h-8 bg-neutral-800 text-white border-gray-600"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="language" className="text-gray-200">
                        Language
                      </Label>
                      <Select onValueChange={setSelected} value={selected}>
                        <SelectTrigger className="col-span-2 h-8 bg-neutral-800 text-white border-gray-600">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 text-white border border-gray-600">
                          {languages.map((lang) => (
                            <SelectItem  key={lang.value} value={lang.value}>
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
                      className="mt-4 bg-violet-700 hover:bg-violet-900 text-white"
                      onClick={handleSubmit}
                    >
                      Create Tab
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </CardSpotlight>
  );
};
