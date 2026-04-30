"use client";

import { createContext } from "react";
import { Id } from "@/convex/_generated/dataModel";

type Event = {
  id: number;
  text: string;
};

type Dream = {
  title: string;
  _id?: Id<"dreams">;
  id?: number;
  _creationTime?: number;
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
  reorderEvents: (id: number, newEvents: Event[]) => void;
};

export const DreamContext = createContext<ContextType | null>(null);
