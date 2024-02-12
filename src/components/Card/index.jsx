import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@apollo/client";
import { DELETE_CARD } from "../../graphql/mutations";
import { GET_CARDS } from "../../graphql/queries";

const Card = ({ id, title, description, column }) => {
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

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCard();
    }
  };

  return (
    <div
      ref={drag}
      className="bg-white p-4 rounded shadow mb-2 cursor-move relative group"
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
      <h3 className="text-md font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  column: PropTypes.string,
};

export default Card;
