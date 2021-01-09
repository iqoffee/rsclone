import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <main className='mycard'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type='text' placeholder='name' />
        <input type='text' placeholder='email' />
        <input type='text' placeholder='password' />
        <button className='btn waves-effect waves-light blue lighten-2'>
          Sign Up
        </button>
        <h5>
          <Link to='/signin'>Already have an account?</Link>
        </h5>
      </div>
    </main>
  );
};

export default SignUp;
