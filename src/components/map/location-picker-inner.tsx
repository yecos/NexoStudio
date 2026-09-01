"use client";

import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

const pickerPin = L.divIcon({
  className: "nexo-pin",
  html: `<span class="nexo-pin-dot nexo-pin-dot-lg"></span>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

interface LocationPickerInnerProps {
  lat: number;
  lng: number;
  onPick: (lat: number, lng: number) => void;
}

/** Captura clics y movimientos del marcador en el mapa del formulario. */
function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(
        Math.round(e.latlng.lat * 100000) / 100000,
        Math.round(e.latlng.lng * 100000) / 100000,
      );
    },
  });
  return null;
}

/** Selector de ubicación del panel admin: clic para colocar/mover el pin. */
export default function LocationPickerInner({
  lat,
  lng,
  onPick,
}: LocationPickerInnerProps) {
  const position = useMemo(() => [lat, lng] as [number, number], [lat, lng]);

  return (
    <MapContainer
      center={position}
      zoom={position[0] === 0 && position[1] === 0 ? 8 : 13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url={TILE_URL}
        attribution={ATTRIBUTION}
        maxZoom={19}
      />
      <ClickHandler onPick={onPick} />
      <Marker
        position={position}
        icon={pickerPin}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const ll = (e.target as L.Marker).getLatLng();
            onPick(
              Math.round(ll.lat * 100000) / 100000,
              Math.round(ll.lng * 100000) / 100000,
            );
          },
        }}
      />
    </MapContainer>
  );
}
