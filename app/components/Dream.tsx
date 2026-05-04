import { useContext, useState } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { motion, AnimatePresence } from "motion/react";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { DreamEvents } from "./EventList";
import { Id } from "@/convex/_generated/dataModel";

type DreamProps = {
  dream: {
    title: string;
    _id?: Id<"dreams">;
    id?: number;
    _creationTime?: number;
    editing: boolean;
    showEvents: boolean;
    events: { id: number; text: string }[];
  };
};

const Dream = ({ dream }: DreamProps) => {
  const Context = useContext(DreamContext);
  const [titleInput, setTitleInput] = useState(dream.title);
  // Use _id if available (from Convex), otherwise use id (local)
  const dreamId = dream._id ?? dream.id;

  const handleDeleteDream = () => {
    if (dreamId) {
      Context?.deleteDream(dreamId);
    }
  };

  const handleToggleEditing = () => {
    if (dreamId) {
      Context?.toggleEditing(dreamId, !dream.editing);
    }
  };

  const handleToggleEvents = () => {
    if (dreamId) {
      Context?.toggleEvents(dreamId, !dream.showEvents);
    }
  };

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dreamId || !titleInput.trim()) {
      return;
    }
    Context?.changeTitle(dreamId, titleInput);
    setTitleInput(dream.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-col flex"
    >
      <div className="flex gap-2 justify-between w-full h-6">
        <div className="flex gap-1 h-6">
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
                className="absolute -left-7 -top-0.75 cursor-pointer"
              >
                <IoIosCheckmark size={30} />
              </motion.button>
              <input
                className="outline-none max-w-full"
                placeholder="title"
                value={titleInput}
                onChange={handleTitleChange}
                onBlur={() => {
                  if (!dreamId) return;
                  if (titleInput.trim() && titleInput !== dream.title) {
                    Context?.changeTitle(dreamId, titleInput);
                  } else {
                    setTitleInput(dream.title);
                  }
                }}
                autoFocus
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
              onClick={handleToggleEvents}
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
            onClick={handleDeleteDream}
          >
            delete
          </motion.button>
          <motion.button
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.4 }}
            className={`float-right cursor-pointer ${dream.editing && "underline underline-offset-4"}`}
            onClick={handleToggleEditing}
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
