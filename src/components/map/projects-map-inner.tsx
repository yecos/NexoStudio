"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import type { Project } from "@/data/projects";

/** Tiles estándar de OpenStreetMap (gratuitos, sin API key); se oscurecen vía CSS. */
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

/** Pin circular con la foto del proyecto y borde de marca. */
function photoPin(src: string) {
  return L.divIcon({
    className: "nexo-pin",
    html: `<span class="nexo-pin-ring"><img src="${src}" alt="" loading="lazy" /></span>`,
    iconSize: [52, 52],
    iconAnchor: [26, 26],
    popupAnchor: [0, -30],
  });
}

/** Ajusta el encuadre a todos los marcadores. */
function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 12);
      return;
    }
    map.fitBounds(L.latLngBounds(points).pad(0.25));
  }, [map, points]);
  return null;
}

interface ProjectsMapInnerProps {
  projects: Project[];
  className?: string;
}

/** Mapa interactivo con todos los proyectos del portafolio. */
export default function ProjectsMapInner({
  projects,
  className = "",
}: ProjectsMapInnerProps) {
  const points = useMemo(
    () => projects.map((p) => [p.lat, p.lng] as [number, number]),
    [projects],
  );

  return (
    <MapContainer
      center={[6.34, -75.53]}
      zoom={9}
      scrollWheelZoom={false}
      className={`h-full w-full ${className}`}
      attributionControl
    >
      <TileLayer
        url={TILE_URL}
        attribution={ATTRIBUTION}
        maxZoom={19}
      />
      <FitBounds points={points} />
      {projects.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={photoPin(p.views[0]?.src ?? "")}
          alt={p.name}
        >
          <Popup>
            <div className="nexo-popup">
              <span className="nexo-popup-category">{p.category}</span>
              <strong className="nexo-popup-name">{p.name}</strong>
              <span className="nexo-popup-loc">{p.location}</span>
              <Link
                href={`/proyectos/${p.slug}`}
                className="nexo-popup-link"
              >
                Ver proyecto
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
