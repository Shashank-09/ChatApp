import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useAuth } from "./context/AuthProvider";
import Left from "./home/left/Left";
import Logout from "./home/left1/Logout";
import Right from "./home/right/Right";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  //console.log(setAuthUser)
  return (
    <>
       <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
