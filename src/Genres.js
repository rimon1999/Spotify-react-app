import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

export function Genres() {
  const CLIENT_ID = "65212afe39c04a3dae5c18dc72d65d5d";
  const CLIENT_SECRET = "1d1a0710c7bf4d1d8ac334e4915c5ef2";
  const [accessID, setAccessID] = useState("");
  const [genre, setGenre] = useState("pop");
  const [recAlbumns, setRecAlbumn] = useState([]);

  useEffect(() => {
    const authID = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET
    };
    fetch("https://accounts.spotify.com/api/token", authID)
      .then((result) => result.json())
      .then((data) => setAccessID(data.access_token));
  }, []);

  const fetchData = (genre) => {
    setGenre(genre);

    const { data } = axios
      .get("https://api.spotify.com/v1/recommendations", {
        headers: {
          Authorization: `Bearer ${accessID}`
        },
        params: {
          limit: 10,
          market: "US",
          seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_genres: genre,
          seed_tracks: "0c6xIDDpzE81m2q797ordA"
        }
      })
      .then((response) => {
        setRecAlbumn(response.data.tracks);
      });
  };

  return (
    <div id="center">
      <Navbar variant="dark" expand="md" className="py-0">
        <Container>
          <Navbar.Brand>SpotiClone</Navbar.Brand>
          <Nav>
            <LinkContainer to="/artistsearch">
              <Nav.Link>Artist Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/albumsearch">
              <Nav.Link>Album Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/genres">
              <Nav.Link>Recommendations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/favourites">
              <Nav.Link>Favourites</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <h1 id="centermargintopandbot">Select a genre</h1>
      <button id="marginleftandright"
        onClick={() => {
          fetchData("pop");
        }}
      >
        Pop
      </button>
      <button id="marginleftandright"
        onClick={() => {
          fetchData("rock");
        }}
      >
        Rock
      </button>
      <button id="marginleftandright"
        onClick={() => {
          fetchData("country");
        }}
      >
        Country
      </button>
      <button id="marginleftandright"
        onClick={() => {
          fetchData("classical");
        }}
      >
        Classical
      </button>
      <button id="marginleftandright"
        onClick={() => {
          fetchData("techno");
        }}
      >
        Techno
      </button>
      <button id="marginleftandright"
        onClick={() => {
          fetchData("Opera");
        }}
      >
        Opera
      </button>

      <h3 id="centermargintop">Check out these songs</h3>

      {recAlbumns.map((x) => {
        return <Format name={x.name} />;
      })}
    </div>
  );
}

function Format(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  );
}

export default Genres;