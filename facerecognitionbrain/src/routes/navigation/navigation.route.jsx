import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        { !currentUser ? (
            <>
            <Link to="/signup" className="white f3 link dim underline pa3 pointer"> Signup</Link>
            <Link to="/signin" className="white f3 link dim underline pa3 pointer"> Signin</Link> 
            </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-start'}}>
          <p className="white f3 dim pa3" style={{ marginTop: 0}}>Hi, user</p>
          <Link to="/signin" className="white f3 link dim underline pa3 pointer" onClick={signOutUser}> Signout</Link>
          </div>
          )}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
