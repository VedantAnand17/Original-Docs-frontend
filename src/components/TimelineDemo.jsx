import React from "react";
import { Timeline } from "@/components/ui/Timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "1",
      content: (
        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl transition-transform duration-700 ease-out hover:scale-105 hover:shadow-3xl animate-fade-in">
          <p className="text-3xl font-semibold font-serif text-white tracking-wide">
            Drag and drop the image
          </p>
        </div>
      ),
    },
    {
      title: "2",
      content: (
        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl transition-transform duration-700 ease-out hover:scale-105 hover:shadow-3xl animate-fade-in">
          <p className="text-3xl font-semibold font-serif text-white tracking-wide">
            Verify the image
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
