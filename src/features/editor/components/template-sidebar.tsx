"use client";

import { useState } from "react";
import Image from "next/image";
import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConfirm } from "@/hooks/use-confirm";

// Template type
interface Template {
  id: string;
  name?: string;
  width: number;
  height: number;
  json: any; // object or string path
  thumbnailUrl?: string;
}

interface TemplateSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

// Local templates
const localTemplates: Template[] = [
  {
    id: "1",
    name: "Car Sale Template",
    width: 16,
    height: 9,
    json: "/coming_soon.json", // path in public folder
    thumbnailUrl: "/coming_soon.png",
  },
  {
    id: "2",
    name: "Template 2",
    width: 4,
    height: 3,
    json: "/flash_sale.json",
    thumbnailUrl: "/flash_sale.png",
  },
];

export const TemplateSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TemplateSidebarProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to replace the current project with this template."
  );

  const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null);

  const onClose = () => onChangeActiveTool("select");

  const onClick = async (template: Template) => {
    const ok = await confirm();
    if (!ok) return;

    if (!editor) {
      console.error("Editor not initialized!");
      return;
    }

    setLoadingTemplateId(template.id);

    try {
      let jsonData: any;

      if (typeof template.json === "string") {
        // Fetch JSON from public folder
        const res = await fetch(template.json);
        if (!res.ok) throw new Error("Failed to load template JSON");
        jsonData = await res.json();
      } else {
        jsonData = template.json;
      }

      console.log("Loaded template JSON:", jsonData);

      // Load template JSON into editor (pass as string)
      editor.loadJson(JSON.stringify(jsonData));

    } catch (err) {
      console.error("Error loading template:", err);
      alert("Failed to load template. Check console for details.");
    } finally {
      setLoadingTemplateId(null);
    }
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "templates" ? "visible" : "hidden"
      )}
    >
      <ConfirmDialog />

      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started"
      />

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {localTemplates.map((template) => (
              <button
                key={template.id}
                style={{ aspectRatio: `${template.width}/${template.height}` }}
                onClick={() => onClick(template)}
                className="relative w-full group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
              >
                <Image
                  fill
                  src={template.thumbnailUrl || "/templates/placeholder.jpg"}
                  alt={template.name || "Template"}
                  className="object-cover"
                />
                {loadingTemplateId === template.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm">Loading...</span>
                  </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 text-left">
                  {template.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};











