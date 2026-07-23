export function Loading() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Cargando contenido...</h2>
        <p className="text-sm text-neutral-500">Estamos trabajando en ello para mostrarte la información de esta sección muy pronto.</p>
      </div>
    </main>
  );
}

export default Loading;