import { Outlet } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import "./App.css";

const App = () => {
  return (
    <SkeletonTheme baseColor="#e8e8e8" highlightColor="#f5f5f5">
      <Outlet />
    </SkeletonTheme>
  );
};

export { App };
