"use client";

import dynamic from "next/dynamic";

/** Selector de ubicación: solo cliente (Leaflet necesita window). */
const LocationPickerInner = dynamic(() => import("./location-picker-inner"), {
  ssr: false,
  loading: () => (
    <div className="h-56 w-full rounded-lg bg-dark-800/55 animate-pulse" />
  ),
});

interface LocationPickerProps {
  lat: number;
  lng: number;
  onPick: (lat: number, lng: number) => void;
}

export function LocationPicker(props: LocationPickerProps) {
  return (
    <div className="map-shell h-56 w-full rounded-lg overflow-hidden border border-white/10 cursor-crosshair">
      <LocationPickerInner {...props} />
    </div>
  );
}
