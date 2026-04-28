"use client";

import { motion } from "motion/react";
import { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";

const NewDream = () => {
  const Context = useContext(DreamContext);

  const handleClick = () => {
    if (Context?.dreams?.some((dream) => dream.title.trim() === "")) {
      return;
    }
    Context?.addDream();
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ opacity: 0.7 }}
      transition={{ duration: 0.4 }}
      className="cursor-pointer font-extralight"
    >
      new dream
    </motion.button>
  );
};

export default NewDream;
