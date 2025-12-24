"use client";

import { useState, useEffect } from "react";

interface EditListModalProps {
  currentParticipants: string[];
  onSave: (names: string[]) => void;
  onClose: () => void;
}

export function EditListModal({
  currentParticipants,
  onSave,
  onClose,
}: EditListModalProps) {
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setTextValue(currentParticipants.join("\n"));
  }, [currentParticipants]);

  const handleSave = () => {
    const names = textValue
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) {
      if (typeof window !== "undefined") {
        window.alert("Пожалуйста, добавьте хотя бы одно имя!");
      }
      return;
    }

    // Validate names (no empty strings, reasonable length)
    const validNames = names.filter((name) => {
      return name.length > 0 && name.length <= 100; // Max 100 characters per name
    });

    if (validNames.length === 0) {
      if (typeof window !== "undefined") {
        window.alert("Пожалуйста, введите корректные имена!");
      }
      return;
    }

    // Check for duplicates
    const uniqueNames = Array.from(new Set(validNames));
    if (uniqueNames.length !== validNames.length) {
      if (
        typeof window !== "undefined" &&
        !window.confirm("Есть повторяющиеся имена. Они будут удалены. Продолжить?")
      ) {
        return;
      }
    }

    onSave(uniqueNames);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      data-oid="j6rs6v4"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-oid="-vz619p"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div
          className="flex justify-between items-start mb-6"
          data-oid="sv9.txf"
        >
          <div data-oid="07ybhe8">
            <h2 id="modal-title" className="text-3xl font-bold text-gray-900" data-oid="6czw351">
              ✏️ Изменить список участников
            </h2>
            <p id="modal-description" className="text-gray-600 mt-2" data-oid="14u7fj2">
              Введите одно имя в строке. Повторяющиеся имена будут удалены.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
            data-oid="ebuppae"
            aria-label="Закрыть модальное окно"
          >
            ×
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Александр&#10;Мария&#10;Дмитрий&#10;Елена&#10;..."
          className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-mono text-lg resize-none text-gray-900"
          autoFocus
          data-oid="o.t6ce-"
          aria-label="Список участников, одно имя в строке"
          aria-describedby="line-count"
        />

        {/* Line count */}
        <div id="line-count" className="mt-2 text-sm text-gray-500" data-oid="ezdb58.">
          {
            textValue.split("\n").filter((line) => line.trim().length > 0)
              .length
          }{" "}
          имен введено
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6" data-oid="678ocp.">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
            data-oid="2.t887k"
            aria-label="Сохранить список участников"
          >
            💾 Сохранить список
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-full border-2 border-gray-300 transition-all"
            data-oid="p-v0jow"
            aria-label="Отменить изменения"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
