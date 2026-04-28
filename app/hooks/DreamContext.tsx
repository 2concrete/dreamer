"use client";

import { createContext } from "react";

type Event = {
  id: number;
  text: string;
};

type Dream = {
  title: string;
  summary: string;
  id: number;
  editing: boolean;
  showEvents: boolean;
  events: Event[];
};

type ContextType = {
  dreams: Dream[];
  addDream: () => void;
  deleteDream: (id: number) => void;
  toggleEditing: (id: number, mode: boolean) => void;
  changeTitle: (id: number, newTitle: string) => void;
  toggleEvents: (id: number, mode: boolean) => void;
  addEvent: (id: number, event: string) => void;
  deleteEvent: (id: number, eventId: number) => void;
  updateEventOrder: (
    dreamId: number,
    draggedIndex: number,
    dropIndex: number,
  ) => void;
};

export const DreamContext = createContext<ContextType | null>(null);
