import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import Card from "../Card";
import { useMutation } from "@apollo/client";
import { UPDATE_CARD } from "../../graphql/mutations";
import { GET_CARDS } from "../../graphql/queries";

const Column = ({ title, cards }) => {
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

  return (
    <div
      ref={drop}
      className="flex-1 min-w-[240px] bg-gray-100 rounded-lg p-4 shadow space-y-2"
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {cards.map((card) => (
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
