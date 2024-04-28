import React, { useState } from "react";

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelection = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Choose Your Character</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="character1"
            name="character"
            value="character1"
            checked={selectedCharacter === "character1"}
            onChange={() => handleCharacterSelection("character1")}
            className="mr-2"
          />
          <label htmlFor="character1">
            <img src="character1.png" alt="Character 1" className="w-16 h-16" />
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="character2"
            name="character"
            value="character2"
            checked={selectedCharacter === "character2"}
            onChange={() => handleCharacterSelection("character2")}
            className="mr-2"
          />
          <label htmlFor="character2">
            <img src="character2.png" alt="Character 2" className="w-16 h-16" />
          </label>
        </div>

        {/* Add more divs for other characters */}
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
}
