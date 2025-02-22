/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FETCH_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
