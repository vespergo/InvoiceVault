export type ImageFile = {
  name: string;
  size: number; // Can be used to limit upload size
  type: string; // e.g 'image/png'
  lastModified: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
};
