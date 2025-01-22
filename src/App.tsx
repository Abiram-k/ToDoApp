import "./App.css";
import ToDoApp from "./components/To-Do-App";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <ToDoApp />
    </>
  );
}

export default App;
