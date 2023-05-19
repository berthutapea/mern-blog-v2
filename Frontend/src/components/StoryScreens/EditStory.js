import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Loader from "../GeneralScreens/Loader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlineUpload } from "react-icons/ai";
import "../../Css/EditStory.css";
import { jsPDF } from "jspdf";

const EditStory = () => {
  const { config, activeUser } = useContext(AuthContext);
  const { storyId } = useParams();
  const editorEl = useRef(null);
  //const slug = useParams();
  //console.log("This is the slug", slug);
  const imageEl = useRef(null);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState({});
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [download, setDownload] = useState(null);
  const [view, setView] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const [previousImage, setPreviousImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  //const navigate = useNavigate();

  const getStoryInfo = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/story/${storyId}`,
        { ...config, activeUser: activeUser },
        activeUser
      );
      console.log(data);
      setStory(data.data);
      setTitle(data.data.title);
      setContent(data.data.content);
      setImage(data.data.image);
      setPreviousImage(data.data.image);
      setLoading(false);
      setAvatar(
        `/story/story_avatar?userId=${data.data.author._id}&storyId=${data.data._id}&image=${data.data.image}`
      );
    } catch (error) {
      setError("Failed to retrieve story information");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(activeUser);

    getStoryInfo();
  }, []);

  const handleImage = (e) => {
    const files = e.target.files;
    const images = [];
    // Loop through all the files
    for (let i = 0; i < files.length; i++) {
      images.push(URL.createObjectURL(files[i]));
      console.log("Saurav Hathi");
    }
    // Set the image state
    setImage(images);
  };

  // handleConvert is called when the user clicks the convert button
  const handleConvert = () => {
    // create a new jsPDF instance and set the page size to A4 portrait
    const doc = new jsPDF("p", "mm", "a4");

    // add the image to the document and set the position to the center of the page
    const defaultWidth = 210;
    const defaultHeight = 297;

    image.forEach((img, index) => {
      // get the width and height of the image
      const imgWidth = doc.getImageProperties(img).width;
      const imgHeight = doc.getImageProperties(img).height;
      // cal ratio to scale the image
      const ratio = imgWidth / imgHeight;
      const width = defaultWidth;
      const height = width / ratio;
      // add the image to the document
      doc.addImage(img, "JPEG", 0, 0, width, height);
      // when the image is not the last one, add a new page
      if (index < image.length - 1) doc.addPage();
    });
    // dataUrl is the base64 encoded string of the pdf
    const pdf = doc.output("dataurlstring");
    // set the download state to the dataUrl
    setDownload(pdf);
    // set the view state to the bloburl
    setView(doc.output("bloburl"));
    // set the isComplete state to true
    setIsComplete(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    if (image) {
      formdata.append("image", image);
    }

    formdata.append("previousImage", previousImage);
    // formdata.append("content", content);
    formdata.append("userId", activeUser._id);

    try {
      const { data } = await axios.post(
        `/story/editStory/${storyId}/edit`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSuccess("Edit Story successfully ");
      setStory(data);
      console.log(data);
      setAvatar(
        `/story/story_avatar?userId=${activeUser._id}&storyId=${data.data._id}&image=${data.data.image}`
      );
      setTimeout(() => {
        setSuccess("");
      }, 7000);
    } catch (error) {
      setTimeout(() => {
        setError("");
      }, 7000);
      setError(error.response.data.error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="Inclusive-editStory-page ">
          <form onSubmit={handleSubmit} className="editStory-form">
            {error && <div className="error_msg">{error}</div>}
            {success && (
              <div className="success_msg">
                <span>{success}</span>
                <Link to="/">Go home</Link>
              </div>
            )}

            <input
              type="text"
              required
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <CKEditor
              editor={ClassicEditor}
              onChange={(e, editor) => {
                console.log(editor.getData());
                const data = editor.getData();
                setContent(data);
              }}
              ref={editorEl}
              data={content}
            />

            <div className="currentlyImage">
              <div className="absolute">Currently Image2</div>
              {/* <img
                src={`/story/${storyId}/editStory/`}
                alt="storyImage" //{story.title}
                // src={`/story/editStory/${storyId}`}
                // alt={story.title}
                //alt="storyImage"
              /> */}
              <img src={avatar} />
            </div>
            <div className="StoryImageField">
              <AiOutlineUpload />
              <div className="txt">
                {image === previousImage
                  ? "    Change the image in your story "
                  : image.name}
              </div>
              <input
                name="image"
                type="file"
                // ref={imageEl}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  console.log(image);
                }}
              />
            </div>

            <h1 className="text-2xl font-bold text-center">Image To Pdf</h1>
            <p className="text-center">
              Convert your multiple images into a single pdf
            </p>
            {isComplete ? (
              <p className="text-center text-green-500">
                100% Complete number of pages: {image.length}
              </p>
            ) : null}

            <div className="flex flex-col gap-2">
              <label className="flex flex-col items-center px-4 py-20 bg-white text-blue-500 rounded-lg shadow-lg uppercase border border-blue-500 cursor-pointer hover:bg-slate-800 hover:text-white hover:border-slate-50">
                <img
                  src={require("./upload.png")}
                  alt="upload"
                  className="w-10 h-10 text-slate-900"
                />
                <span className="mt-2 text-base leading-normal">
                  Select file
                </span>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleImage}
                  accept="image/*"
                />
              </label>
            </div>
            <div className="flex flex-col">
              {image ? (
                <button
                  id="convert"
                  className="bg-slate-50 text-lg font-bold text-slate-900 p-2 rounded"
                  onClick={handleConvert}
                >
                  Convert
                </button>
              ) : null}
            </div>
            {isComplete ? (
              <div id="pdfViewAndDl">
                <div className="flex flex-row items-center justify-between gap-2">
                  <a
                    id="download"
                    className="bg-slate-50 text-lg font-bold text-slate-900 p-2 rounded"
                    href={download}
                    download="imageToPdf.pdf"
                  >
                    Download
                  </a>
                  <a
                    id="view"
                    className="bg-slate-50 text-lg font-bold text-slate-900 p-2 rounded "
                    href={view}
                    target="_blank"
                  >
                    View Pdf
                  </a>
                </div>
              </div>
            ) : null}

            <button type="submit" className="editStory-btn">
              Edit Story{" "}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditStory;
