/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
