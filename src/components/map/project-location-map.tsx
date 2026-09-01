"use client";

import dynamic from "next/dynamic";

/** Mini-mapa de ubicación: solo cliente (Leaflet necesita window). */
const LocationMapInner = dynamic(() => import("./location-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="h-64 sm:h-72 w-full rounded-xl bg-dark-800/55 animate-pulse" />
  ),
});

interface ProjectLocationMapProps {
  lat: number;
  lng: number;
  name: string;
  location: string;
}

export function ProjectLocationMap(props: ProjectLocationMapProps) {
  return (
    <div className="map-shell h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-white/8">
      <LocationMapInner {...props} />
    </div>
  );
}
