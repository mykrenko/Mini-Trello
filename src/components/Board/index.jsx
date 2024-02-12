import { useState } from "react";
import { useQuery } from "@apollo/client";
import Column from "../Column";
import AddCardForm from "../AddCardForm";
import { GET_CARDS } from "../../graphql/queries";
import Modal from "../Modal";
import { ADD_TASK_BTN, LOADING_TEXT, ERROR_TEXT } from "./constants";

const Board = () => {
  const { loading, error, data } = useQuery(GET_CARDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  const toggleModal = () => setIsModalOpen(() => !isModalOpen);

  data?.cards.forEach((card) => {
    columns[card.column].push(card);
  });

  if (loading) return <p>{LOADING_TEXT}</p>;
  if (error) return <p>{ERROR_TEXT + error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex gap-4 justify-center flex-wrap">
        {Object.entries(columns).map(([columnName, cards]) => (
          <Column key={columnName} title={columnName} cards={cards} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={toggleModal}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          {ADD_TASK_BTN}
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <AddCardForm onComplete={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Board;
