"use client";

import { createContext } from "react";

type Dream = {
  title: string;
  snippets: string[];
  summary: string;
  uuid: number;
  editing: boolean;
  showEvents: boolean;
};

type ContextType = {
  dreams: Dream[];
  addDream: () => void;
  deleteDream: (uuid: number) => void;
  toggleEditing: (uuid: number, mode: boolean) => void;
  changeTitle: (uuid: number, newTitle: string) => void;
  toggleEvents: (uuid: number, mode: boolean) => void;
};

export const DreamContext = createContext<ContextType | null>(null);
