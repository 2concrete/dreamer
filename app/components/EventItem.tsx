import { useContext, useState } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { IoIosClose } from "react-icons/io";
import { motion } from "motion/react";

type EventItemProps = {
  dreamId: number;
  event: {
    id: number;
    text: string;
  };
};

export const EventItem = ({ dreamId, event }: EventItemProps) => {
  const Context = useContext(DreamContext);
  const [isHovered, setIsHovered] = useState(false);

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
            onClick={() => Context?.deleteEvent(dreamId, event.id)}
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
