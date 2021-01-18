import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
      });
  }, []);

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
                src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                alt='Alex Bimant<'
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
                <h6>40 followers</h6>
                <h6>40 following</h6>
              </section>
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
