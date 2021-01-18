import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

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

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId,
        text,
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

  const deletePost = (postId) => {
    fetch(`/deletePost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <main className='home'>
      {data.map((item) => {
        const { photo, title, body, _id, likes } = item;
        const { name } = item.postedBy;
        return (
          <section className='card home-card' key={_id}>
            <h5>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? `/profile/${item.postedBy._id}`
                    : "/profile"
                }
              >
                {name}
              </Link>
              {item.postedBy._id == state._id && (
                <i
                  className='material-icons'
                  style={{
                    cursor: "pointer",
                    float: "right",
                  }}
                  onClick={() => {
                    deletePost(item._id);
                  }}
                >
                  delete
                </i>
              )}
            </h5>
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
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "501 " }}>
                      {`${record.postedBy.name} `}
                    </span>
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, _id);
                }}
              >
                <input type='text' placeholder='add a comment' />
              </form>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Home;
