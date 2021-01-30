import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myPics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

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
        <div>
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
            <h6>{state ? state.following.length : "0"} following</h6>
            <h6>{state ? state.followers.length : "0"} followers</h6>
          </section>
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
