"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

interface ProjectViewEventProps {
  project: string;
  status: string;
}

export function ProjectViewEvent({ project, status }: ProjectViewEventProps) {
  useEffect(() => {
    track("Project View", { project, status });
  }, [project, status]);

  return null;
}
