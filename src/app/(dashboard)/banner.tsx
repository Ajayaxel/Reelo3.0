"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Banner = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/editor/untitled");
    }, 500);
  };

  return (
    <div
      className="text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl"
      style={{
        background: "linear-gradient(90deg, rgba(42, 123, 155, 1) 18%, rgba(87, 199, 133, 1) 57%, rgba(237, 221, 83, 1) 95%)",
      }}
    >
      <div className="rounded-full size-28 items-center justify-center bg-white/50 hidden md:flex">
        <div className="rounded-full size-20 flex items-center justify-center bg-white">
          <Sparkles className="h-20 text-[#2A7B9B] fill-[#EDDD53]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl md:text-3xl font-semibold">
          Visualize your ideas with The Reelo
        </h1>
        <p className="text-xs md:text-sm mb-2">
          Turn inspiration into design in no time. Simply upload an image and let AI do the rest.
        </p>
        <Button
          disabled={loading}
          onClick={onClick}
          variant="secondary"
          className="w-[160px]"
        >
          Start creating
          {loading ? (
            <Loader2 className="size-4 ml-2 animate-spin" />
          ) : (
            <ArrowRight className="size-4 ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
};


