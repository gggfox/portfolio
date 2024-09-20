declare module '*.glsl' {
  const content: string;
  export default content;
}

declare namespace JSX {
  interface IntrinsicElements {
    gradientMaterial: any; // You can replace 'any' with the actual type of gradientMaterial if known
  }
}
