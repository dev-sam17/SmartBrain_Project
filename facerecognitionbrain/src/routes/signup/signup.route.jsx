import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { name, email, password, confirmPassword} = formFields;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        name,
      });
      navigate('/');
    } catch (error) {
      if (error.code === "auth/weak-password") {
        alert("weak password");
      }
      else if (error.code === "auth/email-already-in-use") {
        alert("Email already in use. use another email");
      }
      else {
        console.log("user creation failed ", error);
      }
    }
  };

  return (
    <article className="br23 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center self-">
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="white f3 fw6 ph0 mh0">Sign up</legend>
            <div className="mt3">
              <label className="white db fw6 lh-copy f5" htmlFor="name">
                Name
              </label>
              <input
                className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
              />
            </div>
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
                name="email"
                id="email-address"
                value={email}
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
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="mv3">
              <label className="white db fw6 lh-copy f5" htmlFor="password">
                Confirm Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <input
                onClick={handleSubmit}
                className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f4 dib"
                type="submit"
                value="Sign Up"
              />
            </div>
            <div className="lh-copy mt3">
              <Link to="/signin" className="white f5 link dim black db pa3">
                Sign In
              </Link>
            </div>
          </fieldset>
        </form>
      </main>
    </article>
  );
};

export default Signup;
