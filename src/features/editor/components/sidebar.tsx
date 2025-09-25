// "use client";

// import {
//   LayoutTemplate,
//   ImageIcon,
//   Pencil,
//   Settings,
//   Shapes,
//   Sparkles,
//   Type,
// } from "lucide-react";

// import { ActiveTool } from "@/features/editor/types";
// import { SidebarItem } from "@/features/editor/components/sidebar-item";

// interface SidebarProps {
//   activeTool: ActiveTool;
//   onChangeActiveTool: (tool: ActiveTool) => void;
// };

// export const Sidebar = ({
//   activeTool,
//   onChangeActiveTool,
// }: SidebarProps) => {
//   return (
//     <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
//       <ul className="flex flex-col">
//         <SidebarItem
//           icon={LayoutTemplate}
//           label="Design"
//           isActive={activeTool === "templates"}
//           onClick={() => onChangeActiveTool("templates")}
//         />
//         <SidebarItem
//           icon={ImageIcon}
//           label="Image"
//           isActive={activeTool === "images"}
//           onClick={() => onChangeActiveTool("images")}
//         />
//         <SidebarItem
//           icon={Type}
//           label="Text"
//           isActive={activeTool === "text"}
//           onClick={() => onChangeActiveTool("text")}
//         />
//         <SidebarItem
//           icon={Shapes}
//           label="Shapes"
//           isActive={activeTool === "shapes"}
//           onClick={() => onChangeActiveTool("shapes")}
//         />
//         <SidebarItem
//           icon={Pencil}
//           label="Draw"
//           isActive={activeTool === "draw"}
//           onClick={() => onChangeActiveTool("draw")}
//         />
//         <SidebarItem
//           icon={Sparkles}
//           label="Remove bg"
//           isActive={activeTool === "remove-bg"}
//           onClick={() => {
//             console.log("Clicked Remove bg");
//             onChangeActiveTool("remove-bg");
//           }}
//         />


//         <SidebarItem
//           icon={Settings}
//           label="Settings"
//           isActive={activeTool === "settings"}
//           onClick={() => onChangeActiveTool("settings")}
//         />
//       </ul>
//     </aside>
//   );
// };
"use client";

import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";

import { ActiveTool, Editor } from "@/features/editor/types";
import { SidebarItem } from "@/features/editor/components/sidebar-item";
import { RemoveBgSidebar } from "@/features/editor/components/remove-bg-sidebar";

interface SidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ editor, activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <>
      {/* Main Sidebar */}
      <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
        <ul className="flex flex-col">
          <SidebarItem
            icon={LayoutTemplate}
            label="Design"
            isActive={activeTool === "templates"}
            onClick={() => onChangeActiveTool("templates")}
          />
          <SidebarItem
            icon={ImageIcon}
            label="Image"
            isActive={activeTool === "images"}
            onClick={() => onChangeActiveTool("images")}
          />
          <SidebarItem
            icon={Type}
            label="Text"
            isActive={activeTool === "text"}
            onClick={() => onChangeActiveTool("text")}
          />
          <SidebarItem
            icon={Shapes}
            label="Shapes"
            isActive={activeTool === "shapes"}
            onClick={() => onChangeActiveTool("shapes")}
          />
          <SidebarItem
            icon={Pencil}
            label="Draw"
            isActive={activeTool === "draw"}
            onClick={() => onChangeActiveTool("draw")}
          />
          <SidebarItem
            icon={Sparkles}
            label="Remove bg"
            isActive={activeTool === "remove-bg"}
            onClick={() => onChangeActiveTool("remove-bg")}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            isActive={activeTool === "settings"}
            onClick={() => onChangeActiveTool("settings")}
          />
        </ul>
      </aside>

      {/* Remove BG Sidebar */}
      {activeTool === "remove-bg" && (
        <RemoveBgSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
      )}
    </>
  );
};
