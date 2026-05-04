"use client";

import { DreamContext } from "../hooks/DreamContext";
import Dream from "./Dream";
import { AnimatePresence } from "motion/react";
import { useContext } from "react";

const DreamList = () => {
  const Context = useContext(DreamContext);
  const dreams = Context?.dreams;

  return (
    <div className="flex flex-col gap-2 mt-4 relative">
      <AnimatePresence mode="sync">
        {dreams?.map((dream) => {
          return <Dream key={dream._id ?? dream.id} dream={dream} />;
        })}
      </AnimatePresence>
    </div>
  );
};

export default DreamList;
