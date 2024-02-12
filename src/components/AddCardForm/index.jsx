import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CARD } from "../../graphql/mutations";
import { GET_CARDS } from "../../graphql/queries";
import {
  ADD_TASK_BTN_NAME,
  COLUMN_NAMES_MAP,
  DEFAULT_TASK_STATUS,
} from "./constants";

const AddCardForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    column: DEFAULT_TASK_STATUS,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [addCard, { error }] = useMutation(ADD_CARD, {
    variables: formData,
    update: (cache, { data: { addCard } }) => {
      const existingCards = cache.readQuery({ query: GET_CARDS });
      if (existingCards && existingCards.cards) {
        cache.writeQuery({
          query: GET_CARDS,
          data: { cards: [...existingCards.cards, addCard] },
        });
      }
    },
    onCompleted: () => {
      onComplete();
      setFormData({ title: "", description: "", column: "TODO" });
    },
  });

  if (error) {
    console.error("Error adding a card:", error.message);
    // Optionally, display an error message to the user
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        className="w-full p-2 border rounded"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <select
        name="column"
        className="w-full p-2 border rounded"
        value={formData.column}
        onChange={handleInputChange}
      >
        {COLUMN_NAMES_MAP.map(({ key, name }) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        {ADD_TASK_BTN_NAME}
      </button>
    </form>
  );
};

AddCardForm.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default AddCardForm;
