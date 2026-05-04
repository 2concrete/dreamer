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
  isLoaded: boolean;
  addDream: () => void;
  deleteDream: (id: number | string) => void;
  toggleEditing: (id: number | string, mode: boolean) => void;
  changeTitle: (id: number | string, newTitle: string) => void;
  toggleEvents: (id: number | string, mode: boolean) => void;
  addEvent: (id: number | string, event: string) => void;
  deleteEvent: (id: number | string, eventId: number) => void;
  reorderEvents: (id: number | string, newEvents: Event[]) => void;
  replaceDreams: (dreams: Dream[]) => void;
};

export const DreamContext = createContext<ContextType | null>(null);
