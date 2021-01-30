import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true,
  );

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setUserProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unFollowUser = () => {
    fetch("/unFollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        unFollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id,
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <>
      {userProfile ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={userProfile.user.pic}
                alt={userProfile.user.name}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <section
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </section>
              {showFollow ? (
                <button
                  style={{ margin: "10px" }}
                  className='btn waves-effect waves-light blue lighten-2'
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  style={{ margin: "10px" }}
                  className='btn waves-effect waves-light blue lighten-2'
                  onClick={() => unFollowUser()}
                >
                  UnFollow
                </button>
              )}
            </div>
          </div>

          <div className='gallery'>
            {userProfile.posts.map((item) => {
              const { photo, title, _id } = item;

              return <img className='item' src={photo} alt={title} key={_id} />;
            })}
          </div>
        </main>
      ) : (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      )}
    </>
  );
};

export default Profile;
