import type { NextConfig } from "next";
import { execSync } from "child_process";

// Ensure node is findable by Turbopack's spawned PostCSS workers
// regardless of the shell PATH set by the process launcher.
const nodeBin = execSync("which node || echo /usr/local/bin/node").toString().trim();
const nodeDir = nodeBin.replace(/\/node$/, "");
if (!process.env.PATH?.includes(nodeDir)) {
  process.env.PATH = `${nodeDir}:${process.env.PATH ?? ""}`;
}

const nextConfig: NextConfig = {};

export default nextConfig;
