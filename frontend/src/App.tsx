import "./App.css";
import "./utils/polyfill";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavHeader from "./components/NavHeader";
import AppProvider from "./context/AppContext";

function App() {
  return (
    <>
      <ToastContainer />
      <AppProvider>
        <BrowserRouter>
          <NavHeader />
          <Router />
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;
