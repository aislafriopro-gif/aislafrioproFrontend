import { Card } from "@/components/ui/Card/Card";

export default function Page() {
  return (
    <section aria-labelledby="users-content-title">
      <h2
        id="users-content-title"
        className="text-h4 font-semibold text-gray-900 tablet:text-h3"
      >
        Usuarios
      </h2>

      <Card className="mt-lg">
        <p className="text-body leading-relaxed text-gray-700">
          El acceso y las opciones disponibles en esta vista se definirán
          en base a permisos y roles.
        </p>
      </Card>
    </section>
  );
}