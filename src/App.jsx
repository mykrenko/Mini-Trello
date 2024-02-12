import Board from "./components/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 py-10">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          Mini Trello/Kanban Board
        </h1>
        <div className="mt-8">
          <Board />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
