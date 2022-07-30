export const convertFileToBytes = async (file: File): Promise<Uint8Array> => {
  const imageArrayBuffer = await file.arrayBuffer();
  return new Uint8Array(imageArrayBuffer);
};
