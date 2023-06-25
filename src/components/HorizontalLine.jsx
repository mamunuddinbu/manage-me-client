import React, { useEffect, useState, useRef } from "react";

const HorizontalTimeline = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getHours());
  const timelineRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getHours());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timelineElement = timelineRef.current;
    timelineElement.scrollTo((currentTime - 2) * 60, 0);
  }, [currentTime]);

  const renderTimeline = () => {
    let timeline = [];
    for (let i = 0; i < 24; i++) {
      timeline.push(
        <div
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full mx-2"
          key={i}
        >
          <span className="text-black font-bold text-lg">{i}</span>
        </div>
      );
    }
    return timeline;
  };

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 w-20 h-20 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-lg">{currentTime}</span>
      </div>
      <div
        className="flex items-center overflow-x-auto"
        style={{ paddingLeft: `${(currentTime - 2) * 60}px` }}
        ref={timelineRef}
      >
        {renderTimeline()}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
