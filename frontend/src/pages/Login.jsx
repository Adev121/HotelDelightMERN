import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import "../components/loader.css";

function Login() {
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setloading(true);
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post("https://hoteldelight-backend.onrender.com/login", userInfo)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("newuser",JSON.stringify(res.data.user));
          setTimeout(() => {
            toast.success("Login Successfully !");
          }, 2000);
          

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
        console.log(res.data);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(`${err.response.data.message}`);
          window.location.reload;
        }, 2000);
        
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          // toast.success("Login Successfully !");
          setloading(false);
        }, 3000);
      }); //stop loader
    console.log(data);
    console.log(userInfo);
  };
  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center">
              <Link to={"/"} className="text-2xl text-center">
                <i className="fa-solid fa-hotel" style={{ color: "red" }}></i>
                HOTEL <span className="font-bold text-blue-700">DELIGHT</span>
              </Link>
              {/* <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      {...register("email", { required: true })}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-slate-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      {...register("password", { required: true })}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-slate-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{" "}
                <Link
                  to={"/signup"}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Signup Here
                </Link>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Login;
