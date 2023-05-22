import React, { useState } from "react";
import { Overlay, Row, Col } from "react-bootstrap";

function OverlayImage(props) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <img
        src={props.src}
        alt={props.alt}
        style={{
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          width: "100%",
          height: "100%",
        }}
        onClick={(e) => setShow(!show)}
      />
      <Overlay show={show} target={props.target} placement={props.placement}>
        {(overlayProps) => (
          <Col
            {...overlayProps}
            style={{
              //   position: "absolute",
              //   top: 0,
              //   left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#fff" }}>{props.overlayText}</span>
          </Col>
        )}
      </Overlay>
    </div>
  );
}

export default OverlayImage;
