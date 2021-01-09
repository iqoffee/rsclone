import React from "react";

const Profile = () => {
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
            src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            alt='Alex Bimant<'
          />
        </div>
        <div>
          <h4>Alex Bimant</h4>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </section>
        </div>
      </div>

      <div className='gallery'>
        <img
          className='item'
          src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt='Alex Bimant<'
        />
        <img
          className='item'
          src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt='Alex Bimant<'
        />
        <img
          className='item'
          src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt='Alex Bimant<'
        />
        <img
          className='item'
          src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt='Alex Bimant<'
        />
        <img
          className='item'
          src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt='Alex Bimant<'
        />
        <img
          className='item'
          src='https://images.unsplash.com/photo-1584308358033-ccc726d7991b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM5fHxwZXJzb258ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt='Alex Bimant<'
        />
      </div>
    </main>
  );
};

export default Profile;
