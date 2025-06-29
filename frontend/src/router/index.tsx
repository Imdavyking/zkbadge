import { useRoutes } from "react-router-dom";
import Home from "../views/home/main";
import GetStarted from "../views/get-started/main";
import NotFound from "../views/not-found/main";
import UploadNow from "../views/upload-now/main";
import DiscoverDataset from "../views/discover-dataset/main";
import RoyaltiesPage from "../views/collect-rewards/main";
function Router() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/get-started",
      element: <GetStarted />,
    },
    {
      path: "/upload-now",
      element: <UploadNow />,
    },
    {
      path: "/discover-dataset",
      element: <DiscoverDataset />,
    },
    {
      path: "/collect-rewards",
      element: <RoyaltiesPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  return useRoutes(routes);
}

export default Router;
