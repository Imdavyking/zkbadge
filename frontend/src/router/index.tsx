import { useRoutes } from "react-router-dom";
import Home from "../views/home/main";
import NotFound from "../views/not-found/main";
import VerifyBadge from "../views/verify-badge/main";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/verify",
      element: <VerifyBadge />,
    },
  ];
  return useRoutes(routes);
}

export default Router;
