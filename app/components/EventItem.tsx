import { useContext, useState } from "react";
import { DreamContext } from "../hooks/DreamContext";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
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
    <motion.div
      layout
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex w-fit relative h-6"
    >
      <span className="cursor-default">{event.text}</span>
      {isHovered && (
        <div className="flex relative -right-1 top-0.5">
          <motion.button
            onClick={() => Context?.moveEvent(dreamId, event.id, false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer top-[1px] w-4"
          >
            <IoIosArrowDown size={20} />
          </motion.button>
          <motion.button
            onClick={() => Context?.moveEvent(dreamId, event.id, true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer top-[1px]"
          >
            <IoIosArrowUp size={20} />
          </motion.button>
          <motion.button
            onClick={() => Context?.deleteEvent(dreamId, event.id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer top-[1px] w-6"
          >
            <IoIosClose size={25} />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
