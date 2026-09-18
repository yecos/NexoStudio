import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const assets = [
  {
    parts: [
      "src/assets-encoded/hero/part-00.b64",
      "src/assets-encoded/hero/part-01.b64",
      "src/assets-encoded/hero/part-02.b64",
      "src/assets-encoded/hero/part-03.b64",
      "src/assets-encoded/hero/part-04.b64",
      "src/assets-encoded/hero/part-05.b64",
    ],
    output: "public/images/hero/hero-nexo-premium.webp",
  },
  {
    parts: [
      "src/assets-encoded/contact/part-00.b64",
      "src/assets-encoded/contact/part-01.b64",
      "src/assets-encoded/contact/part-02.b64",
      "src/assets-encoded/contact/part-03.b64",
    ],
    output: "public/images/services/contact-nexo-premium.webp",
  },
];

for (const asset of assets) {
  const base64 = (
    await Promise.all(asset.parts.map((part) => readFile(resolve(part), "utf8")))
  ).join("");

  if (!base64.startsWith("UklG")) {
    throw new Error(`Invalid WebP payload for ${asset.output}`);
  }

  const bytes = Buffer.from(base64, "base64");
  if (bytes.length < 10_000) {
    throw new Error(`Unexpectedly small image payload for ${asset.output}`);
  }

  const output = resolve(asset.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, bytes);
}
