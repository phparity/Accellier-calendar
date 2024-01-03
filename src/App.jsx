import { Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import EventManagementPage from "./pages/EventManagementPage/EventManagementPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<EventManagementPage />} />
      </Routes>
    </>
  );
}

export default App;
