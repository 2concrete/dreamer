"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DreamContext } from "./DreamContext";

type Event = {
  id: number;
  text: string;
};

type Dream = {
  title: string;
  id?: number;
  editing: boolean;
  showEvents: boolean;
  events: Event[];
};

const storageKey = "dreams";

let nextLocalId = Date.now();

const createLocalId = () => {
  nextLocalId += 1;
  return nextLocalId;
};

const bumpLocalIdCounter = (dreams: Dream[]) => {
  for (const dream of dreams) {
    nextLocalId = Math.max(nextLocalId, dream.id ?? 0);
    for (const event of dream.events) {
      nextLocalId = Math.max(nextLocalId, event.id);
    }
  }
};

const normalizeDreams = (dreams: Dream[]) =>
  dreams.map((dream) => ({
    ...dream,
    id: dream.id ?? createLocalId(),
    events: dream.events.map((event) => ({
      ...event,
      id: event.id ?? createLocalId(),
    })),
  }));

const matchesDreamId = (dream: Dream, id: number | string): boolean =>
  dream.id === id || String(dream.id) === String(id);

export const DreamProvider = ({ children }: { children: ReactNode }) => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const loadTimer = window.setTimeout(() => {
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Dream[];
          const normalized = normalizeDreams(parsed);
          bumpLocalIdCounter(normalized);
          setDreams(normalized);
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(dreams));
    }
  }, [dreams, isLoaded]);

  const addDream = () => {
    const newDream = {
      title: "",
      id: createLocalId(),
      editing: true,
      showEvents: false,
      events: [],
    };

    setDreams((currentDreams) => [newDream, ...currentDreams]);
  };

  const deleteDream = (id: number | string) => {
    setDreams((currentDreams) =>
      currentDreams.filter((dream) => !matchesDreamId(dream, id)),
    );
  };

  const toggleEditing = (id: number | string, mode: boolean) => {
    setDreams((currentDreams) =>
      currentDreams.map((dream) =>
        matchesDreamId(dream, id) ? { ...dream, editing: mode } : dream,
      ),
    );
  };

  const changeTitle = (id: number | string, newTitle: string) => {
    setDreams((currentDreams) =>
      currentDreams.map((dream) =>
        matchesDreamId(dream, id)
          ? { ...dream, title: newTitle, editing: false }
          : dream,
      ),
    );
  };

  const toggleEvents = (id: number | string, mode: boolean) => {
    setDreams((currentDreams) =>
      currentDreams.map((dream) =>
        matchesDreamId(dream, id) ? { ...dream, showEvents: mode } : dream,
      ),
    );
  };

  const addEvent = (id: number | string, event: string) => {
    if (event.trim() === "") return;
    setDreams((currentDreams) =>
      currentDreams.map((dream) =>
        matchesDreamId(dream, id)
          ? {
              ...dream,
              events: [...dream.events, { id: createLocalId(), text: event }],
            }
          : dream,
      ),
    );
  };

  const deleteEvent = (id: number | string, eventId: number) => {
    setDreams((currentDreams) =>
      currentDreams.map((dream) =>
        matchesDreamId(dream, id)
          ? {
              ...dream,
              events: dream.events.filter((e) => e.id !== eventId),
            }
          : dream,
      ),
    );
  };

  const reorderEvents = (id: number | string, newEvents: Event[]) => {
    setDreams((currentDreams) =>
      currentDreams.map((dream) =>
        matchesDreamId(dream, id) ? { ...dream, events: newEvents } : dream,
      ),
    );
  };

  const replaceDreams = (newDreams: Dream[]) => {
    const normalizedDreams = normalizeDreams(newDreams);
    bumpLocalIdCounter(normalizedDreams);
    setDreams(normalizedDreams);
  };

  return (
    <DreamContext.Provider
      value={{
        dreams,
        isLoaded,
        addDream,
        deleteDream,
        toggleEditing,
        changeTitle,
        toggleEvents,
        addEvent,
        deleteEvent,
        reorderEvents,
        replaceDreams,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};
