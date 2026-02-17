
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch } from "./redux/hooks";
import { restoreAuthSession } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreAuthSession());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
