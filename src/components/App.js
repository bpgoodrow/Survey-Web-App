import React from "react";
import Header from "./Header";
import SurveyControl from "./SurveyControl";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SurveyControl />} />
      </Routes>
    </Router>
  );
}

export default App;
