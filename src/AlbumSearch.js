import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card
} from "react-bootstrap";
import { useState, useEffect } from "react";

const CLIENT_ID = "81906680058c4e9591b6cf434f5276f0";
const CLIENT_SECRET = "8145c6ee26654b0bbfdd7f8ce5884af1";

function AlbumSearch(props) {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    //this is how Spotify wants us to access their api
    var authParameters = {
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
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    if (!searchInput) {
      alert("Please enter an artist name"); //this will fire if the search bar is empty when searching otherwise the app will crash
      return;
    }

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
      }
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id; //returns one artist that is most relevant to the search
      });

    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }

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
      <h1 id="centermargintop">Spotify Album Search</h1>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Enter an artist name"
            type="input"
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
          />
          <Button onClick={search} id="button">
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row-cols-4">
          {albums.map((album, i) => {
            return (
              <Card className="card">
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>

                <button
                  onClick={() => {
                    props.favAlbFunct([
                      ...props.favAlbArray,
                      { name: album.name, url: album.images[0].url }
                    ]);
                  }}
                >
                  Favourite
                </button>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default AlbumSearch;