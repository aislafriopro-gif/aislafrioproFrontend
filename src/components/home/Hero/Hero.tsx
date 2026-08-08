"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import Image from "next/image";


export interface IHeroAction {
  label: string;
  href: string;
}

export interface IHeroImage {
  src: string;
  alt: string;
}

export interface IHeroSlide {
  id: string;
  eyebrow: string;
  title: readonly [string, string, string];
  description: string;
  primaryAction: IHeroAction;
  secondaryAction?: IHeroAction;
  image?: IHeroImage;
}

export interface IHeroProps {
  slides: readonly IHeroSlide[];
  className?: string;
}

export function Hero({
  slides,
  className = "",
}: IHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) {
        return;
    }

    const intervalId = window.setInterval(() => {
        setCurrentIndex((current) =>
        current === slides.length - 1 ? 0 : current + 1
        );
    }, 6000);

    return () => window.clearInterval(intervalId);
    }, [slides.length]);


  const currentSlide = slides[currentIndex] ?? slides[0];

  if (!currentSlide) {
    return null;
  }

  function showPreviousSlide() {
    setCurrentIndex((current) =>
        current === 0 ? slides.length - 1 : current - 1
    );
    }

    function showNextSlide() {
    setCurrentIndex((current) =>
        current === slides.length - 1 ? 0 : current + 1
    );
    }

    function showSlide(index: number) {
    setCurrentIndex(index);
    }
  return (
    <Section
        aria-labelledby="hero-title"
        aria-roledescription="carrusel"
        aria-label="Contenido destacado"
        className={`relative flex min-h-[40rem] items-center overflow-hidden bg-gray-900 py-xl text-white tablet:min-h-[36rem] tablet:py-xxl ${className}`}
    >
        <div className="absolute inset-0 bg-gray-900/50">
            {slides.map((slide, index) => {
                if (!slide.image) {
                return null;
                }

                const isActive = index === currentIndex;

                return (
                <Image
                    key={slide.id}
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    loading="eager"
                    sizes="100vw"
                    aria-hidden={!isActive}
                    className={`object-cover object-center transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                    isActive ? "opacity-100" : "opacity-0"
                    }`}
                />
                );
            })}
        </div>
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900/50"
        />

        <Container className="relative z-10 w-full">
            <div
                aria-live="polite"
                className="relative min-h-[30rem] w-full tablet:min-h-[24rem]"
            >
                {slides.map((slide, index) => {
                const isActive = index === currentIndex;
                const isRightAligned = index % 2 === 1;

                return (
                    <div
                    key={slide.id}
                    role="group"
                    aria-label={`Diapositiva ${index + 1} de ${slides.length}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out motion-reduce:transition-none ${
                        isActive
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-md opacity-0"
                    }`}
                    >
                    <div
                        className={`flex w-full max-w-3xl flex-col gap-md ${
                        isRightAligned
                            ? "items-start text-left tablet:ml-auto tablet:items-end tablet:text-right"
                            : "items-start text-left"
                        }`}
                    >
                        <p className="text-small font-semibold uppercase tracking-wider text-accent">
                        {slide.eyebrow}
                        </p>

                        <h1
                        id={isActive ? "hero-title" : undefined}
                        className="break-words text-h3 font-semibold leading-tight tablet:text-h2 desktop:text-h1"
                        >
                        <span className="text-white">
                            {slide.title[0]}{" "}
                        </span>

                        <span className="text-accent">
                            {slide.title[1]}{" "}
                        </span>

                        <span className="text-white">
                            {slide.title[2]}
                        </span>
                        </h1>

                        <p className="max-w-2xl text-body leading-relaxed text-gray-200">
                        {slide.description}
                        </p>

                        <div className="flex w-full flex-col gap-sm tablet:w-auto tablet:flex-row">
                        <a
                            href={slide.primaryAction.href}
                            className="inline-flex items-center justify-center rounded-md bg-accent px-lg py-md font-medium text-gray-900 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-xs hover:bg-accent/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
                        >
                            {slide.primaryAction.label}
                        </a>

                        {slide.secondaryAction && (
                            <a
                            href={slide.secondaryAction.href}
                            className="inline-flex items-center justify-center rounded-md border border-white px-lg py-md font-medium text-white transition-[color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-xs hover:bg-white hover:text-gray-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
                            >
                            {slide.secondaryAction.label}
                            </a>
                        )}
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
        </Container>
        <button
            type="button"
            onClick={showPreviousSlide}
            aria-label="Mostrar diapositiva anterior"
            className="absolute left-xs top-1/2 z-20 hidden -translate-y-1/2 rounded-sm p-xs text-white/60 transition-[color,background-color,transform] duration-200 hover:scale-105 hover:bg-black/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 motion-reduce:transition-none tablet:left-md tablet:block desktop:left-lg"
            >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-xxl w-lg"
            >
                <path d="m15 18-6-6 6-6" />
            </svg>
            </button>

            <button
            type="button"
            onClick={showNextSlide}
            aria-label="Mostrar diapositiva siguiente"
            className="absolute right-xs top-1/2 z-20 hidden -translate-y-1/2 rounded-sm p-xs text-white/60 transition-[color,background-color,transform] duration-200 hover:scale-105 hover:bg-black/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 motion-reduce:transition-none tablet:right-md tablet:block desktop:right-lg"
            >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-xxl w-lg"
            >
                <path d="m9 18 6-6-6-6" />
            </svg>
            </button>
        <div
            aria-label="Seleccionar diapositiva"
            className="absolute bottom-md left-1/2 z-10 flex -translate-x-1/2 items-center gap-sm"
            >
            {slides.map((slide, index) => (
                <button
                key={slide.id}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={`Mostrar ${slide.title.join(" ")}`}
                aria-current={index === currentIndex ? "true" : undefined}
                className={`h-sm rounded-full transition-all duration-200 motion-reduce:transition-none ${
                    index === currentIndex
                    ? "w-xl bg-accent"
                    : "w-sm bg-white/50 hover:bg-white"
                }`}
                />
            ))}
        </div>
    </Section>
    );
}
