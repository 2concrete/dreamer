import { useState } from "react";
import { useContext } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { AnimatePresence, motion } from "motion/react";
import { EventItem } from "./EventItem";
import { IoIosCheckmark } from "react-icons/io";

type DreamProps = {
  dream: {
    title: string;
    id: number;
    editing: boolean;
    showEvents: boolean;
    events: { id: number; text: string }[];
  };
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
        {dream.events.map((event) => (
          <EventItem key={event.id} dreamId={dream.id} event={event} />
        ))}

        <motion.form
          layout
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
              className="absolute -left-7 -top-0.75 cursor-pointer"
            >
              <IoIosCheckmark size={30} />
            </motion.button>
          )}
          <motion.input
            layout
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
