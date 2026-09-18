"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";\nimport { trackMarketingProjectView } from "@/lib/marketing";

interface ProjectViewEventProps {
  project: string;
  status: string;
}

export function ProjectViewEvent({ project, status }: ProjectViewEventProps) {
  useEffect(() => {
    track("Project View", { project, status });\n    trackMarketingProjectView(project, status);
  }, [project, status]);

  return null;
}
