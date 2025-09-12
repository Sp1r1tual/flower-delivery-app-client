import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { PageLayout } from "./layouts/PageLayout";
import { ShopPage } from "./pages/ShopPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
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
            element: <ShoppingCartPage />,
          },
        ],
      },
      {
        path: "/order/:orderNumber",
        element: <OrderDetailsPage />,
      },
    ],
  },
]);

export { Router };
