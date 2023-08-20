import React from "react";

export function OptionHeader({ loggedIn, setShowLogin, setShowAllDishes }) {
  return !loggedIn ? (
    <button onClick={() => setShowLogin(true)} title="Login">
      🔒
    </button>
  ) : (
    <button onClick={() => setShowAllDishes(true)} title="Choose dish">
      🔎
    </button>
  );
}
