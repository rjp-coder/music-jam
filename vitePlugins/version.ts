import type { Plugin } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

export default function versionPlugin(): Plugin {
  // Generate one version for the entire build
  const version = new Date().toISOString();

  return {
    name: "version-plugin",

    config() {
      // Provide version to the client bundle
      return {
        define: {
          __BUILD_VERSION__: JSON.stringify(version),
        },
      };
    },

    writeBundle(options) {
      const filePath = resolve(options.dir ?? "dist", "version.json");
      mkdirSync(dirname(filePath), { recursive: true });

      writeFileSync(filePath, JSON.stringify({ version }, null, 2));

      console.log(`✨ Version written: ${version}`);
    },
  };
}
