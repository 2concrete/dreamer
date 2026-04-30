import { useState } from "react";
import { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { AnimatePresence, motion, Reorder } from "motion/react";
import { EventItem } from "./EventItem";
import { IoIosCheckmark } from "react-icons/io";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

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
    _id?: Id<"dreams">;
    id?: number;
    _creationTime?: number;
    editing: boolean;
    showEvents: boolean;
    events: { id: number; text: string }[];
  };
};

type Event = {
  id: number;
  text: string;
};

export const getDelayTime = (eventCount: number) => {
  return containerVariants.visible.transition.staggerChildren * eventCount;
};

export const DreamEvents = ({ dream }: DreamProps) => {
  const isSignedIn = useUser().isSignedIn;
  const addEvent = useMutation(api.dreams.addEvent);
  const reorderEvents = useMutation(api.dreams.reorderEvents);

  const Context = useContext(DreamContext);
  const [newEvent, setNewEvent] = useState<string>("");

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent(e.target.value);
  };

  const handleEventSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignedIn && dream._id) {
      addEvent({ id: dream._id, title: newEvent });
      setNewEvent("");
    } else if (dream.id) {
      Context?.addEvent(dream.id, newEvent);
      setNewEvent("");
    }
  };

  const handleReorderEvents = (newEvents: Event[]) => {
    if (isSignedIn && dream._id) {
      reorderEvents({ id: dream._id, newEvents: newEvents });
    } else if (dream.id) {
      Context?.reorderEvents(dream.id, newEvents);
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative text-neutral-300">
      <AnimatePresence mode="sync">
        <Reorder.Group
          key="events-list"
          values={dream.events}
          onReorder={(newEvents) => handleReorderEvents(newEvents)}
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
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
            >
              <EventItem
                _id={dream._id}
                id={dream.id}
                event={event}
                isDragging={isDragging}
              />
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
              className="absolute -left-7 -top-px cursor-pointer"
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
