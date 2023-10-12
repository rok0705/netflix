import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "./../redux/actions/MovieAction";

const GenreBox = () => {
  const { genreList } = useSelector((state) => state.movie);
  const [keyword, setKeyword] = useState("");
  const [keywordId, setKeywordId] = useState(0);
  const dispatch = useDispatch();

  const initialRender = useRef(true);
  const initialRender2 = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      queryGenre();
    }
  }, [keyword]);

  const queryGenre = () => {
    if (!genreList) return;
    setKeywordId(genreList.find((element) => element.name == keyword).id);
  };

  useEffect(() => {
    if (initialRender2.current) {
      initialRender2.current = false;
    } else {
      //   console.log("keywordId:", keywordId);
      dispatch(movieAction.queryByGenre(keywordId));
    }
  }, [keywordId]);

  return (
    <Container>
      <Col>
        <Row>
          <div className="GenresTitle">Genres</div>
        </Row>
        <Row className="genreBox">
          {genreList &&
            genreList.map((genre) => (
              <Col className="genreButton">
                <Button
                  variant="danger"
                  onClick={(event) => setKeyword(event.target.innerHTML)}
                >
                  {genre.name}
                </Button>
              </Col>
            ))}
        </Row>
      </Col>
    </Container>
  );
};

export default GenreBox;
