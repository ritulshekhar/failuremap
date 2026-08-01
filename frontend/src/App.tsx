import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UploadPage from "./pages/UploadPage";
import TrainPage from "./pages/TrainPage";
import ReportPage from "./pages/ReportPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/upload"
              replace
            />
          }
        />

        <Route
          path="/upload"
          element={
            <UploadPage />
          }
        />

        <Route
          path="/train"
          element={
            <TrainPage />
          }
        />

        <Route
          path="/report"
          element={
            <ReportPage />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;