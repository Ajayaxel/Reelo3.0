"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";

import { Editor } from "@/features/editor/components/editor";
import { Button } from "@/components/ui/button";

// Minimal template registry for sizes/titles. Extend as you add more.
const TEMPLATE_META: Record<string, { name: string; width: number; height: number }> = {
  car_sale: { name: "Car Sale", width: 1080, height: 1350 },
};

const TemplateEditorPage = () => {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug as string;

  const meta = useMemo(() => TEMPLATE_META[slug] ?? { name: slug, width: 1080, height: 1350 }, [slug]);

  const [jsonString, setJsonString] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`/${slug}.json`);
        if (!res.ok) throw new Error("Failed to load template");
        const data = await res.json();
        if (!isMounted) return;
        setJsonString(JSON.stringify(data));
      } catch (e) {
        if (!isMounted) return;
        setIsError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    if (slug) run();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !jsonString) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to load template</p>
        <Button asChild variant="secondary">
          <a href="/">Back to Home</a>
        </Button>
      </div>
    );
  }

  const initialData = {
    id: `template-${slug}`,
    name: meta.name,
    json: jsonString,
    width: meta.width,
    height: meta.height,
    // The following fields are unused by the editor but exist on the API type.
    userId: "public",
    thumbnailUrl: null,
    isTemplate: true,
    isPro: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as unknown as import("@/features/projects/api/use-get-project").ResponseType["data"]; // satisfy type

  return <Editor initialData={initialData} disableSave />;
};

export default TemplateEditorPage;
