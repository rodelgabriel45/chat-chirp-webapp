import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full border border-teal-500 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blue-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-500">
            <span className="text-amber-500">ChatChirp</span> Sign Up
          </h1>
          <form>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex justify-center items-center mt-5">
              <button
                type="submit"
                className="btn btn-outline btn-block btn-sm btn-success"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex gap-2 mt-5">
            <span>Already have an account?</span>
            <Link to="/" className="text-green-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
