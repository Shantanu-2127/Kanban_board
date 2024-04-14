
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import SignUp from "./Routes/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
     <Router>
        <div >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;
