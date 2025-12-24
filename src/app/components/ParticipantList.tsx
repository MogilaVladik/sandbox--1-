"use client";

interface Participant {
  name: string;
  isAbsent: boolean;
}

interface ParticipantListProps {
  participants: Participant[];
  onToggleAbsent: (index: number) => void;
  lastTwoHosts: string[];
}

export function ParticipantList({
  participants,
  onToggleAbsent,
  lastTwoHosts,
}: ParticipantListProps) {
  return (
    <div className="space-y-3" data-oid="t-1-99q">
      <h3
        className="text-lg font-semibold text-gray-700 mb-3"
        data-oid="-xn5p44"
      >
        Участники ({participants.length})
      </h3>
      <div
        className="max-h-96 overflow-y-auto space-y-2 pr-2"
        data-oid="2g0pfct"
      >
        {participants.map((participant, index) => {
          const isRecentHost = lastTwoHosts.includes(participant.name);
          const hostRank = lastTwoHosts.indexOf(participant.name);

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                participant.isAbsent
                  ? "bg-gray-50 border-gray-200 opacity-60"
                  : isRecentHost
                    ? "bg-orange-50 border-orange-300"
                    : "bg-teal-50 border-teal-200 hover:border-teal-300"
              }`}
              data-oid="b54vt4v"
            >
              {/* Checkbox */}
              <label
                className="flex items-center gap-3 flex-1 cursor-pointer"
                data-oid="r3qjdni"
              >
                <input
                  type="checkbox"
                  checked={participant.isAbsent}
                  onChange={() => onToggleAbsent(index)}
                  className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  data-oid="irre.2o"
                  aria-label={`${participant.isAbsent ? "Отметить как присутствующего" : "Отметить как отсутствующего"}: ${participant.name}`}
                />

                <span
                  className={`flex-1 font-medium ${
                    participant.isAbsent
                      ? "text-gray-400 line-through"
                      : "text-gray-900"
                  }`}
                  data-oid="pore654"
                >
                  {participant.name}
                </span>
              </label>

              {/* Status badges */}
              <div className="flex gap-2" data-oid="768cmfl">
                {participant.isAbsent && (
                  <span
                    className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-semibold"
                    data-oid="mb_v2ca"
                  >
                    Отсутствует
                  </span>
                )}
                {isRecentHost && !participant.isAbsent && (
                  <span
                    className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full font-semibold"
                    data-oid="1zx143t"
                  >
                    {hostRank === 0
                      ? "Последний ведущий"
                      : "Предыдущий ведущий"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
