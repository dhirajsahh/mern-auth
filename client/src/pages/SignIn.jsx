import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const [formdata, setFormdata] = useState({});
  const [userMessage, setUserMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    dispatch(signInStart());
    const data = await res.json();
    if (data._id) {
      navigate("/");
      dispatch(signInSuccess(data));
    } else {
      dispatch(signInFailure(data));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          onClick={() => {
            setUserMessage(true);
          }}
        >
          {loading ? "loading..." : "SignIn"}
        </button>
        <OAuth />
      </form>
      {/* <p className="text-red-500">{message}</p> */}
      <div className="flex gap-2 mt-5">
        <p>Dont Have an Account?</p>

        <Link to="/sign-up">
          <span className="text-blue-500">SignUp</span>
        </Link>
      </div>
      <p className="text-red-500">{userMessage && message}</p>
    </div>
  );
};

export default SignIn;
