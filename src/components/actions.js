import axios from "axios";
import { useState, useEffect } from "react";
import { Cryptoencrypt, Cryptodecrypt } from "./Cryptohash";

export function Actions() {
  //   $(".theModal").hide();
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState("");
  const [deleteuser, setDeleteuser] = useState(null);

  const [deleteUser, setDeleteUser] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const [createUser, setCreateUser] = useState({
    name: "",
    surname: "",
    image: "",
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("loggedin") === "true") {
      console.log("refresh");
      axios
        .get(`https://reqres.in/api/users?page=2`)
        .then(function (response) {
          if (localStorage.getItem("users") !== null) {
            setUsers(JSON.parse(localStorage.getItem("users")));
            console.log("parsin", JSON.parse(localStorage.getItem("users")));
          } else {
            setUsers(response.data.data);
            localStorage.setItem("users", JSON.stringify(response.data.data));
            console.log("not parsing");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  useEffect(
    function persistForm() {
      if (deleteuser !== null) {
        console.log("effectsssss DELETEE");

        axios
          .delete(`https://reqres.in/api/users/${deleteuser}`)
          .then(function (res) {
            if (res.status === 204) {
              setDeleteUser(true);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {});
      }
    },
    [deleteuser]
  );

  useEffect(() => {
    if (deleteUser === true) {
      console.log("remove from state", deleteuser);
      var remove = users;
      var removeOne = remove
        .map((x) => {
          return x.id;
        })
        .indexOf(deleteuser);

      remove.splice(removeOne, 1);
      setUsers(remove);
      localStorage.setItem("users", JSON.stringify(remove));
      setDeleteUser(false);
    }
  }, [deleteUser]);

  const submitHandle = (e) => {
    e.preventDefault();
    if (
      createUser.name.trim() === "" &&
      createUser.surname.trim() === "" &&
      createUser.email.trim() === "" &&
      createUser.image.trim() === ""
    ) {
      setMessage("No empty fields");
    } else {
      setNewUser(true);
      setMessage("");
    }
  };

  useEffect(() => {
    if (newUser === true) {
      var json = {
        first_name: createUser.name.trim(),
        last_name: createUser.surname.trim(),
        email: createUser.email.trim(),
        avatar: createUser.image.trim(),
      };

      axios
        .post(`https://reqres.in/api/users`, json)
        .then(function (res) {
          if (res.status === 201) {
            console.log(res.status, res.data);
            var add = users;
            var respJson = res.data;

            add.push(respJson);
            setUsers(add);
            localStorage.setItem("users", JSON.stringify(add));
            console.log(users);

            setCreateUser({
              name: "",
              surname: "",
              image: "",
              email: "",
            });
            setNewUser(false);
          } else {
            console.log("something went wrong");
          }
        })
        .catch(function (response) {
          console.log("error");
        });
    }
  }, [newUser]);

  if (localStorage.getItem("loggedin") === "true" && users !== null) {
    return (
      <div className="allMargin">
        {/* <button onClick={() => Cryptodecrypt("yo")}>un hash</button>
        <button onClick={() => Cryptoencrypt("yo")}> hash</button> */}
        <h3>User management</h3>

        <div className="theModal hidden">
          <form onSubmit={submitHandle}>
            {/* <span className="modalSpan"> */}
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={createUser.name}
              onChange={(e) =>
                setCreateUser({
                  ...createUser,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              required
            />
            <label>Surname</label>
            <input
              name="surname"
              type="text"
              value={createUser.surname}
              onChange={(e) =>
                setCreateUser({
                  ...createUser,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              required
            />
            {/* </span> */}
            <label>Profile avatar</label>
            <input
              name="image"
              type="text"
              placeholder="link to jpg or png"
              value={createUser.image}
              onChange={(e) =>
                setCreateUser({
                  ...createUser,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
            />
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              value={createUser.email}
              onChange={(e) =>
                setCreateUser({
                  ...createUser,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              required
            />

            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                className="btns"
                style={{ marginTop: "10px" }}
                type="submit"
                value="Create"
                required
              />

              <p>{message}</p>
            </span>
          </form>
        </div>
        <button
          className="btns resample"
          onClick={() => {
            localStorage.removeItem("users");
            window.location.reload(true);
          }}
        >
          resample
        </button>
        <div className="userTbl">
          <table>
            <thead>
              <tr>
                <td>Avatar</td>
                <td>First name</td>
                <td>Last name</td>
                <td>Email</td>
                <td>ID</td>
                <td>delete</td>
              </tr>
            </thead>
            <tbody>
              {users.map((x, index) => (
                <tr key={index}>
                  <td>
                    <img className="resizeImage" src={x.avatar} alt="avatar" />
                  </td>

                  <td> {x.first_name}</td>
                  <td> {x.last_name}</td>
                  <td> {x.email}</td>
                  <td>{x.id}</td>
                  <td>
                    <button
                      className="xsbtns"
                      onClick={() => setDeleteuser(x.id)}
                    >
                      ❌
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (
    localStorage.getItem("loggedin") === undefined ||
    localStorage.getItem("loggedin") === null
  ) {
    return (
      <div className="colflexBox allMargin">
        <h1>You're not logged in!</h1>
        <a href="/login">log in</a>
        <br />
        <a href="/">sign up</a>
      </div>
    );
  } else {
    return (
      <div className="allMargin">
        <h1>LOADING...</h1>
      </div>
    );
  }
}
