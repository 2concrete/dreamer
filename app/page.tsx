import DreamList from "./components/DreamList";
import NewDream from "./components/NewDream";

export default function Home() {
  return (
    <div className="lg:w-lg md:w-lg sm:w-lg w-xs mx-auto mt-16 font-sans">
      <span className="flex justify-between w-full">
        <span className="text-lg font-extralight">dreamer</span>
        <NewDream />
      </span>
      <DreamList />
    </div>
  );
}
