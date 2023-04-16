import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Card } from "react-bootstrap";

function Favourites(props) {
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

      <h1 id="centermargintop"> Favourites </h1>
      <h3> Albums </h3>
      <Container>
        <Row className="mx-2 row-cols-4">
          {props.favAlbList.map((favourite) => (
            <Card className="card">
              <Card.Img src={favourite.url} />
              <Card.Body>
                <Card.Title>{favourite.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>

      <h3> Artists </h3>
      <Container>
        <Row className="mx-2 row-cols-4">
          {props.favArtList.map((favourite) => (
            <Card className="card">
              <Card.Img src={favourite.url} />
              <Card.Body>
                <Card.Title>{favourite.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Favourites;