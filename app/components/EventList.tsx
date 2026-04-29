import { useState } from "react";
import { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { AnimatePresence, motion, Reorder } from "motion/react";
import { EventItem } from "./EventItem";
import { IoIosCheckmark } from "react-icons/io";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
};

type DreamProps = {
  dream: {
    title: string;
    id: number;
    editing: boolean;
    showEvents: boolean;
    events: { id: number; text: string }[];
  };
};

export const getDelayTime = (eventCount: number) => {
  return containerVariants.visible.transition.staggerChildren * eventCount;
};

export const DreamEvents = ({ dream }: DreamProps) => {
  const Context = useContext(DreamContext);
  const [newEvent, setNewEvent] = useState<string>("");

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent(e.target.value);
  };

  const handleEventSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    Context?.addEvent(dream.id, newEvent);
    setNewEvent("");
  };

  return (
    <div className="relative text-neutral-300">
      <AnimatePresence mode="sync">
        <Reorder.Group
          key="events-list"
          values={dream.events}
          onReorder={(newEvents) => Context?.reorderEvents(dream.id, newEvents)}
          as="div"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {dream.events.map((event) => (
            <Reorder.Item
              key={event.id}
              value={event}
              as="div"
              variants={itemVariants}
            >
              <EventItem dreamId={dream.id} event={event} />
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
          }}
          onSubmit={handleEventSubmit}
          className="max-w-full relative"
        >
          {newEvent && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.4 }}
              type="submit"
              className="absolute -left-7 -top-0.25 cursor-pointer"
            >
              <IoIosCheckmark size={30} />
            </motion.button>
          )}
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: getDelayTime(dream.events.length),
              duration: 0.2,
            }}
            placeholder="add event"
            className="outline-none w-100 max-w-full"
            onChange={handleEventChange}
            value={newEvent}
          />
        </motion.form>
      </AnimatePresence>
    </div>
  );
};
