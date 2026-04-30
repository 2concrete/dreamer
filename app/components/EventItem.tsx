import { useContext, useState } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { IoIosClose } from "react-icons/io";
import { motion } from "motion/react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

type EventItemProps = {
  id?: number;
  _id?: Id<"dreams">;
  event: {
    id: number;
    text: string;
  };
  isDragging: React.ComponentState;
};

export const EventItem = ({ id, _id, event, isDragging }: EventItemProps) => {
  const isSignedIn = useUser().isSignedIn;
  const deleteEvent = useMutation(api.dreams.deleteEvent);
  const Context = useContext(DreamContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteEvent = () => {
    if (isSignedIn && _id) {
      deleteEvent({ dreamId: _id, eventId: event.id });
    } else if (id) {
      Context?.deleteEvent(id, event.id);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex w-fit relative h-6"
    >
      <span className="cursor-default hover:font-extralight transition-all duration-300">
        {event.text}
      </span>
      {isHovered && (
        <div className="flex relative top-0.5">
          <motion.button
            onClick={handleDeleteEvent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer top-px"
          >
            <IoIosClose size={25} />
          </motion.button>
        </div>
      )}
    </div>
  );
};
