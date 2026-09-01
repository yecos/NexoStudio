"use client";

import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/** Pin de marca (punto cobre con anillo). */
const locationPin = L.divIcon({
  className: "nexo-pin",
  html: `<span class="nexo-pin-dot"></span>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -16],
});

interface LocationMapInnerProps {
  lat: number;
  lng: number;
  name: string;
  location: string;
}

/** Mini-mapa con la ubicación exacta de un proyecto. */
export default function LocationMapInner({
  lat,
  lng,
  name,
  location,
}: LocationMapInnerProps) {
  const position = useMemo(() => [lat, lng] as [number, number], [lat, lng]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url={TILE_URL}
        attribution={ATTRIBUTION}
        subdomains={["a", "b", "c", "d"]}
        maxZoom={19}
      />
      <Marker position={position} icon={locationPin} alt={name}>
        <Popup>
          <div className="nexo-popup">
            <strong className="nexo-popup-name">{name}</strong>
            <span className="nexo-popup-loc">{location}</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
