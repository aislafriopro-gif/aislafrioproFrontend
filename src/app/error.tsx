'use client';

export function Error() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Ha ocurrido un error</h2>
        <p className="text-sm text-neutral-500">Estamos trabajando en ello para solucionar este inconveniente muy pronto.</p>
      </div>
    </main>
  );
}

export default Error;
