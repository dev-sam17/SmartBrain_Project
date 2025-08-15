import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Particles from "../../components/Particles/Particles";

import {
  signInWithGooglePopup,
  authUserSignInWithEmailAndPassword,
  
} from "../../utils/firebase.utils";

const defaultFormFields = {
  email: '',
  password: ''
}

const Signin = () => {
  const [ formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  const onSubmitSignIn = async (event) => {
    event.preventDefault();

    try {
      await authUserSignInWithEmailAndPassword(
        email,
        password
      );
      navigate('/');
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Either email or password is incorrect. Please try again.");
      } else {
        console.log(error);
      }
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGooglePopup();
      navigate('/');
    } catch (error) {
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/popup-blocked"
      ) {
        alert("popup-closed-by-user");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={1000}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={300}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
      <div style={{ position: 'fixed', top: '20px', left: '20px', display: 'flex', gap: '10px', zIndex: 10 }}>
        <Link to="/" className="white f4 link dim underline pa2 pointer">Home</Link>
        <Link to="/signup" className="white f4 link dim underline pa2 pointer">Sign Up</Link>
      </div>
      <article className="br23 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center self-">
        <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="white f3 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label
                className="white db fw6 lh-copy f5"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={handleChange}
              />
            </div>
            <div className="mv3">
              <label className="white db fw6 lh-copy f5" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <label className=" white pa0 ma0 lh-copy f5 pointer">
              <input type="checkbox" /> Remember me
            </label>
            <div className="">
              <input
                onClick={onSubmitSignIn}
                className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f4 dib"
                type="submit"
                value="Sign in"
              />
              <button
                type="button"
                onClick={googleSignIn}
                className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f4 dib"
              >
                Google Sign In
              </button>
            </div>
            <div className="lh-copy mt3">
              <Link to="/signup" className="white f5 link dim black db pa3">
                Sign up
              </Link>
              <a href="#0" className="white f6 link dim black db">
                Forgot your password?
              </a>
            </div>
          </fieldset>
        </form>
        </main>
      </article>
    </div>
  );
};

export default Signin;
