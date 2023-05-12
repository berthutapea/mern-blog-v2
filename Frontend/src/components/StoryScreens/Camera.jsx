import { useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import { AuthContext } from "../../Context/AuthContext.js";
// import styled, { createGlobalStyle } from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Camera = (props) => {
  const webcamRef = useRef(null);
  const [imageList, setImageList] = useState([]);
  const { activeUser } = useContext(AuthContext);
  console.log(activeUser);
  const videoConstraints = {
    width: 640,
    height: 640,
    facingMode: "user",
  };
  // const [selectedPhoto, setSelectedPhoto] = useState();
  // useEffect(() => {
  //   console.log(selectedPhoto);
  // }, [selectedPhoto]);

  const capture = (e) => {
    e.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    setImageList([...imageList, imageSrc]);
    console.log(imageList);
  };
  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("name", "avatar");
    formData.append("img", image);
    formData.append("user", activeUser._id);
    formData.append("storyId", props.story.data._id);
    console.log(props.story.data._id);
    fetch("/camera/upload", {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        result
          .json()
          .then((res) => {
            console.log(res);
            if (res.success) {
              setImageList([]);
              alert("upload done!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Row>
        <Col xl={12}>
          <Webcam
            audio={false}
            height={480}
            ref={webcamRef}
            screenshotFormat="image/png"
            width={480}
            videoConstraints={videoConstraints}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={4}>
          <Form.Group>
            <Button onClick={capture} type="submit">
              Capture photo
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Check label="Upload as PDF"></Form.Check>
          </Form.Group>
          {/* <button type="submit">Upload photo</button> */}
        </Col>
        <Col xl={8}>
          <Row>
            {imageList &&
              imageList.map((imageSrc, index) => (
                <Col xl={3} key={index} className="m-1">
                  <img
                    src={imageSrc}
                    alt="Overlay image"
                    // show={false}
                    onClick={(e) => {
                      let c = window.confirm(
                        "Are you sure to upload this image?"
                      );
                      if (c) uploadImage(imageSrc);
                    }}
                    width="100%"
                    // onClick={(e) => (e.target.show = !e.target.show)}
                    // target={/* the target element for the overlay */}
                    // placement="bottom"
                    // overlayText={
                    //   <Button onClick={(e) => uploadImage(imageSrc)}>
                    //     Upload
                    //   </Button>
                    // }
                  />
                  {/* <img
                  onClick={(e) => uploadImage(imageSrc)}
                  src={imageSrc}
                  alt={`captured image ${index}`}
                /> */}
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   padding: 4rem;
//   justify-content: center;
//   gap: 1rem;
//   align-item: center;
//   background-color: #033e3e;
//   h1 {
//     color: white;
//     text-transform: uppercase;
//   }
//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 3rem 5rem;
//     button {
//       background-color: #3cb371;
//       color: white;
//       padding: 1rem 2rem;
//       border: none;
//       font-weight: bold;
//       cursor: pointer;
//       border-radius: 0.4rem;
//       font-size: 1rem;
//       text-transform: uppercase;
//       transition: 0.5s ease-in-out;
//       &:hover {
//         background-color: #2e8b57;
//       }
//     }
//   }
// `;
export default Camera;
