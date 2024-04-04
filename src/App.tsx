import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, ExerciseList, Exercise } from "./pages";
import { DefaultLayout } from "./components";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/exercise-list",
        element: <ExerciseList />,
      },
    ],
  },
  {
    path: "/exercise/:exerciseId",
    element: <Exercise />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
