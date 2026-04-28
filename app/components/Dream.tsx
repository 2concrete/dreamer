import { useContext, useState, useEffect } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { motion, AnimatePresence } from "motion/react";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { DreamEvents } from "./EventList";

type DreamProps = {
  dream: {
    title: string;
    id: number;
    editing: boolean;
    showEvents: boolean;
    events: { id: number; text: string }[];
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
      Context?.changeTitle(dream.id, newTitle);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-col flex"
    >
      <div className="flex gap-2 justify-between w-full">
        <div className="flex gap-1">
          {dream.editing ? (
            <form
              className="relative text-nowrap max-w-full"
              onSubmit={handleTitleSubmit}
            >
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
                className="outline-none max-w-full"
                placeholder="title"
                value={newTitle || dream.title}
                onChange={handleTitleChange}
              />
            </form>
          ) : (
            <span className="text-nowrap overflow-auto">{dream.title}</span>
          )}
          {!dream.editing && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.4 }}
              onClick={() => Context?.toggleEvents(dream.id, !dream.showEvents)}
              className={`${dream.showEvents && "rotate-360"} rotate-270 relative transition-transform top-0.5 cursor-pointer duration-300`}
            >
              <IoChevronDown />
            </motion.button>
          )}
        </div>
        <div className="flex gap-2 ml-1">
          <motion.button
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.4 }}
            className="float-right cursor-pointer"
            onClick={() => Context?.deleteDream(dream.id)}
          >
            delete
          </motion.button>
          <motion.button
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.4 }}
            className={`float-right cursor-pointer ${dream.editing && "underline underline-offset-4"}`}
            onClick={() =>
              dream.title && Context?.toggleEditing(dream.id, !dream.editing)
            }
          >
            edit
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="sync">
        {dream.showEvents && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative left-5"
          >
            <DreamEvents dream={dream} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dream;
