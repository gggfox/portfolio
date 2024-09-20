export async function loadShader(path: string) {
  const response = await fetch(path);
  return await response.text();
}
