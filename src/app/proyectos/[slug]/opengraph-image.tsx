import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getProjectBySlug } from "@/data/projects";

export const alt = "Proyecto de Nexo Studio — arquitectura en Medellín";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

/**
 * OG image dinámica por proyecto (1200x630): foto principal de fondo,
 * overlay oscuro y datos del proyecto + branding.
 */
export default async function ProjectOgImage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const [regular, bold] = await Promise.all([
    readFile(
      path.join(process.cwd(), "src/assets/fonts/LiberationSans-Regular.ttf"),
    ),
    readFile(
      path.join(process.cwd(), "src/assets/fonts/LiberationSans-Bold.ttf"),
    ),
  ]);

  // Fondo: primera vista del proyecto; si no existe, gradiente de marca.
  const background: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(135deg, #0a0a0a 0%, #16120e 60%, #1d1712 100%)",
  };
  let coverImg: string | null = null;
  if (project?.views[0]) {
    try {
      const photo = await readFile(
        path.join(process.cwd(), "public", project.views[0].src),
      );
      coverImg = `data:image/jpeg;base64,${photo.toString("base64")}`;
    } catch {
      // La imagen de fallback ya cubre este caso.
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          ...background,
          fontFamily: "Liberation Sans",
        }}
      >
        {coverImg && (
          <img
            src={coverImg}
            width={1200}
            height={630}
            alt=""
            style={{
              objectFit: "cover",
              position: "absolute",
              inset: 0,
            }}
          />
        )}

        {/* Overlay para legibilidad (reforzado en la base) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(180deg, rgba(10,10,10,0.62) 0%, rgba(10,10,10,0.18) 34%, rgba(10,10,10,0.78) 58%, rgba(10,10,10,0.96) 100%)",
            display: "flex",
          }}
        />

        {/* Marca superior */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 64,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              backgroundColor: "#c8956c",
              color: "#0a0a0a",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4,
              padding: "8px 18px",
              borderRadius: 6,
              lineHeight: 1,
              display: "flex",
            }}
          >
            NEXO STUDIO
          </div>
        </div>

        {/* Datos del proyecto en panel semi-sólido (legibilidad sobre cualquier foto) */}
        {project && (
          <div
            style={{
              position: "absolute",
              left: 64,
              right: 64,
              bottom: 56,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              backgroundColor: "rgba(10,10,10,0.72)",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "rgba(200,149,108,0.35)",
              padding: "30px 36px",
            }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#c8956c",
                  color: "#0a0a0a",
                  fontSize: 21,
                  fontWeight: 700,
                  padding: "7px 18px",
                  borderRadius: 9999,
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {project.category}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 21,
                  fontWeight: 400,
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {project.year}
              </div>
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 54,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: -0.5,
                maxWidth: 1000,
                display: "flex",
              }}
            >
              {project.name}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 25,
                lineHeight: 1.3,
                display: "flex",
              }}
            >
              {project.location}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 6,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 3,
                  backgroundColor: "#c8956c",
                  borderRadius: 2,
                  display: "flex",
                }}
              />
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 20,
                  letterSpacing: 1,
                  display: "flex",
                }}
              >
                www.nexostudioarq.com
              </div>
            </div>
          </div>
        )}
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
