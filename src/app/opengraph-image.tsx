import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt =
  "Nexo Studio — Arquitectura, remodelaciones e interiores en Medellín, Colombia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image dinámica de la home (1200x630).
 * Se genera en build con Satori; fuentes TTF versionadas en src/assets/fonts.
 */
export default async function OpengraphImage() {
  const [logo, hero, regular, bold] = await Promise.all([
    readFile(
      path.join(process.cwd(), "public/images/brand/logo-nexo-symbol.png"),
    ),
    readFile(path.join(process.cwd(), "public/images/hero/hero-arch.jpg")),
    readFile(
      path.join(process.cwd(), "src/assets/fonts/LiberationSans-Regular.ttf"),
    ),
    readFile(
      path.join(process.cwd(), "src/assets/fonts/LiberationSans-Bold.ttf"),
    ),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          backgroundColor: "#0a0a0a",
          fontFamily: "Liberation Sans",
        }}
      >
        {/* Foto de fondo con textura arquitectónica */}
        <img
          src={heroSrc}
          width={1200}
          height={630}
          alt=""
          style={{
            objectFit: "cover",
            position: "absolute",
            inset: 0,
          }}
        />

        {/* Overlay para legibilidad sobre la foto */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(115deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.86) 45%, rgba(10,10,10,0.62) 100%)",
            display: "flex",
          }}
        />
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img
            src={logoSrc}
            width={96}
            height={78}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: 10,
                lineHeight: 1,
              }}
            >
              NEXO STUDIO
            </div>
            <div
              style={{
                color: "#c8956c",
                fontSize: 20,
                letterSpacing: 4,
                lineHeight: 1,
              }}
            >
              ARQUITECTURA &amp; DISEÑO
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 96,
              height: 4,
              backgroundColor: "#c8956c",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              color: "#ffffff",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.25,
              maxWidth: 900,
            }}
          >
            Arquitectura, remodelaciones
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.25,
              maxWidth: 900,
            }}
          >
            e interiores
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 24,
              lineHeight: 1.4,
              maxWidth: 860,
            }}
          >
            Visualización 3D y gerencia de proyectos para espacios
            residenciales y comerciales.
          </div>
        </div>

        {/* Pie */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "rgba(255,255,255,0.85)",
              fontSize: 22,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                backgroundColor: "#c8956c",
                display: "flex",
              }}
            />
            Medellín, Colombia
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            www.nexostudioarq.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Liberation Sans",
          data: regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Liberation Sans",
          data: bold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
