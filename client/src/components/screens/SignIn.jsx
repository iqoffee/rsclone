import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <main className='mycard'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type='text' placeholder='email' />
        <input type='text' placeholder='password' />
        <button className='btn waves-effect waves-light blue lighten-2'>
          Sign In
        </button>
        <h5>
          <Link to='/signup'>Don't have an account?</Link>
        </h5>
      </div>
    </main>
  );
};

export default SignIn;
