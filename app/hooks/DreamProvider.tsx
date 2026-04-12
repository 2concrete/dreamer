"use client";

import { useEffect, useState, type ReactNode } from "react";

import { DreamContext } from "./DreamContext";

type Dream = {
  title: string;
  snippets: string[];
  summary: string;
  uuid: number;
  editing: boolean;
};

export const DreamProvider = ({ children }: { children: ReactNode }) => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dreams");
    if (saved) {
      Promise.resolve().then(() => setDreams(JSON.parse(saved)));
    }
    Promise.resolve().then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("dreams", JSON.stringify(dreams));
    }
  }, [dreams, isLoaded]);

  const addDream = () => {
    const newDream = {
      title: "",
      snippets: [],
      summary: "",
      uuid: Date.now(),
      editing: false,
    };

    setDreams([...dreams, newDream]);
  };

  const deleteDream = (uuid: number) =>
    setDreams(dreams.filter((dream) => dream.uuid !== uuid));

  const toggleEditing = (uuid: number, mode: boolean) =>
    dreams.map((dream) => {
      if (dream.uuid === uuid) {
        dream.editing = mode;
      }
    });

  return (
    <DreamContext.Provider
      value={{ dreams, addDream, deleteDream, toggleEditing }}
    >
      {children}
    </DreamContext.Provider>
  );
};
