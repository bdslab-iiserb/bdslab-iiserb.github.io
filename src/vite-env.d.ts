/// <reference types="vite/client" />

// Add support for importing images
declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}