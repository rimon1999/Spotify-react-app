import AlbumSearch from "./AlbumSearch";
import ArtistSearch from "./ArtistSearch";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Genres from "./Genres";
import Favourites from "./Favourites";
import EntryPage from "./EntryPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [favAlbum, setFavAlbum] = useState([]);
  const [favArtist, setFavArtist] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/albumsearch"
          element={
            <AlbumSearch favAlbArray={favAlbum} favAlbFunct={setFavAlbum} />
          }
        />
        <Route
          path="/artistsearch"
          element={
            <ArtistSearch favArtArray={favArtist} favArtFunct={setFavArtist} />
          }
        />
        <Route path="/genres" element={<Genres />} />
        <Route
          path="/favourites"
          element={<Favourites favAlbList={favAlbum} favArtList={favArtist} />}
        />
      </Routes>
    </div>
  );
}

export default App;

