"use client";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/lib/utils";
export function Sidebar() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold  bg-white text-black  px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Adi Arora",
    designation: "Engineer",
    content: (
      <p>
       Want to make this even Better, Contribute Here <Highlight>I want to use them</Highlight> 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Adi Arora",
    designation: "Engineer",
    content: (
      <p>
        <Highlight>Competitive Programming</Highlight> Sure Hurts but Soon Will pay for the efforts,{" "}
        <Highlight>Start right away</Highlight> because yolo. Instead </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];
