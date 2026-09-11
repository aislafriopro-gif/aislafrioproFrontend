"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import { quoteRequestsService } from "@/services/quote-requests.service";

type NoteItem = string | { note?: string; content?: string; createdAt?: string; [key: string]: unknown };

interface QuoteRequestNotesProps {
  quoteId: string;
  notes: NoteItem[] | NoteItem | null | undefined;
  onNoteAdded: () => void;
}

export function QuoteRequestNotes({ quoteId, notes, onNoteAdded }: QuoteRequestNotesProps) {
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Normalizamos las notas de forma segura
  const notesList: NoteItem[] = Array.isArray(notes)
    ? notes
    : typeof notes === "string" && notes.trim() !== ""
    ? [notes]
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await quoteRequestsService.addNote({ id: quoteId, note: newNote.trim() });
      setNewNote("");
      onNoteAdded();
    } catch (err: unknown) {
      let message = "Ocurrió un error al guardar la nota.";
      if (err instanceof AxiosError && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Notas Internas</h2>

      {/* Lista de notas */}
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {notesList.length > 0 ? (
          notesList.map((item, index) => {
            const isObj = typeof item === "object" && item !== null;
            const noteText = typeof item === "string" 
              ? item 
              : isObj 
              ? item.note || item.content || JSON.stringify(item) 
              : "";
            
            const noteDate = isObj && item.createdAt ? new Date(item.createdAt).toLocaleString() : null;

            return (
              <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700 flex flex-col gap-1">
                <p>{noteText}</p>
                {noteDate && <span className="text-[10px] text-gray-400 self-end">{noteDate}</span>}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400 italic">No hay notas registradas todavía.</p>
        )}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe una nueva nota..."
          rows={2}
          className="rounded-md border border-gray-300 p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newNote.trim()}
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Agregando..." : "Agregar Nota"}
          </button>
        </div>
      </form>
    </div>
  );
}