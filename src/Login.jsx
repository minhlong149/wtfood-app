import React from "react";

export function Login({ showLogin, handleLogin, loginError, setShowLogin }) {
  return (
    <aside
      className="grid place-items-center absolute top-0 w-full h-full bg-gray-900 bg-opacity-50"
      style={{
        display: showLogin ? "grid" : "none",
      }}
    >
      <form
        className="flex flex-col gap-4 p-6 bg-white rounded-md w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {loginError && (
          <div className="p-2 text-red-500 bg-red-100 rounded-md">
            {loginError}
          </div>
        )}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className="p-2 border border-gray-300 rounded-md" />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="p-2 border border-gray-300 rounded-md" />

        <div className="grid grid-cols-2 gap-4">
          <button
            className="p-2 text-white bg-red-500 rounded-md"
            type="button"
            onClick={() => setShowLogin(false)}
          >
            Cancel
          </button>
          <button
            className="p-2 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </aside>
  );
}
