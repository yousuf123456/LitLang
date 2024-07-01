import { cn } from "@/lib/utils";
import { EditorBubbleItem, useEditor } from "novel";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  Undo,
  Redo,
} from "lucide-react";
import type { SelectorItem } from "./node-selector";
import { Button } from "@/components/ui/button";

export const UndoRedoButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: "Undo",
      isActive: () => false,
      command: (editor) => editor.chain().focus().undo().run(),
      icon: Undo,
    },
    {
      name: "Redo",
      isActive: () => false,
      command: (editor) => editor.chain().focus().redo().run(),
      icon: Redo,
    },
  ];

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          <Button size="sm" className="rounded-none" variant="ghost">
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
