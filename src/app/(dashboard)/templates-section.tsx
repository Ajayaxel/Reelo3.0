"use client";

import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

import { TemplateCard } from "./template-card";

export const TemplatesSection = () => {
  const router = useRouter();
  // Static dummy templates (read-only) from public/ assets
  const templates = [
    {
      id: "car_sale",
      name: "Car Sale",
      thumbnailUrl: "/car_sale.png",
      width: 1080,
      height: 1350,
      isPro: false,
    },
  ];

  const onClick = (templateId: string) => {
    router.push(`/editor/template/${templateId}`);
  };

  const isLoading = false;
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Start from a template
        </h3>
        <div className="flex items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }
  if (!templates.length) {
    return null;
  }

  return (
    <div>
      <h3 className="font-semibold text-lg">
        Start from a template
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl || ""}
            onClick={() => onClick(template.id)}
            disabled={false}
            description={`${template.width} x ${template.height} px`}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
};
