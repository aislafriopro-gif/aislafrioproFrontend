"use client";

import Image from "next/image";
import {
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  quoteRequestSchema,
  type QuoteRequestFormValues,
} from "@/schemas/quote-request.schema";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";

const QUOTE_STEPS = [
  { id: 1, label: "Datos" },
  { id: 2, label: "Materiales" },
] as const;

const PREVIEW_IMAGES = [
  {
    id: "front",
    label: "Vista frontal",
    src: "/images/cotizador/cot1.png",
  },
  {
    id: "left",
    label: "Costado izquierdo",
    src: "/images/cotizador/cot2.png",
  },
  {
    id: "right",
    label: "Costado derecho",
    src: "/images/cotizador/cot3.png",
  },
] as const;

const MATERIAL_OPTIONS = [
  {
    id: "pvc-standard",
    label: "PVC estándar",
    icon: "/icons/services/industrial-curtains.svg",
  },
  {
    id: "thermal",
    label: "Material térmico",
    icon: "/icons/services/thermal-insulation.svg",
  },
  {
    id: "special",
    label: "Material especial",
    icon: "/icons/services/project-consulting.svg",
  },
] as const;

type QuoteStepId = (typeof QUOTE_STEPS)[number]["id"];
type PreviewImageId = (typeof PREVIEW_IMAGES)[number]["id"];

type QuoteRequestErrors = Partial<
  Record<keyof QuoteRequestFormValues, string>
>;

const DARK_FIELD_CLASSES =
  "!border-gray-500 !bg-gray-700 !text-white placeholder:!text-gray-300 hover:!border-gray-400 focus:!border-accent focus:!ring-accent/20";

