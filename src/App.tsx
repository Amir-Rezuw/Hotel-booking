import { Toaster } from "react-hot-toast";
import "./App.css";
import Routes from "./Routes";
import Header from "./UI/Components/Header/Header";

const App = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes />
    </div>
  );
};

export default App;
