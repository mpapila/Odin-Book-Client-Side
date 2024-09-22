import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Router from "./Router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/Store";
import { useEffect } from "react";
import { myPendingFriendsList } from "./redux/UserSlice";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(myPendingFriendsList());
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
