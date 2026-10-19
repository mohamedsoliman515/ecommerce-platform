import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.js";
import { useAuth } from "@clerk/react";
import DashboardLayout from "./layouts/DashboardLayout.jsx"
import DashboardPage from "./pages/DashboardPage.jsx";


const App = () => {
  const { isSignedIn } = useAuth()
  console.log(isSignedIn);

  return (
    <Routes>
      <Route path="/login" element={isSignedIn ? <Navigate to={"/dashbord"} /> : <LoginPage />} />

      <Route path="/" element={isSignedIn ? <DashboardLayout /> : <Navigate to={"/login"} />} >
        <Route index element={<Navigate to={"dashboard"} />} />
        <Route path="dashboard" element={<DashboardPage />} />


      </Route>

    </Routes>
  )
};
export default App;
