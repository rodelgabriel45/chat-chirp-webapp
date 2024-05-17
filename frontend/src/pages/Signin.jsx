import { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../hooks/useSignin";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, signin } = useSignin();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(formData);
  };

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full border border-teal-500 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blue-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-500">
            <span className="text-amber-500">ChatChirp</span> Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-center items-center mt-5">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-outline btn-block btn-sm btn-success disabled:opacity-80"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="flex gap-2 mt-5">
            <span>Dont have an account?</span>
            <Link to="/signup" className="text-green-700 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
