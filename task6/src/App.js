import "./utils.css";
import "./variables.css";
import Header from './components/Header/Header';
import Main from "./components/Main/Main";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
    </>
  );
}

export default App;
