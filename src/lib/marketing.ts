declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMarketingLead(projectType: string, budget: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "generate_lead", {
    project_type: projectType,
    budget_range: budget,
  });

  const googleAdsSendTo =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO?.trim();
  if (googleAdsSendTo) {
    window.gtag?.("event", "conversion", {
      send_to: googleAdsSendTo,
    });
  }

  window.fbq?.("track", "Lead", {
    content_name: projectType,
    budget_range: budget,
  });
}

export function trackMarketingContact(location: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "whatsapp_click", {
    location,
  });

  const googleAdsSendTo =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO?.trim();
  if (googleAdsSendTo) {
    window.gtag?.("event", "conversion", {
      send_to: googleAdsSendTo,
    });
  }

  window.fbq?.("track", "Contact", {
    content_name: "WhatsApp",
    location,
  });
}

export function trackMarketingProjectView(project: string, status: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "project_view", {
    project,
    status,
  });

  window.fbq?.("track", "ViewContent", {
    content_name: project,
    content_category: "Architecture Project",
    status,
  });
}
