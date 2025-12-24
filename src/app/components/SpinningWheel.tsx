"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface SpinningWheelProps {
  participants: string[];
  onComplete: (winner: string) => void;
}

export function SpinningWheel({
  participants,
  onComplete,
}: SpinningWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const spinTimerRef = useRef<NodeJS.Timeout | null>(null);

  const colors = [
    "#14B8A6", // teal
    "#F97316", // orange
    "#8B5CF6", // purple
    "#EC4899", // pink
    "#10B981", // green
    "#F59E0B", // amber
    "#3B82F6", // blue
    "#EF4444", // red
  ];

  useEffect(() => {
    // Validate participants
    if (!participants || participants.length === 0) {
      console.error("SpinningWheel: No participants provided");
      return;
    }

    // Select a random winner
    const winner =
      participants[Math.floor(Math.random() * participants.length)];

    // Calculate rotation to land on winner
    const winnerIndex = participants.indexOf(winner);
    const segmentAngle = 360 / participants.length;
    const targetAngle = winnerIndex * segmentAngle;

    // Add several full rotations plus the target angle
    // Offset by half segment to align pointer at top
    const fullRotations = 5 + Math.random() * 2; // 5-7 full spins
    const finalRotation =
      fullRotations * 360 + (360 - targetAngle) - segmentAngle / 2;

    // Start spinning after a brief delay
    spinTimerRef.current = setTimeout(() => {
      setIsSpinning(true);
      setRotation(finalRotation);
    }, 100);

    // Call onComplete when spinning finishes
    timerRef.current = setTimeout(() => {
      onComplete(winner);
    }, 3000);

    // Cleanup function to prevent memory leaks
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (spinTimerRef.current) {
        clearTimeout(spinTimerRef.current);
      }
    };
  }, [participants, onComplete]);

  const segmentAngle = 360 / participants.length;

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-teal-100 p-4"
      data-oid="938vq-2"
    >
      <div className="relative max-w-2xl w-full" data-oid="j6wqay7">
        {/* Pointer at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20"
          data-oid="15423oa"
        >
          <div
            className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-600 drop-shadow-lg"
            data-oid="6qlhhkh"
          ></div>
        </div>

        {/* Wheel container */}
        <div
          className="relative w-full aspect-square max-w-[500px] mx-auto"
          data-oid="79q-f4q"
        >
          <svg
            className="w-full h-full drop-shadow-2xl"
            viewBox="0 0 200 200"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
            }}
            data-oid="w:1wbir"
          >
            {/* Draw segments */}
            {participants.map((name, index) => {
              const startAngle = index * segmentAngle - 90; // -90 to start at top
              const endAngle = startAngle + segmentAngle;
              const color = colors[index % colors.length];

              // Calculate path for segment
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const x1 = 100 + 90 * Math.cos(startRad);
              const y1 = 100 + 90 * Math.sin(startRad);
              const x2 = 100 + 90 * Math.cos(endRad);
              const y2 = 100 + 90 * Math.sin(endRad);

              const largeArc = segmentAngle > 180 ? 1 : 0;

              const pathData = `M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`;

              // Calculate text position (middle of segment)
              const midAngle = startAngle + segmentAngle / 2;
              const midRad = (midAngle * Math.PI) / 180;
              const textX = 100 + 60 * Math.cos(midRad);
              const textY = 100 + 60 * Math.sin(midRad);

              return (
                <g key={index} data-oid=".d35ipr">
                  <path
                    d={pathData}
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    data-oid="1t.5rcn"
                  />

                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                    className="pointer-events-none select-none"
                    data-oid="9ry30dm"
                  >
                    {name.length > 12 ? name.substring(0, 10) + "..." : name}
                  </text>
                </g>
              );
            })}

            {/* Center circle */}
            <circle
              cx="100"
              cy="100"
              r="15"
              fill="white"
              stroke="#333"
              strokeWidth="2"
              data-oid="wph334p"
            />

            <circle cx="100" cy="100" r="8" fill="#333" data-oid="r00.i6b" />
          </svg>
        </div>

        {/* Spinning text */}
        <div className="text-center mt-8 space-y-4" data-oid="exeeqyc">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 animate-pulse"
            data-oid=":cp:hs9"
          >
            🎰 Крутим...
          </h2>
          <p className="text-xl text-gray-600" data-oid="gcpy1oa">
            Кто будет счастливчиком?
          </p>
        </div>
      </div>
    </div>
  );
}
