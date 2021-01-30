import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    // console.log(Boolean(state));
    if (state) {
      return (
        <>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/createpost'>Create post</Link>
          </li>
          <li>
            <Link to='/myfollowingspost'>My Following Posts</Link>
          </li>
          <li>
            <button
              className='btn waves-effect waves-light red lighten-2'
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("./signin");
              }}
            >
              Log out
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to='/signin'>Sign in</Link>
          </li>
          <li>
            <Link to='/signup'>Sign up</Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav>
      <div className='nav-wrapper white'>
        <Link to={state ? "/" : "/signin"} className='brand-logo left'>
          Instagram
        </Link>
        <ul id='nav-mobile' className='right'>
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
