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
    <div className="w-fit">
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex-col flex w-fit"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <motion.button
            onClick={() => Context?.deleteEvent(dreamId, event.id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="absolute cursor-pointer -left-6"
          >
            <IoIosClose size={25} />
          </motion.button>
        )}

        <span className="cursor-default">{event.text}</span>
      </motion.div>
    </div>
  );
};
