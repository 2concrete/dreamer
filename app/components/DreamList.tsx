"use client";

import { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";
import Dream from "./Dream";
import { AnimatePresence } from "motion/react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DreamList = () => {
  const isSignedIn = useUser().isSignedIn;
  const Context = useContext(DreamContext);
  const dreamsDb = useQuery(api.dreams.getDreams);
  const dreamsLocal = Context?.dreams;
  const dreams = isSignedIn ? dreamsDb : dreamsLocal;

  return (
    <div className="flex flex-col gap-2 mt-4 relative">
      <AnimatePresence mode="sync">
        {dreams?.map((dream) => {
          const key = "_id" in dream ? dream._id : dream.id;

          return <Dream key={key} dream={dream} />;
        })}
      </AnimatePresence>
    </div>
  );
};

export default DreamList;
