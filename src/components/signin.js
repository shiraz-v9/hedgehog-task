import { useState, useEffect } from "react";

import { Cryptodecrypt, Cryptoencrypt } from "./Cryptohash";
export function SignIn() {
  const [postuser, setPostuser] = useState(null);
  const [message, setMessage] = useState("");
  const [userdata, setUserdata] = useState({
    password: "",
    email: "",
  });

  useEffect(
    function persistForm() {
      if (postuser !== null) {
        console.log("sign in called");
        localStorage.setItem("user", userdata.email);
        localStorage.setItem("loggedin", true);
        window.open("/actions", "_self");
      }
    },
    [postuser]
  );

  const submitHandle = (e) => {
    e.preventDefault();
    // console.log(userdata);
    if (!userdata.password.length || !userdata.email.length) {
      setMessage("CANNOT leave empty");
    } else if (userdata.password.length <= 5) {
      setMessage("Password must be greater than 5 carachters");
    } else if (
      //   userdata.user.trim() == "" ||
      userdata.password.trim() === "" ||
      userdata.email.trim() === ""
    ) {
      setMessage("No empty fields");
    } else if (localStorage.getItem("session") !== null) {
      let sesh = JSON.parse(localStorage.getItem("session"));

      var arrpwd = [];
      sesh.map((x) => {
        //
        arrpwd.push({ email: x.email, password: Cryptodecrypt(x.password) });
      });
      var found = arrpwd.find((item) => item.email === userdata.email);
      // var code = found.password === userdata.password;
      // console.log(found);
      if (found !== undefined && found.password === userdata.password) {
        setMessage("✔");
        setPostuser(true);
      } else {
        setMessage("not found 🚫");
      }
    }else {
        setMessage("not found 🚫");
      }
  };

  return (
    <div className="allMargin">
      <form onSubmit={submitHandle}>
        <p>Sign back in with your account</p>

        <p>
          don't have an account? <a href="/">sign up</a>
        </p>
        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={(e) =>
            setUserdata({
              ...userdata,
              [e.currentTarget.name]: e.currentTarget.value,
            })
          }
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) =>
            setUserdata({
              ...userdata,
              [e.currentTarget.name]: e.currentTarget.value,
            })
          }
        />

        <br />

        <input className="btns" type="submit" value="Sign in" required />
        <p>{message}</p>
      </form>
    </div>
  );
}
