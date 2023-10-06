import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Navigation from "./components/Navigation";

// roadmap
// 1. pages: homePage, movies page, movie detail page
// 2. homepage shows banner
// 3. homepage shows 3 movie sections. popular, top rated, upcoming
// 4. on mousehover movie, show title, genre, score, popularity, adult
// 5. movie slider window

// 6. In movie detail page, show poster, detail info etc.
// 7. on click trailer, show trailer clip
// 8. can see movie review
// 9. can see related movies

// 10. movie search bar on homepage.
// 11. on search result, can sort and filter.

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<MovieDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
