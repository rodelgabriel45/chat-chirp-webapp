import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  { path: "/home", element: <Home /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
