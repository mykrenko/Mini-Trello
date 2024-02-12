import { useState } from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import Card from "../Card";
import {
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@apollo/client";
import { UPDATE_CARD } from "../../graphql/mutations";
import { GET_CARDS } from "../../graphql/queries";

const Column = ({ title, cards }) => {
  const [isSorted, setIsSorted] = useState(false);
  const [updateCard] = useMutation(UPDATE_CARD, {
    update: (cache, { data: { updateCard } }) => {
      const existingCards = cache.readQuery({ query: GET_CARDS });
      if (existingCards && updateCard) {
        const updatedCards = existingCards.cards.filter(
          (card) => card.id !== updateCard.id
        );
        updatedCards.push(updateCard);
        cache.writeQuery({
          query: GET_CARDS,
          data: { cards: updatedCards },
        });
      }
    },
    // Assuming a mock server, we don't expect it to actually perform the updatind,
    // so the cache is manually updated to reflect the change.
  });
  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => handleDrop(item, title),
  }));

  const handleDrop = ({ id, title, description }, newColumn) => {
    updateCard({
      variables: {
        id,
        title,
        description,
        column: newColumn,
      },
    });
  };

  const toggleSort = () => {
    setIsSorted(() => !isSorted);
  };

  const sortedCards = isSorted
    ? [...cards].sort(
        (a, b) => new Date(a?.creationDate) - new Date(b?.creationDate)
      )
    : cards;

  return (
    <div
      ref={drop}
      className="flex-1 min-w-[240px] bg-gray-100 rounded-lg p-4 shadow space-y-2 relative"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={toggleSort}
          className="text-gray-500 hover:text-gray-700"
        >
          {isSorted ? (
            <BarsArrowUpIcon className="h-5 w-5" />
          ) : (
            <BarsArrowDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {sortedCards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

Column.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
};

export default Column;
