import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  {
    element: <PrivateRoute />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
