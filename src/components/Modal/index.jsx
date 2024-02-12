import ReactDOM from "react-dom";
import { CLOSE_MODAL_BTN } from "./constants";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg space-y-4 max-w-xs w-full m-4">
        {children}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
        >
          {CLOSE_MODAL_BTN}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
