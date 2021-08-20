import React from "react";
import { Logout } from "./logout";
export function Nav() {
  return (
    <div className="navbar">
      <span
        style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <div> */}
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <h1>Hedgehog SPA </h1>
          <img
            className="logo"
            src="https://pbs.twimg.com/profile_images/1021311943242600448/BSb_223K_400x400.jpg"
            alt="logo"
          />
        </span>

        {localStorage.getItem("loggedin") !== true &&
        localStorage.getItem("loggedin") !== null ? (
          <p>
            loggedin as {localStorage.getItem("user")} <br />
            <button onClick={() => Logout()} className="btns">
              logout?
            </button>
          </p>
        ) : (
          <p>logged out</p>
        )}
      </span>
    </div>
  );
}
