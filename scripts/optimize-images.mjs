import { createRequire } from "module";
import { mkdir } from "fs/promises";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = process.cwd();
const outDir = path.join(root, "public", "products");

const jobs = [
  ["public/Dew.jpg", "dew.jpg"],
  ["public/Halo.jpg", "halo.jpg"],
  ["public/herbe.jpg", "herbe.jpg"],
  ["public/Veil.jpg", "veil.jpg"],
  ["public/Pearl.jpg", "pearl.jpg"],
  ["public/Amalfi.jpg", "amalfi.jpg"],
  ["public/Santorini.jpg", "santorini.jpg"],
  ["public/02_luna_glow_duo.PNG", "luna-glow.jpg"],
  ["public/03_root_to_radiance.PNG", "root-to-radiance.jpg"],
  ["public/04_radiant_you.PNG", "radiant-you.jpg"],
  ["public/05_complete_glow.PNG", "complete-glow.jpg"],
  ["public/06_halo_duo.PNG", "halo-duo.jpg"],
  ["public/07_halo_quartet.PNG", "halo-quartet.jpg"],
  ["public/08_everything_set.PNG", "everything-set.jpg"],
  ["public/01_hero_mimi_sets.jpg.png", "mimi-sets-hero.jpg"],
  ["public/mimis_edits_editorial.PNG", "mimis-edit.jpg"],
];

await mkdir(outDir, { recursive: true });

for (const [input, output] of jobs) {
  const src = path.join(root, input);
  const dest = path.join(outDir, output);
  try {
    await sharp(src)
      .rotate()
      .resize({ width: 1400, height: 1750, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(dest);
    console.log("ok", output);
  } catch (err) {
    console.error("fail", input, err.message);
    process.exitCode = 1;
  }
}
