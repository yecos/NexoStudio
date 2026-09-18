"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { trackMarketingProjectView } from "@/lib/marketing";

interface ProjectViewEventProps {
  project: string;
  status: string;
}

export function ProjectViewEvent({ project, status }: ProjectViewEventProps) {
  useEffect(() => {
    track("Project View", { project, status });
    trackMarketingProjectView(project, status);
  }, [project, status]);

  return null;
}
