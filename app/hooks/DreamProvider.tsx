"use client";

import { useEffect, useState, type ReactNode } from "react";

import { DreamContext } from "./DreamContext";

type Dream = {
  title: string;
  snippets: string[];
  summary: string;
  uuid: number;
  editing: boolean;
  showEvents: boolean;
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
      showEvents: false,
    };

    setDreams([newDream, ...dreams]);
  };

  const deleteDream = (uuid: number) =>
    setDreams(dreams.filter((dream) => dream.uuid !== uuid));

  const toggleEditing = (uuid: number, mode: boolean) => {
    setDreams(
      dreams.map((dream) =>
        dream.uuid === uuid ? { ...dream, editing: mode } : dream,
      ),
    );
  };

  const changeTitle = (uuid: number, newTitle: string) => {
    setDreams(
      dreams.map((dream) =>
        dream.uuid === uuid
          ? { ...dream, title: newTitle, editing: false }
          : dream,
      ),
    );
  };

  const toggleEvents = (uuid: number, mode: boolean) => {
    setDreams(
      dreams.map((dream) =>
        dream.uuid === uuid ? { ...dream, showEvents: mode } : dream,
      ),
    );
  };

  return (
    <DreamContext.Provider
      value={{
        dreams,
        addDream,
        deleteDream,
        toggleEditing,
        changeTitle,
        toggleEvents,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};
