import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myPics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.myposts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instagram-clone");
      data.append("cloud_name", "iqoffee");

      fetch("https://api.cloudinary.com/v1_1/iqoffee/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic }),
              );
              dispatch({
                type: "UPDATEPIC",
                payload: result.pic,
              });
              // window.location.reload();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <main
      style={{
        maxWidth: "550px",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0",
          borderBottom: "1px solid grey",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : "loading"}
            alt={state ? state.name : "Loading"}
          />
        </div>

        <div>
          <h4>{state ? state.name : "Loading"}</h4>
          <h4>{state ? state.email : "Loading"}</h4>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{myPics.length} posts</h6>
            <h6>
              {state && state.following ? state.following.length : "0"}{" "}
              following
            </h6>
            <h6>
              {state && state.followers ? state.followers.length : "0"}{" "}
              followers
            </h6>
          </section>
        </div>
      </div>

      <div className='file-field input-field'>
        <div className='btn '>
          <span>Upload pic</span>
          <input type='file' onChange={(e) => updatePhoto(e.target.files[0])} />
        </div>
        <div className='file-path-wrapper'>
          <input className='file-path validate ' type='text' />
        </div>
      </div>

      <div className='gallery'>
        {myPics.map((item) => {
          const { photo, title, _id } = item;

          return <img className='item' src={photo} alt={title} key={_id} />;
        })}
      </div>
    </main>
  );
};

export default Profile;
