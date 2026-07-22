export function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Página no encontrada</h2>
        <p className="text-sm text-neutral-500">Estamos trabajando en ello, pero la sección que buscas aún no está disponible o no existe.</p>
      </div>
    </main>
  );
}

export default NotFound;