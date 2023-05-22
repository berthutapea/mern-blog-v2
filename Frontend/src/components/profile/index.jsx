import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext.js";
import { Container, Row, Col } from "react-bootstrap";

const AllImages = () => {
  const { activeUser } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (activeUser._id)
      fetch("/show", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: activeUser._id,
        }),
      })
        .then((response) => {
          response
            .json()
            .then((result) => {
              console.log(result);
              if (result.success) {
                setImages(result.images);
              } else {
                alert(result.message);
              }
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
  }, [activeUser]);

  return (
    <>
      <Container>
        {images.length && (
          <Row>
            {images.map((image) => (
              <Col xl={4} style={{ padding: "10px" }}>
                <img
                  src={`/images/?image=${image}&userId=${activeUser._id}`}
                  alt="Not found"
                  width="100%"
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default AllImages;
