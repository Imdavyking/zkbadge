import "./App.css";
import "./utils/polyfill";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavHeader from "./components/NavHeader";
import { MidnightMeshProvider } from "./context/midnight-wallet-context";

function App() {
  return (
    <>
      <ToastContainer />
      <MidnightMeshProvider>
        <BrowserRouter>
          <NavHeader />
          <Router />
        </BrowserRouter>
      </MidnightMeshProvider>
    </>
  );
}

export default App;
