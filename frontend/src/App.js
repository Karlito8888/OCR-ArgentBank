import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import Root from "./containers/Root";
import NotFound from "./pages/NotFound/NotFound";
import UserPage from "./pages/UserPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
// import ProtectedRoute from "./utils/ProtectedRoute";

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
        element: <UserPage />,
      },
      {
        path: "transaction-detail",
        element: <TransactionDetailPage />,
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
