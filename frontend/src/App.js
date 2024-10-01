import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./containers/Root";
import HomePage from "./pages/HomePage/";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserPage from "./pages/UserPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "transaction-detail/:id",
        element: (
          <ProtectedRoute>
            <TransactionDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
