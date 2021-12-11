import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { storage } from "./firebase";

const AddPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const state = useSelector((state) => {
    return state;
  });
  const [url, setUrl] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );
  // add new post
  const newPost = async (e) => {
    // e.preventDefault();
    try {
      let addPost = e.target.addPost.value;
      // console.log(newPost);
      const result = await axios.post(
        `${BASE_URL}/newPost`,
        {
          title,
          desc,
          img,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      setPost(result.data);
      navigate("/timeline");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };
  console.log("img", img);
  return (
    <div>
      <div className="flex">
        <input
          placeholder="Title of your post"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <input
          placeholder="Discripe your post"
          onChange={(e) => setDesc(e.target.value)}
          type="text"
        />

        <div>
          <input type="file" onChange={handleChange} />
          <div>
            <input type="file" onChange={handleChange} />
            <progress value={progress} max="100" />
          </div>
        </div>

        <button onClick={newPost}> Add </button>
      </div>
    </div>
  );
};

export default AddPost;
