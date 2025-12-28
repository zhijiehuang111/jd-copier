import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: "JD Copier",
  version: pkg.version,
  icons: {
    16: "jd-copier-icon.png",
    32: "jd-copier-icon.png",
    48: "jd-copier-icon.png",
    128: "jd-copier-icon.png",
  },
  action: {
    default_icon: {
      16: "jd-copier-icon.png",
      32: "jd-copier-icon.png",
      48: "jd-copier-icon.png",
      128: "jd-copier-icon.png",
    },
    default_popup: "src/popup/index.html",
  },
  permissions: ["contextMenus", "activeTab"],
  content_scripts: [
    {
      js: ["src/content/main.ts"],
      matches: ["https://*/*"],
    },
  ],
  background: {
    service_worker: "src/background/main.ts",
    type: "module",
  },
});
