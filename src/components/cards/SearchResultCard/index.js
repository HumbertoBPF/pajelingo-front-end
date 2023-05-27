import { useNavigate } from "react-router-dom";
import styles from "./SearchResultCard.module.css";
import { useState } from "react";
import { baseUrl } from "services/base";
import { useSelector } from "react-redux";
import HeartIcon from "components/icons/HeartIcon";
import { Card, Col, Row } from "react-bootstrap";

export default function SearchResultCard({ word, flagImage }) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [result, setResult] = useState(word);

    function toogleHeartIcon() {
        if (user) {
            fetch(`${baseUrl}/words/${word.id}/favorite-word`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${user.token}`,
                },
                body: JSON.stringify({
                    is_favorite: !result.is_favorite
                })
            }).then(
                response => response.ok?response.json():null
            ).then(
                data => {
                    if (data !== null) {
                        setResult(data);
                    }
                }
            );
        }
    }

    return (
        <Col className="my-1">
            <Card className={`${styles["search-card"]}`}>
                {
                    (result.is_favorite === null)?
                    null:
                    <HeartIcon className={styles["icon-heart"]} width="1.5em" height="1.5em" 
                        fill={result.is_favorite} onClick={(event) => toogleHeartIcon()}/>
                }
                <Row className="g-0" onClick={() => navigate(`/meanings/${word.id}`)}>
                    <Col className="px-4 d-flex align-items-center justify-content-center" md={4}>
                        <img
                            src={`data:image/jpeg;base64,${flagImage}`} 
                            className="img-fluid rounded-start" 
                            alt={`${word.language} language flag`}
                        />
                    </Col>
                    <Col className="row" md={8}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <Card.Text>
                                {word.word_name}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}