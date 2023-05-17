import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../Css/DetailStory.css";
import Loader from "../GeneralScreens/Loader";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { BsBookmarkPlus, BsThreeDots, BsBookmarkFill } from "react-icons/bs";
import CommentSidebar from "../CommentScreens/CommentSidebar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Moment from "react-moment";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import moment from "moment"

const DetailStory = (props) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeUser, setActiveUser] = useState({});
  const [story, setStory] = useState({});
  //console.log(story, "This is the story from DetailStory");
  const [storyLikeUser, setStoryLikeUser] = useState([]);
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { storyId } = useParams();
  //console.log(storyId, "This is the storyId from DetailStory.js");
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);
  const navigate = useNavigate();
  const [storyImages, setStoryImages] = useState();

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const getDetailStory = async () => {
      setLoading(true);
      var activeUser = {};
      try {
        const { data } = await axios.get("/auth/private", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        activeUser = data.user;

        setActiveUser(activeUser);
      } catch (error) {
        console.log(error);
        setActiveUser({});
      }

      try {
        const { data } = await axios.post(`/story/${storyId}`, {
          activeUser,
        });
        setStory(data.data);
        setLikeStatus(data.likeStatus);
        setLikeCount(data.data.likeCount);
        setStoryLikeUser(data.data.likes);
        setLoading(false);

        const story_id = data.data._id;

        if (activeUser.readList) {
          if (!activeUser.readList.includes(story_id)) {
            setStoryReadListStatus(false);
          } else {
            setStoryReadListStatus(true);
          }
        }
        try {
          if (activeUser._id) {
            const { data } = await axios.post(`/story/images/get`, {
              userId: activeUser._id || null,
              storyId: storyId,
            });
            setStoryImages(data.images);
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
        setStory({});
        //navigate("/not-found");
      }
    };
    getDetailStory();
  }, [storyId, setLoading]);

  const handleLike = async () => {
    setTimeout(() => {
      setLikeStatus(!likeStatus);
    }, 1500);

    try {
      const { data } = await axios.post(
        `/story/${storyId}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setLikeCount(data.data.likeCount);
      setStoryLikeUser(data.data.likes);
    } catch (error) {
      setStory({});
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  // const handleDelete = async () => {
  //   if (window.confirm("Do you want to delete this post")) {
  //     try {
  //       await axios.delete(`/story/${storyId}/delete`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //         },
  //       });
  //       navigate("/");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleDelete = async (storyId) => {
    if (window.confirm("Do you want to delete this post?")) {
      try {
        const authToken = localStorage.getItem("authToken");

        await axios.delete(`/story/${storyId}/delete`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Optionally, perform any additional actions after successful deletion
        console.log("Post deleted successfully");
        navigate("/"); // Assuming you have the `navigate` function available for client-side routing
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editDate = (createdAt) => {
    const d = new Date(createdAt);
    var datestring =
      d.toLocaleString("eng", { month: "long" }).substring(0, 3) +
      " " +
      d.getDate();
    return datestring;
  };

  const addStoryToReadList = async () => {
    try {
      const { data } = await axios.post(
        `/user/${storyId}/addStoryToReadList`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setStoryReadListStatus(data.status);

      document.getElementById("readListLength").textContent =
        data.user.readListLength;
    } catch (error) {
      console.log(error);
    }
  };

  const regex = /^(\d{4})\.(\d{2})\.(\d{2})\.(\d{2})\.(\d{2})\.(\d{2})\.(\w+)$/;
  const convertTime = (fileName) => {
    const match = regex.exec(fileName);

    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      const hour = match[4];
      const minute = match[5];
      const second = match[6];
      const extension = match[7];

      return (
        <>
          <Moment fromNow ago>
            {new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`)}
          </Moment>{" "}
          ago.
        </>
      );
    } else {
      console.error("Invalid filename format");
    }
  };

  // const handleConvert = async () => {
  //   for (let i = 0; i < storyImages.length; i++) {
  //     const image = storyImages[i];
  //     const doc = new jsPDF("p", "mm", "a4");

  //     const img = new Image();

  //     await new Promise((resolve, reject) => {
  //       img.onload = resolve;
  //       img.onerror = reject;
  //       img.src = `/story/images/${story.author._id}/${storyId}/${image.fileName}`;
  //     });

  //     const defaultWidth = 210;
  //     const defaultHeight = 297;
  //     const imgWidth = img.width;
  //     const imgHeight = img.height;
  //     const ratio = imgWidth / imgHeight;
  //     const width = defaultWidth;
  //     const height = width / ratio;

  //     doc.addImage(img, "JPEG", 0, 0, width, height);

  //     // generate a unique timestamp-based filename
  //     const timestamp = Date.now();
  //     const filename = `image_${timestamp}_to_PDF.pdf`;

  //     // save each PDF file with a unique filename
  //     doc.save(filename);
  //   }
  // };

  // const handleConvert = async () => {
  //   for (let i = 0; i < storyImages.length; i++) {
  //     const image = storyImages[i];
  //     const doc = new jsPDF("p", "mm", "a4");

  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");

  //     const img = new Image();

  //     await new Promise((resolve, reject) => {
  //       img.onload = resolve;
  //       img.onerror = reject;
  //       img.src = `/story/images/${story.author._id}/${storyId}/${image.fileName}`;
  //     });

  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx.drawImage(img, 0, 0);

  //     const imgData = canvas.toDataURL("image/jpeg", 1.0);

  //     const pdfWidth = doc.internal.pageSize.getWidth();
  //     const pdfHeight = (img.height * pdfWidth) / img.width;

  //     doc.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

  //     // generate a unique timestamp-based filename
  //     const timestamp = Date.now();
  //     const filename = `image_${timestamp}_to_PDF.pdf`;

  //     // save each PDF file with a unique filename
  //     doc.save(filename);
  //   }
  // };
  const handleConvert = async () => {
    const doc = new jsPDF(); // Create a single doc object for all images

    for (let i = 0; i < storyImages.length; i++) {
      const image = storyImages[i];

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();

      const imageUrl = `/story/images/${story.author._id}/${storyId}/${
        image.fileName
      }?t=${Date.now()}`;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing the image
      ctx.drawImage(img, 0, 0);

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;

      doc.addPage(); // Add a new page for each image
      doc.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    // generate a unique timestamp-based filename
    const timestamp = Date.now();
    const filename = `images_${timestamp}_to_PDF.pdf`;

    // save the PDF file with the unique filename
    doc.save(filename);
  };

  ////////////////////////////////////////////////
  // const handleConvert = async () => {
  //   // create a new jsPDF instance and set the page size to A4 portrait
  //   const doc = new jsPDF("p", "mm", "a4");

  //   for (let i = 0; i < storyImages.length; i++) {
  //     const image = storyImages[i];
  //     const img = new Image();

  //     await new Promise((resolve, reject) => {
  //       img.onload = resolve;
  //       img.onerror = reject;
  //       img.src = `/story/images/${story.author._id}/${storyId}/${image.fileName}`;
  //     });

  //     // add the image to the document and set the position to the center of the page
  //     const defaultWidth = 210;
  //     const defaultHeight = 297;
  //     const imgWidth = img.width;
  //     const imgHeight = img.height;
  //     const ratio = imgWidth / imgHeight;
  //     const width = defaultWidth;
  //     const height = width / ratio;

  //     //doc.addPage();
  //     doc.addImage(img, "JPEG", 0, 0, width, height);
  //   }

  //   // save the PDF
  //   doc.save("imagesToPdf.pdf");
  // };
  //////////////////////////////////////////////////////

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Inclusive-detailStory-page">
            <div className="top_detail_wrapper">
              <Link to={"/"}>
                <FiArrowLeft />
              </Link>
              <h5>{story.title}</h5>

              <div className="story-general-info">
                <ul>
                  {story.author && (
                    <li className="story-author-info">
                      {/* <img src={`/userPhotos/${story.author.photo}`} alt={story.author.username} /> */}
                      <img
                        src={`/story/story_avatar?userId=${story.author._id}&storyId=${story._id}&image=${story.image}`}
                        alt={story.author.username}
                      />
                      <span className="story-author-username">
                        {story.author.username}{" "}
                      </span>
                    </li>
                  )}
                  <li className="story-createdAt">
                    {editDate(story.createdAt)}
                  </li>
                  <b>-</b>

                  <li className="story-readtime">{story.readtime} min read</li>
                </ul>

                {!activeUser.username && (
                  <div className="comment-info-wrap">
                    <i
                      onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus);
                      }}
                    >
                      <FaRegComment />
                    </i>

                    <b className="commentCount">{story.commentCount}</b>
                  </div>
                )}

                {activeUser &&
                story.author &&
                story.author._id === activeUser._id ? (
                  <div className="top_story_transactions">
                    <Link
                      className="editStoryLink"
                      to={`/story/${story._id}/edit`}
                    >
                      <FiEdit />
                    </Link>
                    <span className="deleteStoryLink" onClick={handleDelete}>
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="CommentFieldEmp">
              <CommentSidebar
                slug={storyId}
                sidebarShowStatus={sidebarShowStatus}
                setSidebarShowStatus={setSidebarShowStatus}
                activeUser={activeUser}
              />
            </div>

            <div className="story-content">
              <div className="story-banner-img">
                {/* <img src={`/storyImages/${story.image}`} alt={story.title} />
                 */}
                <img
                  src={`/story/story_avatar?userId=${story.author._id}&storyId=${story._id}&image=${story.image}`}
                  alt={story.title}
                  style={{ boxShadow: "7px 7px 18px 8px black" }}
                />
              </div>

              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: story.content }}
              ></div>
            </div>

            {activeUser.username && (
              <>
                {storyImages && (
                  <>
                    <Container>
                      <Row>
                        {storyImages.map((image, index) => (
                          <Col xl={4} key={index} className="mb-4">
                            <Card
                              style={{
                                width: "100%",
                                boxShadow: "7px 7px 18px 8px black",
                              }}
                            >
                              {/* /images/:userId/:storyId/:image */}
                              <Card.Img
                                variant="top"
                                src={`/story/images/${story.author._id}/${storyId}/${image.fileName}`}
                              />
                              <Card.Body>
                                <Card.Title>{image.fileName}</Card.Title>
                                <Card.Text>
                                  <strong
                                    style={{
                                      display: "block",
                                      borderBottom: "1px solid",
                                    }}
                                  >
                                    Created By: {image.userId.username}
                                  </strong>

                                  <strong>
                                    Created At: {convertTime(image.fileName)}
                                  </strong>
                                </Card.Text>
                                <Button
                                  variant="primary"
                                  onClick={handleConvert}
                                >
                                  Convert to PDF
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </>
                )}
                <div className="fixed-story-options">
                  <ul>
                    <li>
                      <i onClick={handleLike}>
                        {likeStatus ? (
                          <FaHeart color="#0063a5" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </i>

                      <b
                        className="likecount"
                        style={
                          likeStatus
                            ? { color: "#0063a5" }
                            : { color: "rgb(99, 99, 99)" }
                        }
                      >
                        {" "}
                        {likeCount}
                      </b>
                    </li>

                    <li>
                      <i
                        onClick={(prev) => {
                          setSidebarShowStatus(!sidebarShowStatus);
                        }}
                      >
                        <FaRegComment />
                      </i>

                      <b className="commentCount">{story.commentCount}</b>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <i onClick={addStoryToReadList}>
                        {storyReadListStatus ? (
                          <BsBookmarkFill color="#0205b1" />
                        ) : (
                          <BsBookmarkPlus />
                        )}
                      </i>
                    </li>

                    <li className="BsThreeDots_opt">
                      <i>
                        <BsThreeDots />
                      </i>

                      {activeUser && story.author._id === activeUser._id ? (
                        <div className="delete_or_edit_story  ">
                          <Link
                            className="editStoryLink"
                            to={`/story/${story.storyId}/edit`}
                          >
                            <p>Edit Story</p>
                          </Link>
                          <div
                            className="deleteStoryLink"
                            onClick={handleDelete}
                          >
                            <p>Delete Story</p>
                          </div>
                        </div>
                      ) : null}
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DetailStory;
