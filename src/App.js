
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
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;
