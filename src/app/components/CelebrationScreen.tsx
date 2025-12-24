"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

interface CelebrationScreenProps {
  hostName: string;
  onPickAgain: () => void;
  onEditList: () => void;
}

interface Confetti {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  color: string;
}

const CONFETTI_COUNT = 50;

export function CelebrationScreen({
  hostName,
  onPickAgain,
  onEditList,
}: CelebrationScreenProps) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const colors = useMemo(
    () => [
      "#14B8A6",
      "#F97316",
      "#8B5CF6",
      "#EC4899",
      "#F59E0B",
      "#3B82F6",
    ],
    [],
  );

  useEffect(() => {
    const pieces: Confetti[] = [];

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 3,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setConfetti(pieces);
  }, [colors]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-4 relative overflow-hidden"
      data-oid="2dh4lgf"
    >
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full animate-fall"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDuration: `${piece.animationDuration}s`,
            animationDelay: `${piece.delay}s`,
          }}
          data-oid="84rg5xy"
        />
      ))}

      <div className="relative z-10 max-w-2xl w-full" data-oid="6eo4vqo">
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center space-y-8"
          data-oid="a_fv_ww"
        >
          {/* Trophy/Celebration Icon */}
          <div className="text-8xl animate-bounce" data-oid="kyz2:b_">
            🏆
          </div>

          {/* Main Message */}
          <div className="space-y-4" data-oid="8:dqao8">
            <h1
              className="text-2xl md:text-3xl font-bold text-gray-700"
              data-oid="upkn6:b"
            >
              Ведущий встречи:
            </h1>
            <div
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl py-6 px-8 transform hover:scale-105 transition-transform"
              data-oid="5y53tx0"
            >
              <p
                className="text-4xl md:text-6xl font-bold break-words"
                data-oid="5qlkbbx"
              >
                {hostName}
              </p>
            </div>
          </div>

          {/* Congratulatory Message */}
          <p
            className="text-xl md:text-2xl text-gray-600 font-medium"
            data-oid="b_w8:-o"
          >
            🎉 Поздравляем! Вы ведете сегодняшнюю встречу! 🎉
          </p>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4" data-oid="fj:24-1">
            <button
              onClick={onPickAgain}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg text-xl"
              data-oid="xcqnro2"
              aria-label="Выбрать ведущего снова"
            >
              🎰 Выбрать снова
            </button>
            <button
              onClick={onEditList}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-full border-2 border-gray-300 transition-all"
              data-oid="-.29cbx"
              aria-label="Изменить список участников"
            >
              ✏️ Изменить список
            </button>
          </div>
        </div>
      </div>

      <style jsx data-oid="f2fl0w4">{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
