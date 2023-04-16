import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import { Container, InputGroup, FormControl, Button } from "react-bootstrap";

function ArtistSearch(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1/";
    const SPOTIFY_API_SEARCH_ENDPOINT = SPOTIFY_API_BASE_URL + "search";
    const query_params = {
      q: searchQuery,
      type: "artist"
    };
    const headers = {
      Authorization: "Bearer " + accessToken
    };

    axios
      .get(SPOTIFY_API_SEARCH_ENDPOINT, {
        params: query_params,
        headers: headers
      })
      .then((response) => {
        const artists = response.data.artists.items.slice(0, 3); // only keep the first 3 items
        setArtists(artists);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const CLIENT_ID = "4ef0e418b5d44afbb968a7874c7cdf4e";
    const CLIENT_SECRET = "3f590f30d5404074b86dcf9e8a9a2603";
    const SPOTIFY_API_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

    axios
      .post(
        SPOTIFY_API_TOKEN_ENDPOINT,
        {
          grant_type: "client_credentials"
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`
          }
        }
      )
      .then((response) => {
        setAccessToken(response.data.access_token);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
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
      <h1 id="centermargintop">Spotify Artist Search</h1>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Enter an artists name"
            type="input"
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button onClick={handleSearch} id="button">
            Search
          </Button>
        </InputGroup>
      </Container>
      {artists.length > 0 && (
        <div
          id="center"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
          {artists.map((artist) => (
            <div key={artist.id} style={{ marginBottom: "2rem", width: "33%" }}>
              {artist.images.length > 0 && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  width={320}
                  height={350}
                />
              )}

              <h2 id="centermargintop">{artist.name}</h2>
              <p>Popularity: {artist.popularity}</p>

              <button
                variant="success"
                onClick={() => {
                  props.favArtFunct([
                    ...props.favArtArray,
                    { name: artist.name, url: artist.images[0].url }
                  ]);
                }}
              >
                Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtistSearch;