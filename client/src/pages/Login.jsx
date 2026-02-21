// import { User, Mail, LockIcon } from "lucide-react";
// import React from "react";

// const Login = () => {
//   const query = new URLSearchParams(window.location.search);
//   const urlState = query.get("state");

//   const [state, setState] = React.useState(urlState || "login");

//   const [formData, setFormData] = React.useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
//       <form
//         onSubmit={handleSubmit}
//         className="sm:w-87.5 text-center bg-white shadow-lg  rounded-2xl px-8"
//       >
//         <h1 className="text-black text-3xl mt-10 font-medium">
//           {state === "login" ? "Login" : "Sign up"}
//         </h1>

//         <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

//         {state !== "login" && (
//           <div className="flex items-center mt-6 w-full bg-white border  h-12 rounded-full overflow-hidden pl-6 gap-2 text-black">
//             <User size={16}></User>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full bg-transparent text-black placeholder-gray-400 border-none outline-none "
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         )}

//         <div className="flex items-center w-full mt-4  border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 text-black">
//           <Mail size={16}></Mail>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email id"
//             className="w-full bg-transparent text-black placeholder-gray-400 border-none outline-none "
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className=" flex items-center mt-4 w-full  border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
//           <LockIcon size={16}></LockIcon>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full bg-transparent text-black placeholder-gray-400 border-none outline-none"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mt-4 text-left">
//           <button className="text-sm text-green-400 hover:underline">
//             Forget password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="mt-2 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-500 transition "
//         >
//           {state === "login" ? "Login" : "Sign up"}
//         </button>

//         <p
//           onClick={() =>
//             setState((prev) => (prev === "login" ? "register" : "login"))
//           }
//           className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
//         >
//           {state === "login"
//             ? "Don't have an account?"
//             : "Already have an account?"}
//           <span className="text-green-400 hover:underline ml-1">
//             click here
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };
// export default Login;

import React, { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const urlState = query.get("state");

  const [state, setState] = useState(urlState || "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (urlState) {
      setState(urlState);
    }
  }, [urlState]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === "login") {
      console.log("Login Data:", formData);
      // login logic here
    } else {
      console.log("Register Data:", formData);
      // register logic here
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleState = () => {
    const newState = state === "login" ? "register" : "login";
    setState(newState);
    navigate(`?state=${newState}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md text-center bg-white shadow-lg rounded-2xl px-8 py-10"
      >
        <h1 className="text-3xl font-semibold">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          {state === "login"
            ? "Please sign in to continue"
            : "Create your account"}
        </p>

        {/* Name Field */}
        {state !== "login" && (
          <div className="flex items-center mt-6 border h-12 rounded-full pl-5 gap-3">
            <User size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full outline-none bg-transparent"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="flex items-center mt-4 border h-12 rounded-full pl-5 gap-3">
          <Mail size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full outline-none bg-transparent"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mt-4 border h-12 rounded-full pl-5 gap-3">
          <Lock size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full outline-none bg-transparent"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot Password */}
        {state === "login" && (
          <div className="mt-4 text-right">
            <button
              type="button"
              className="text-sm text-green-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-500 transition"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        {/* Toggle */}
        <p
          onClick={toggleState}
          className="text-gray-400 text-sm mt-5 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-green-500 hover:underline ml-1">
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
