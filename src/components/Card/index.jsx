import { useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@apollo/client";
import { DELETE_CARD, UPDATE_CARD } from "../../graphql/mutations";
import { GET_CARDS } from "../../graphql/queries";

const cardReducer = (state, action) => {
  switch (action.type) {
    case "EDIT":
      return { ...state, editMode: true };
    case "CANCEL":
      return {
        ...state,
        editMode: false,
        title: state.title,
        description: state.description,
      };
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    case "SAVE":
      return {
        ...state,
        editMode: false,
        initialTitle: state.title,
        initialDescription: state.description,
      };
    default:
      return state;
  }
};

const Card = ({ id, title, description, column }) => {
  const [state, dispatch] = useReducer(cardReducer, {
    title,
    description,
    editMode: false,
  });
  const [, drag] = useDrag(() => ({
    type: "CARD",
    item: { id, title, description, column },
  }));

  const [deleteCard] = useMutation(DELETE_CARD, {
    variables: { id },
    update: (cache) => {
      const existingCards = cache.readQuery({ query: GET_CARDS });
      const newCards = existingCards.cards.filter((card) => card.id !== id);
      cache.writeQuery({
        query: GET_CARDS,
        data: { cards: newCards },
      });
    },
    // Assuming a mock server, we don't expect it to actually perform the deletion,
    // so the cache is manually updated to reflect the change.
  });

  const [updateCard] = useMutation(UPDATE_CARD, {
    variables: {
      id,
      title: state.title,
      description: state.description,
      column,
    },
    update: (cache, { data: { updateCard } }) => {
      const existingCardsData = cache.readQuery({ query: GET_CARDS });
      if (existingCardsData && existingCardsData.cards) {
        const updatedCards = existingCardsData.cards.map((card) =>
          card.id === id
            ? {
                ...card,
                title: updateCard.title,
                description: updateCard.description,
              }
            : card
        );
        cache.writeQuery({
          query: GET_CARDS,
          data: { cards: updatedCards },
        });
      }
    },
  });

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      if (window.confirm("Are you sure you want to delete this card?"))
        deleteCard();
    },
    [deleteCard]
  );

  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    dispatch({ type: "EDIT" });
  }, []);

  const handleSave = useCallback(
    (e) => {
      e.stopPropagation();
      updateCard();
      dispatch({ type: "SAVE" });
    },
    [updateCard]
  );

  const handleChange = (e, field) => {
    dispatch({ type: "CHANGE", field, value: e.target.value });
  };

  return (
    <div
      ref={drag}
      className="bg-white p-4 rounded shadow mb-2 cursor-move relative group"
    >
      {state.editMode ? (
        <>
          <input
            value={state.title}
            onChange={(e) => handleChange(e, "title")}
            className="w-full mb-2 font-semibold"
          />
          <textarea
            value={state.description}
            onChange={(e) => handleChange(e, "description")}
            className="w-full mb-2 text-gray-600"
          />
          <button
            onClick={handleSave}
            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleEdit}
            className="absolute top-2 right-8 text-gray-500 hover:text-gray-700"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          <h3 className="text-md font-semibold">{state.title}</h3>
          <p className="text-sm text-gray-600">{state.description}</p>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
};

export default Card;
