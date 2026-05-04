"use client";

import { useContext, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { DreamContext } from "../hooks/DreamContext";

type Dream = {
  title: string;
  editing: boolean;
  showEvents: boolean;
  events: { id: number; text: string }[];
};

const stripDreamMetadata = (dreams: Dream[]) =>
  dreams.map(({ title, editing, showEvents, events }) => ({
    title,
    editing,
    showEvents,
    events,
  }));

const DreamSync = () => {
  const context = useContext(DreamContext);
  const { isLoaded: isAuthLoaded, isSignedIn } = useUser();
  const convexDreams = useQuery(api.dreams.getDreams);
  const saveDreams = useMutation(api.dreams.saveDreams);
  const lastSnapshot = useRef("");
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (!context?.isLoaded || !isAuthLoaded || !isSignedIn) {
      return;
    }

    if (
      !hasBootstrapped.current &&
      context.dreams.length === 0 &&
      convexDreams &&
      convexDreams.length > 0
    ) {
      hasBootstrapped.current = true;
      context.replaceDreams(
        convexDreams.map(({ title, editing, showEvents, events }) => ({
          title,
          editing,
          showEvents,
          events,
        })),
      );
      return;
    }

    hasBootstrapped.current = true;

    const snapshot = JSON.stringify(stripDreamMetadata(context.dreams));
    if (snapshot === lastSnapshot.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      lastSnapshot.current = snapshot;
      saveDreams({ dreams: stripDreamMetadata(context.dreams) });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [context, convexDreams, isAuthLoaded, isSignedIn, saveDreams]);

  return null;
};

export default DreamSync;
