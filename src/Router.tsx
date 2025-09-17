import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { PageLayout } from "./layouts/PageLayout";
import { OrderLayout } from "./layouts/OrderLayout";
import { ShopPage } from "./pages/ShopPage";
import { ShopCartPage } from "./pages/ShopCartPage";
import { OrderDetailsPage } from "./pages/OrderDetailsPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PageLayout />,
        children: [
          {
            path: "/",
            element: <ShopPage />,
          },
          {
            path: "/cart",
            element: <ShopCartPage />,
          },
        ],
      },
      {
        path: "/",
        element: <OrderLayout />,
        children: [
          { path: "/order/:orderNumber", element: <OrderDetailsPage /> },
        ],
      },
    ],
  },
]);

export { Router };
