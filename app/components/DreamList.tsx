"use client";

import { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";
import Dream from "./Dream";
import { AnimatePresence } from "motion/react";

const DreamList = () => {
  const Context = useContext(DreamContext);

  return (
    <div className="flex flex-col gap-2 mt-4 relative">
      <AnimatePresence mode="sync">
        {Context?.dreams.map((dream) => (
          <Dream key={dream.id} dream={dream} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DreamList;
