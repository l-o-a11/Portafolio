/** Comprueba si el navegador puede crear un contexto WebGL. */
export function soportaWebGL(): boolean {
  try {
    const lienzo = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (lienzo.getContext("webgl2") || lienzo.getContext("webgl")),
    );
  } catch {
    return false;
  }
}
