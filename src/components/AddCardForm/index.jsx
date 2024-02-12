import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CARD } from "../../graphql/mutations";
import { GET_CARDS } from "../../graphql/queries";

const AddCardForm = ({ onComplete }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState("TODO");

  const [addCard] = useMutation(ADD_CARD, {
    variables: {
      title,
      description,
      column,
    },
    update: (cache, { data: { addCard } }) => {
      const existingCards = cache.readQuery({ query: GET_CARDS });

      cache.writeQuery({
        query: GET_CARDS,
        data: {
          cards: [...existingCards.cards, addCard],
        },
      });
    },
    onCompleted: () => {
      onComplete();
      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded"
        value={column}
        onChange={(e) => setColumn(e.target.value)}
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Add Card
      </button>
    </form>
  );
};

AddCardForm.propTypes = {
  onComplete: PropTypes.func,
};

export default AddCardForm;
