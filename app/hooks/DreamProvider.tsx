"use client";

import { useEffect, useState, type ReactNode } from "react";

import { DreamContext } from "./DreamContext";

type Event = {
  id: number;
  text: string;
};

type Dream = {
  title: string;
  id: number;
  editing: boolean;
  showEvents: boolean;
  events: Event[];
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
      id: dreams.length,
      editing: true,
      showEvents: false,
      events: [],
    };

    setDreams([newDream, ...dreams]);
  };

  const deleteDream = (id: number) =>
    setDreams(dreams.filter((dream) => dream.id !== id));

  const toggleEditing = (id: number, mode: boolean) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === id ? { ...dream, editing: mode } : dream,
      ),
    );
  };

  const changeTitle = (id: number, newTitle: string) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === id ? { ...dream, title: newTitle, editing: false } : dream,
      ),
    );
  };

  const toggleEvents = (id: number, mode: boolean) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === id ? { ...dream, showEvents: mode } : dream,
      ),
    );
  };

  const addEvent = (id: number, event: string) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === id
          ? {
              ...dream,
              events: [...dream.events, { id: Date.now(), text: event }],
            }
          : dream,
      ),
    );
  };

  const deleteEvent = (id: number, eventId: number) =>
    setDreams(
      dreams.map((dream) =>
        dream.id === id
          ? {
              ...dream,
              events: dream.events.filter((e) => e.id !== eventId),
            }
          : dream,
      ),
    );

  const moveEvent = (id: number, eventId: number, moveUp: boolean) => {
    setDreams(
      dreams.map((dream) => {
        if (dream.id !== id) return dream;

        const events = [...dream.events];
        const idx = events.findIndex((e) => e.id === eventId);
        if (idx === -1) return dream;

        const newIndex = moveUp ? idx - 1 : idx + 1;
        if (newIndex < 0 || newIndex >= events.length) return dream;

        const [moved] = events.splice(idx, 1);
        events.splice(newIndex, 0, moved);

        return { ...dream, events };
      }),
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
        addEvent,
        deleteEvent,
        moveEvent,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};
