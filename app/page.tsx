"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import DreamList from "./components/DreamList";
import { DreamProvider } from "./hooks/DreamProvider";
import NewDream from "./components/NewDream";
import { ConvexReactClient } from "convex/react";
import { useAuth, useUser } from "@clerk/nextjs";

export default function Home() {
  const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL as string,
  );

  return (
    <div className="lg:w-xl md:w-lg sm:w-lg w-auto px-4 mx-auto font-sans">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {useUser().isLoaded && (
          <DreamProvider>
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
      </ConvexProviderWithClerk>
    </div>
  );
}
