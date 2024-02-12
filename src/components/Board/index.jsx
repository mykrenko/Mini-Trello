import { useState } from "react";
import { useQuery } from "@apollo/client";
import Column from "../Column";
import AddCardForm from "../AddCardForm";
import { GET_CARDS } from "../../graphql/queries";

const Board = () => {
  const { loading, error, data } = useQuery(GET_CARDS);
  const [isModalOpen, setModalOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cards.</p>;

  const columns = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  data.cards.forEach((card) => {
    columns[card.column].push(card);
  });

  return (
    <div className="p-4">
      <div className="flex gap-4 justify-center flex-wrap">
        {Object.entries(columns).map(([columnName, cards]) => (
          <Column key={columnName} title={columnName} cards={cards} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Add Task
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-4 rounded-lg space-y-4 max-w-xs">
            <h2 className="text-lg font-semibold">Add New Task</h2>
            <AddCardForm onComplete={() => setModalOpen(false)} />
            <button
              onClick={() => setModalOpen(false)}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
