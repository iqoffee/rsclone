import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
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
  return (
    <main className='home'>
      {data.map((item) => {
        const { photo, title, body, _id } = item;
        const { name } = item.postedBy;
        return (
          <section className='card home-card' key={_id}>
            <h5>{name}</h5>
            <div className='card-image'>
              <img src={photo} alt={title} />
            </div>
            <div className='card-content'>
              <i className='material-icons' style={{ color: "red" }}>
                favorite
              </i>
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
