import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "../Authorized";
import { SchoolList } from "../schools/SchoolList";
import { SchoolDetails } from "../schools/SchoolDetails";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/schools" element={<SchoolList />} />
          <Route path="/schools/:school_id" element={<SchoolDetails />} />
          
        </Route>
      </Routes>
    </>
  );
}