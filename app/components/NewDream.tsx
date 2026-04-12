"use client";

import { motion } from "motion/react";
import React, { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";

const NewDream = () => {
  const Context = useContext(DreamContext);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    Context?.addDream();
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.button
        type="submit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.4 }}
        className="cursor-pointer"
      >
        new dream
      </motion.button>
    </form>
  );
};

export default NewDream;