export function QuoteRequestForm() {
  const [currentStep, setCurrentStep] = useState<QuoteStepId>(1);
  const [selectedPreviewId, setSelectedPreviewId] =
    useState<PreviewImageId>(PREVIEW_IMAGES[0].id);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [errors, setErrors] = useState<QuoteRequestErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  const selectedPreview =
    PREVIEW_IMAGES.find((image) => image.id === selectedPreviewId) ??
    PREVIEW_IMAGES[0];

  function validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const materialDetails = String(
      formData.get("materials") ?? "",
    ).trim();

    const result = quoteRequestSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      description: formData.get("description"),
      materials: [selectedMaterial, materialDetails]
        .filter(Boolean)
        .join(" — "),
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        description: fieldErrors.description?.[0],
        materials: fieldErrors.materials?.[0],
      });

      setStatusMessage("Revisa los campos indicados antes de continuar.");
      return false;
    }

    setErrors({});
    return true;
  }

  function handleNext(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;

    if (!form || !validateForm(form)) {
      return;
    }

    setStatusMessage("");
    setCurrentStep(2);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm(event.currentTarget)) {
      return;
    }

    setStatusMessage(
      "Los datos son válidos. El envío estará disponible cuando se integre el Backend.",
    );
  }

  return (
    <Card variant="dark" className="overflow-hidden !p-0">
      <div className="grid desktop:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[28rem] overflow-hidden desktop:min-h-full">
          <Image
            src={selectedPreview.src}
            alt={selectedPreview.label}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gray-900/30" />

          <p className="absolute left-md top-md rounded-md bg-gray-900/80 px-md py-sm text-small font-semibold text-white">
            Vista previa del producto
          </p>

          <div className="absolute bottom-md left-md rounded-lg bg-gray-900/80 p-sm">
            <p className="mb-sm text-small font-medium text-white">
              Cambiar de vista
            </p>

            <div className="flex gap-sm">
              {PREVIEW_IMAGES.map((image) => {
                const isSelected = image.id === selectedPreviewId;

                return (
                  <button
                    key={image.id}
                    type="button"
                    aria-label={image.label}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedPreviewId(image.id)}
                    className={`relative size-12 overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isSelected
                        ? "border-accent"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-lg tablet:p-xl">
          <p className="text-small font-semibold uppercase tracking-wide text-accent">
            Solicitud inicial
          </p>

          <h2
            id="quote-request-form-title"
            className="mt-sm text-h4 font-semibold text-white tablet:text-h3"
          >
            Cotizador
          </h2>

          <nav
            aria-label="Pasos del cotizador"
            className="mt-lg"
          >
            <ol className="flex items-start">
              {QUOTE_STEPS.map((step, index) => {
                const isActive = step.id === currentStep;
                const isAvailable = step.id <= currentStep;

                return (
                  <li
                    key={step.id}
                    className={`flex items-start ${
                      index < QUOTE_STEPS.length - 1 ? "flex-1" : ""
                    }`}
                  >
                    <button
                      type="button"
                      aria-current={isActive ? "step" : undefined}
                      disabled={!isAvailable}
                      onClick={() => {
                        if (step.id < currentStep) {
                          setCurrentStep(step.id);
                          setStatusMessage("");
                        }
                      }}
                      className="flex min-w-16 flex-col items-center gap-xs disabled:cursor-not-allowed"
                    >
                      <span
                        className={`flex size-10 items-center justify-center rounded-full text-body font-semibold transition-colors ${
                          isAvailable
                            ? "bg-accent text-gray-900"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {step.id}
                      </span>

                      <span
                        className={
                          isActive
                            ? "text-small font-medium text-accent"
                            : "text-small text-gray-300"
                        }
                      >
                        {step.label}
                      </span>
                    </button>

                    {index < QUOTE_STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`mt-lg h-px flex-1 ${
                          currentStep > step.id
                            ? "bg-accent"
                            : "bg-gray-700"
                        }`}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <form
            noValidate
            aria-labelledby="quote-request-form-title"
            aria-describedby="quote-request-form-status"
            onSubmit={handleSubmit}
            className="mt-lg"
          >
            <fieldset
              className={currentStep === 1 ? "block" : "hidden"}
            >
              <legend className="sr-only">
                Datos del proyecto
              </legend>

              <div className="flex flex-col gap-md rounded-lg border border-gray-500 bg-gray-900 p-md [&_label]:!text-white tablet:p-lg">
                <div className="grid gap-md tablet:grid-cols-2">
                  <Input
                    id="quote-name"
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    error={errors.name}
                    className={DARK_FIELD_CLASSES}
                    required
                  />

                  <Input
                    id="quote-email"
                    label="Correo"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    error={errors.email}
                    className={DARK_FIELD_CLASSES}
                    required
                  />
                </div>

                <Input
                  id="quote-phone"
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Número de contacto"
                  error={errors.phone}
                  className={DARK_FIELD_CLASSES}
                  required
                />

                <Textarea
                  id="quote-description"
                  label="Descripción del proyecto"
                  name="description"
                  rows={4}
                  placeholder="Describe brevemente lo que necesitas"
                  error={errors.description}
                  className={DARK_FIELD_CLASSES}
                  required
                />

                <Button
                  type="button"
                  variant="primary"
                  animated
                  className="w-full"
                  onClick={handleNext}
                >
                  Continuar →
                </Button>
              </div>
            </fieldset>

            <fieldset
              className={currentStep === 2 ? "block" : "hidden"}
            >
              <legend className="sr-only">
                Selección de materiales
              </legend>

              <div className="flex flex-col gap-md rounded-lg border border-gray-500 bg-gray-900 p-md [&_label]:!text-white tablet:p-lg">
                <div>
                  <h3 className="text-h6 font-semibold text-white">
                    Selecciona un material
                  </h3>

                  <p className="mt-xs text-small text-gray-300">
                    Opciones provisionales sujetas a validación.
                  </p>
                </div>

                <div className="grid gap-sm tablet:grid-cols-3">
                  {MATERIAL_OPTIONS.map((material) => {
                    const isSelected =
                      selectedMaterial === material.label;

                    return (
                      <button
                        key={material.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setSelectedMaterial(material.label)
                        }
                        className={`flex min-h-32 flex-col items-center justify-center gap-sm rounded-lg border-2 p-md text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          isSelected
                            ? "border-accent bg-accent/10 text-white"
                            : "border-gray-500 bg-gray-700 text-gray-100 hover:border-accent"
                        }`}
                      >
                        <Image
                          src={material.icon}
                          alt=""
                          width={48}
                          height={48}
                        />

                        <span className="text-small font-semibold">
                          {material.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <Textarea
                  id="quote-materials"
                  label="Materiales u observaciones técnicas"
                  name="materials"
                  rows={4}
                  placeholder="Describe los materiales o detalles técnicos"
                  error={errors.materials}
                  className={DARK_FIELD_CLASSES}
                />

                <div className="flex flex-col-reverse gap-sm tablet:flex-row tablet:justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setCurrentStep(1);
                      setStatusMessage("");
                    }}
                  >
                    ← Anterior
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    animated
                  >
                    Validar solicitud
                  </Button>
                </div>
              </div>
            </fieldset>

            <p
              id="quote-request-form-status"
              aria-live="polite"
              className="mt-md text-small text-gray-300"
            >
              {statusMessage ||
                "Completa los pasos del cotizador y valida tu informacion"}
            </p>
          </form>
        </div>
      </div>
    </Card>
  );
}
