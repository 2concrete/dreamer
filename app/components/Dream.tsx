import { useContext, useState, useEffect } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { motion, AnimatePresence } from "motion/react";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { DreamEvents } from "./DreamEvents";

type DreamProps = {
  dream: {
    title: string;
    snippets: string[];
    summary: string;
    uuid: number;
    editing: boolean;
    showEvents: boolean;
  };
};

const Dream = ({ dream }: DreamProps) => {
  const Context = useContext(DreamContext);

  const [newTitle, setNewTitle] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle) {
      Context?.changeTitle(dream.uuid, newTitle);
    }
  };

  useEffect(() => {
    if (!dream.title) {
      Context?.toggleEditing(dream.uuid, true);
    }
  }, [dream.uuid, dream.title]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-col flex"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          {dream.editing ? (
            <form className="relative" onSubmit={handleTitleSubmit}>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.4 }}
                type="submit"
                className="absolute -left-7 -top-[3px] cursor-pointer"
              >
                <IoIosCheckmark size={30} />
              </motion.button>
              <input
                className="outline-none w-100"
                placeholder="title"
                value={newTitle || dream.title}
                onChange={handleTitleChange}
              />
            </form>
          ) : (
            <span>{dream.title}</span>
          )}
          {!dream.editing && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.4 }}
              onClick={() =>
                Context?.toggleEvents(dream.uuid, !dream.showEvents)
              }
              className={`${dream.showEvents && "rotate-360"} rotate-270 transition-all`}
            >
              <IoChevronDown />
            </motion.button>
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
            className={`float-right cursor-pointer ${dream.editing && "underline underline-offset-4"}`}
            onClick={() =>
              dream.title && Context?.toggleEditing(dream.uuid, !dream.editing)
            }
          >
            edit
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {dream.showEvents && (
          <motion.div
            initial={{ opacity: 0, height: 0, x: 0 }}
            animate={{ opacity: 1, height: "auto", x: 10 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DreamEvents />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dream;
