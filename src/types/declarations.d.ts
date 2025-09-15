declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_MAP_API_KEY: string;
  readonly VITE_GOOGLE_MAP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
