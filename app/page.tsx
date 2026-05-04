"use client";

import DreamList from "./components/DreamList";
import DreamSync from "./components/DreamSync";
import { DreamProvider } from "./hooks/DreamProvider";
import NewDream from "./components/NewDream";
import { useUser } from "@clerk/nextjs";
import ConvexClientProvider from "./components/ConvexClientProvider";

export default function Home() {
  const { isLoaded } = useUser();

  return (
    <div className="lg:w-xl md:w-lg sm:w-lg w-auto px-4 mx-auto font-sans">
      <ConvexClientProvider>
        {isLoaded && (
          <DreamProvider>
            <DreamSync />
            <header className="mt-16">
              <span className="flex justify-between w-full">
                <span className="text-lg font-extralight">dreamer</span>
                <span className="flex gap-4">
                  <NewDream />
                </span>
              </span>
            </header>
            <DreamList />
          </DreamProvider>
        )}
      </ConvexClientProvider>
    </div>
  );
}
