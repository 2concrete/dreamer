"use client";

import { useEffect, useState, type ReactNode } from "react";

import { DreamContext } from "./DreamContext";

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
      summary: "",
      id: dreams.length,
      editing: false,
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

  const updateEventOrder = (
    dreamId: number,
    draggedIndex: number,
    dropIndex: number,
  ) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === dreamId
          ? {
              ...dream,
              events: (() => {
                const updated = [...dream.events];
                const [moved] = updated.splice(draggedIndex, 1);
                updated.splice(dropIndex, 0, moved);
                return updated;
              })(),
            }
          : dream,
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
        addEvent,
        deleteEvent,
        updateEventOrder,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};
