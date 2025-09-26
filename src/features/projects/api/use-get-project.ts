// src/features/projects/api/use-get-project.ts
"use client";

import { useState, useEffect } from "react";

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  json: string;
  userId: string;
  thumbnailUrl: string | null;
  isTemplate: boolean;
  isPro: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useGetProject = (id: string) => {
  const [data, setData] = useState<Project | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    try {
      // Simulate fetching a single project locally
      const project: Project = {
        id,
        name: `Project ${id}`,
        width: 1080,
        height: 1350,
        json: "{}",
        userId: "local",
        thumbnailUrl: null,
        isTemplate: false,
        isPro: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setData(project);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  }, [id]);

  return { data, isLoading, isError };
};

export type ResponseType = {
  data: Project | null;
  isLoading?: boolean;
  isError?: boolean;
};
