import { useContext, useState } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { motion } from "motion/react";

type DreamProps = {
  dream: {
    title: string;
    snippets: string[];
    summary: string;
    uuid: number;
    editing: boolean;
  };
};

const Dream = ({ dream }: DreamProps) => {
  const [newTitle, setNewTitle] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  const Context = useContext(DreamContext);

  if (!dream.title) Context?.toggleEditing(dream.uuid, true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between"
    >
      <div>
        {dream.editing ? (
          <input
            className="outline-none"
            placeholder="title"
            value={newTitle}
            onChange={() => handleChange}
          />
        ) : (
          <span>{dream.title}</span>
        )}
      </div>
      <div className="flex gap-2">
        <motion.button
          animate={{ opacity: 1 }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.4 }}
          className="float-right cursor-pointer"
          onClick={() => Context?.deleteDream(dream.uuid)}
        >
          delete
        </motion.button>
        <motion.button
          animate={{ opacity: 1 }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.4 }}
          className="float-right cursor-pointer"
          onClick={() => Context?.toggleEditing(dream.uuid, !dream.editing)}
        >
          edit
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dream;
