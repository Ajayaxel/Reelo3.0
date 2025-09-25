// src/features/projects/api/use-get-project.ts
"use client";

import { useState, useEffect } from "react";

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
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


