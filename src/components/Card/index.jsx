import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const Card = ({ id, title, description, column }) => {
  const [, drag] = useDrag(() => ({
    type: "CARD",
    item: { id, title, description, column },
  }));

  return (
    <div ref={drag} className="bg-white p-4 rounded shadow mb-2 cursor-move">
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
