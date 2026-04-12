import DreamList from "./components/DreamList";
import NewDream from "./components/NewDream";

export default function Home() {
  return (
    <div className="mt-16 lg:w-lg md:w-lg sm:w-lg w-xs mx-auto min-h-screen bg-zinc-50 font-sans dark:bg-neutral-950">
      <span className="flex justify-between w-full">
        <span>dreamer</span>
        <NewDream />
      </span>
      <DreamList />
    </div>
  );
}
