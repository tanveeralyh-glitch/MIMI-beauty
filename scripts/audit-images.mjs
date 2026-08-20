import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { execSync } from "child_process";
import ignore from "ignore";

const root = process.cwd();
const srcDir = join(root, "src");
const publicDir = join(root, "public");
const re = /['"`(](\/[\w./-]+\.(?:png|jpg|jpeg|webp|gif|svg|ico|PNG|JPG|JPEG|WEBP))['"`)]/g;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css|js|mjs)$/.test(name)) out.push(p);
  }
  return out;
}

const refs = new Set();
for (const file of walk(srcDir)) {
  const text = readFileSync(file, "utf8");
  let m;
  while ((m = re.exec(text))) refs.add(m[1]);
}

const tracked = new Set(
  execSync("git ls-files public", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/)
    .filter(Boolean),
);
const ig = ignore().add(readFileSync(".vercelignore", "utf8"));

function listPublic(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) listPublic(p, acc);
    else acc.push(relative(publicDir, p).split("\\").join("/"));
  }
  return acc;
}
const onDisk = listPublic(publicDir);
const onDiskLower = new Map(onDisk.map((p) => [p.toLowerCase(), p]));

const missingDisk = [];
const missingGit = [];
const vercelIgnored = [];
const caseMismatch = [];

for (const ref of [...refs].sort()) {
  const rel = ref.replace(/^\//, "");
  const disk = join(publicDir, rel);
  const gitPath = "public/" + rel.split("\\").join("/");
  if (!existsSync(disk)) {
    const alt = onDiskLower.get(rel.toLowerCase());
    if (alt) caseMismatch.push({ ref, actual: alt });
    else missingDisk.push(ref);
  }
  if (!tracked.has(gitPath)) missingGit.push(gitPath);
  if (ig.ignores(gitPath)) vercelIgnored.push(gitPath);
}

console.log("Referenced public assets:", refs.size);
console.log("MISSING ON DISK:", missingDisk.length ? missingDisk.join("\n") : "none");
console.log("CASE MISMATCH:", caseMismatch.length ? JSON.stringify(caseMismatch, null, 2) : "none");
console.log("MISSING FROM GIT:", missingGit.length ? missingGit.join("\n") : "none");
console.log("VERCEL IGNORED USED FILES:", vercelIgnored.length ? vercelIgnored.join("\n") : "none");
console.log("ALL REFS:\n" + [...refs].sort().join("\n"));
