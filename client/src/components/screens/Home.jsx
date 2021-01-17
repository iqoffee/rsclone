import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("./allposts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          return item._id == result._id ? result : item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          return item._id == result._id ? result : item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className='home'>
      {data.map((item) => {
        const { photo, title, body, _id, likes } = item;
        const { name } = item.postedBy;
        return (
          <section className='card home-card' key={_id}>
            <h5>{name}</h5>
            <div className='card-image'>
              <img src={photo} alt={title} />
            </div>
            <div className='card-content'>
              {item.likes.includes(state._id) ? (
                <i
                  className='material-icons'
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => {
                    unLikePost(_id);
                  }}
                >
                  favorite
                </i>
              ) : (
                <i
                  className='material-icons'
                  style={{ color: "black", cursor: "pointer" }}
                  onClick={() => {
                    likePost(_id);
                  }}
                >
                  favorite
                </i>
              )}

              <h6>{likes.length} likes</h6>
              <h6>{title}</h6>
              <p>{body}</p>
              <input type='text' placeholder='add a comment' />
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Home;
