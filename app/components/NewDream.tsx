"use client";

import { motion } from "motion/react";
import { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const NewDream = () => {
  const isSignedIn = useUser().isSignedIn;
  const Context = useContext(DreamContext);
  const dreamsDb = useQuery(api.dreams.getDreams);
  const dreamsLocal = Context?.dreams;
  const dreams = isSignedIn ? dreamsDb : dreamsLocal;
  const addDream = useMutation(api.dreams.addDream);

  const handleClick = () => {
    if (dreams?.some((dream) => dream.title.trim() === "")) {
      return;
    }

    if (isSignedIn) {
      addDream();
    } else {
      Context?.addDream();
    }
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
