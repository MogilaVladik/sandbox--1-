"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { SpinningWheel } from "./components/SpinningWheel";
import { CelebrationScreen } from "./components/CelebrationScreen";
import { ParticipantList } from "./components/ParticipantList";
import { EditListModal } from "./components/EditListModal";
import { storage } from "./utils/storage";

interface Participant {
  name: string;
  isAbsent: boolean;
}

type AppState = "setup" | "spinning" | "celebration";

export default function Page() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [lastTwoHosts, setLastTwoHosts] = useState<string[]>([]);
  const [selectedHost, setSelectedHost] = useState<string>("");
  const [appState, setAppState] = useState<AppState>("setup");
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState("");
  const [storageWarning, setStorageWarning] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    // Check if localStorage is available
    if (!storage.isAvailable()) {
      setStorageWarning(true);
      return;
    }

    const savedParticipants = storage.getItem("participants");
    const savedLastTwoHosts = storage.getItem("lastTwoHosts");

    if (savedParticipants) {
      try {
        setParticipants(JSON.parse(savedParticipants));
      } catch (e) {
        console.error("Failed to parse saved participants", e);
      }
    }

    if (savedLastTwoHosts) {
      try {
        setLastTwoHosts(JSON.parse(savedLastTwoHosts));
      } catch (e) {
        console.error("Failed to parse saved hosts", e);
      }
    }
  }, []);

  // Save participants to localStorage whenever they change
  useEffect(() => {
    if (participants.length > 0) {
      storage.setItem("participants", JSON.stringify(participants));
    }
  }, [participants]);

  // Save last two hosts to localStorage
  useEffect(() => {
    storage.setItem("lastTwoHosts", JSON.stringify(lastTwoHosts));
  }, [lastTwoHosts]);

  // Clean up lastTwoHosts if names are removed from participants
  useEffect(() => {
    const participantNames = participants.map((p) => p.name);
    const cleanedHosts = lastTwoHosts.filter((host) =>
      participantNames.includes(host),
    );
    if (cleanedHosts.length !== lastTwoHosts.length) {
      setLastTwoHosts(cleanedHosts);
    }
  }, [participants, lastTwoHosts]);

  const getEligibleParticipants = useCallback(() => {
    return participants.filter(
      (p) => !p.isAbsent && !lastTwoHosts.includes(p.name),
    );
  }, [participants, lastTwoHosts]);

  const eligibleParticipants = useMemo(
    () => getEligibleParticipants(),
    [getEligibleParticipants],
  );

  const handlePickHost = useCallback(() => {
    setError("");
    const eligible = eligibleParticipants;

    if (eligible.length < 1) {
      setError(
        "Недостаточно людей! Добавьте больше или снимите отметку 'Отсутствует'.",
      );
      return;
    }

    setAppState("spinning");
  }, [eligibleParticipants]);

  const handleSpinComplete = useCallback(
    (winner: string) => {
      if (!winner || winner.trim() === "") {
        console.error("Invalid winner received");
        setError("Произошла ошибка при выборе ведущего");
        setAppState("setup");
        return;
      }

      setSelectedHost(winner);
      setAppState("celebration");

      // Update last two hosts
      const newLastTwo = [winner, lastTwoHosts[0]].filter(Boolean).slice(0, 2);
      setLastTwoHosts(newLastTwo);
    },
    [lastTwoHosts],
  );

  const handlePickAgain = useCallback(() => {
    setSelectedHost("");
    setAppState("setup");
    setError("");
  }, []);

  const handleToggleAbsent = useCallback((index: number) => {
    if (index < 0 || index >= participants.length) {
      console.error("Invalid participant index");
      return;
    }
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], isAbsent: !updated[index].isAbsent };
      return updated;
    });
  }, [participants.length]);

  const handleSaveList = useCallback(
    (names: string[]) => {
      if (!Array.isArray(names) || names.length === 0) {
        setError("Список участников не может быть пустым");
        return;
      }

      const newParticipants = names.map((name) => {
        const existing = participants.find((p) => p.name === name);
        return {
          name: name.trim(),
          isAbsent: existing?.isAbsent || false,
        };
      });
      setParticipants(newParticipants);
      setShowEditModal(false);
      setError("");
    },
    [participants],
  );

  const handleClearList = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Вы уверены, что хотите очистить весь список?")
    ) {
      setParticipants([]);
      setLastTwoHosts([]);
      storage.removeItem("participants");
      storage.removeItem("lastTwoHosts");
      setError("");
    }
  }, []);

  const eligibleCount = eligibleParticipants.length;

  if (appState === "celebration") {
    return (
      <CelebrationScreen
        hostName={selectedHost}
        onPickAgain={handlePickAgain}
        onEditList={() => setShowEditModal(true)}
        data-oid="q8ljac:"
      />
    );
  }

  if (appState === "spinning") {
    return (
      <SpinningWheel
        participants={eligibleParticipants.map((p) => p.name)}
        onComplete={handleSpinComplete}
        data-oid=":z:9e6o"
      />
    );
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-coral-50 to-purple-50 p-4"
      data-oid="in61k2."
    >
      <div className="max-w-2xl w-full" data-oid="57pcdh_">
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 space-y-6"
          data-oid="x2m4abn"
        >
          {/* Header */}
          <div className="text-center space-y-2" data-oid="pa76a1f">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
              data-oid="llhkxme"
            >
              🎯 Рулетка Ведущих
            </h1>
            <p className="text-lg text-gray-600" data-oid="8sasww4">
              Честный, веселый и автоматический выбор ведущего
            </p>
          </div>

          {/* Stats */}
          {participants.length > 0 && (
            <div
              className="flex gap-4 justify-center text-sm"
              data-oid="eu.bt:m"
            >
              <div
                className="bg-teal-100 px-4 py-2 rounded-full"
                data-oid="._w.i2."
              >
                <span
                  className="font-semibold text-teal-800"
                  data-oid=".mh1jr1"
                >
                  {participants.length}
                </span>{" "}
                <span className="text-teal-700" data-oid="hq0s67b">
                  всего
                </span>
              </div>
              <div
                className="bg-green-100 px-4 py-2 rounded-full"
                data-oid="tz8ywk."
              >
                <span
                  className="font-semibold text-green-800"
                  data-oid="v11pzt5"
                >
                  {eligibleCount}
                </span>{" "}
                <span className="text-green-700" data-oid="ij21w22">
                  доступно
                </span>
              </div>
              {lastTwoHosts.length > 0 && (
                <div
                  className="bg-orange-100 px-4 py-2 rounded-full"
                  data-oid="r9riw:w"
                >
                  <span className="text-orange-700" data-oid="9y834cb">
                    Последний: {lastTwoHosts[0]}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Storage Warning */}
          {storageWarning && (
            <div
              className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-center"
              data-oid="mnmi3hj"
            >
              <p className="text-yellow-800 font-semibold" data-oid="jknlg20">
                ⚠️ Сохранение данных недоступно
              </p>
              <p className="text-yellow-700 text-sm mt-1" data-oid="hxhm.u-">
                В режиме инкогнито данные не сохраняются. Приложение будет
                работать, но список участников не сохранится после закрытия
                страницы.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center"
              data-oid="xvflvlu"
            >
              <p className="text-red-700 font-semibold" data-oid="wbcfnq7">
                {error}
              </p>
            </div>
          )}

          {/* Participant List or Empty State */}
          {participants.length === 0 ? (
            <div className="text-center py-12 space-y-4" data-oid="5p-pq4p">
              <div className="text-6xl" data-oid="zhhdnar">
                🎲
              </div>
              <p className="text-gray-500 text-lg" data-oid=":c8p.an">
                Пока нет участников. Добавьте имена для начала!
              </p>
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
                data-oid="pv8j-:u"
              >
                Добавить участников
              </button>
            </div>
          ) : (
            <>
              <ParticipantList
                participants={participants}
                onToggleAbsent={handleToggleAbsent}
                lastTwoHosts={lastTwoHosts}
                data-oid="-v5zq9l"
              />

              {/* Action Buttons */}
              <div className="space-y-3" data-oid="06s5ai8">
                <button
                  onClick={handlePickHost}
                  disabled={eligibleCount < 1}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg text-xl"
                  data-oid="_w-03f1"
                  aria-label="Выбрать ведущего встречи"
                  aria-disabled={eligibleCount < 1}
                >
                  🎰 Выбрать ведущего!
                </button>

                <div className="flex gap-3" data-oid="4gq5co3">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-full border-2 border-gray-300 transition-all"
                    data-oid="_._8-q7"
                    aria-label="Изменить список участников"
                  >
                    ✏️ Изменить список
                  </button>
                  <button
                    onClick={handleClearList}
                    className="flex-1 bg-white hover:bg-red-50 text-red-600 font-semibold py-3 px-6 rounded-full border-2 border-red-300 transition-all"
                    data-oid="nv9wtxc"
                    aria-label="Очистить весь список участников"
                  >
                    🗑️ Очистить список
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className="text-center mt-6 text-gray-500 text-sm"
          data-oid="9e8:_.j"
        >
          <p data-oid="b2yp9aq">
            {storageWarning
              ? "⚠️ В режиме инкогнито данные не сохраняются"
              : "Ваши данные сохранены локально в браузере. Аккаунт не нужен! 🎉"}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditListModal
          currentParticipants={participants.map((p) => p.name)}
          onSave={handleSaveList}
          onClose={() => setShowEditModal(false)}
          data-oid="mf23znk"
        />
      )}
    </div>
  );
}
