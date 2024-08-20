import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./components/General/Header";
import Movies from "./pages/movies/Movies";
import AddNewMovies from "./components/Movies/AddNewMovie/AddNewMovies";
import ListMyMovies from "./components/Movies/ListMyMovies/ListMyMovies";

function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/add-movie" element={<AddNewMovies />} />
        <Route path="/my-movies" element={<ListMyMovies />} />
      </Routes>
    </>
  );
}

export default App;
