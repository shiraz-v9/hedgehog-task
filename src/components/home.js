import { useState, useEffect } from "react";
import axios from "axios";
import { Logout } from "./logout";
import { Cryptoencrypt } from "./Cryptohash";

export function Home() {
  const url = "https://reqres.in";
  const [postuser, setPostuser] = useState(null);
  const [message, setMessage] = useState("");
  const [userdata, setUserdata] = useState({
    password: "",
    email: "",
  });

  useEffect(
    function persistForm() {
      if (postuser !== null) {
        axios
          .post(`${url}/api/register`, postuser)
          .then(function (res) {
            if (res.status === 200) {
              let encrypt = Cryptoencrypt(userdata.password);
              setMessage(`Account created. Redirecting you`);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("loggedin", true);
              localStorage.setItem("user", userdata.email);
              localStorage.setItem("pwd", encrypt);
              var ls = localStorage.getItem("session");

              var array = [];
              if (ls !== null) {
                for (const item in JSON.parse(ls)) {
                  array.push(
                    {
                      email: `${JSON.parse(ls)[item].email}`,
                      password: `${JSON.parse(ls)[item].password}`,
                    },
                    { email: userdata.email, password: encrypt }
                  );
                }
                localStorage.setItem("session", JSON.stringify(array));
                // JSON.parse(ls).map((item) => {
                //   array.push(
                //     {
                //       email: item.email,
                //       password: item.password,
                //     },
                //     { email: userdata.email, password: encrypt }
                //   );
                // });
                //this array won't add third person in storage!!!
                // array.push(
                //   {
                //     password: JSON.parse(ls)[0].password,
                //     email: JSON.parse(ls)[0].email,
                //   },
                //   { email: userdata.email, password: encrypt }
                // );
              } else {
                array.push({ email: userdata.email, password: encrypt });
                localStorage.setItem("session", JSON.stringify(array));
              }

              setTimeout(function () {
                window.open("/actions", "_self");
              }, 1000);
            }
          })
          .catch(function (error) {
            console.log(error);
            setMessage("not created, verified accounts on reqres only!");
            setUserdata({ password: "", email: "" });
          });
        console.log("function call");
      }
    },
    [postuser]
  );

  if (localStorage.getItem("loggedin") === "true") {
    return (
      <div className="allMargin">
        <h1>
          Welcome back go to <a href="/actions">manage users</a> or{" "}
          <button className="btns" onClick={() => Logout()}>
            logout
          </button>
        </h1>
      </div>
    );
  } else {
    const submitHandle = (e) => {
      e.preventDefault();
      console.log(userdata);
      if (!userdata.password.length || !userdata.email.length) {
        setMessage("CANNOT leave empty");
      } else if (userdata.password.length <= 5) {
        setMessage("Password must be greater than 5 carachters");
      } else if (
        userdata.password.trim() === "" ||
        userdata.email.trim() === ""
      ) {
        setMessage("No empty spaces");
      } else if (localStorage.getItem("session") !== null) {
        let ls = localStorage.getItem("session");
        var found = JSON.parse(ls).find(
          (item) => item.email === userdata.email
        );

        if (found !== undefined) {
          setMessage("Account already exists. please log in");
        } else {
          setMessage("✔");
          setPostuser(userdata);
        }
      } else {
        setMessage("✔");
        setPostuser(userdata);
      }
    };

    const handleUserData = (e) =>
      setUserdata({
        ...userdata,
        [e.currentTarget.name]: e.currentTarget.value,
      });

    return (
      <div className="allMargin">
        <form onSubmit={submitHandle}>
          <p>Welcome to Hedgehog SPA! </p>
          <p>
            Signup to join! Already have an account?
            <br />
            <a href="/login">sign in</a>
          </p>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={userdata.email}
            onChange={handleUserData}
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={userdata.password}
            onChange={handleUserData}
          />

          <br />

          <input
            className="btns"
            style={{ marginTop: "10px" }}
            type="submit"
            value="Sign up"
            required
          />
          <p>{message}</p>
        </form>
      </div>
    );
  }
}
