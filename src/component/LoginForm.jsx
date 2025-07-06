import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext"; // Ensure this path is correct
import img1 from "../assets/img/Apple.png";
import img2 from "../assets/img/Group.png";
import img3 from "../assets/img/Google.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const images = [img1, img2, img3];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email format";
      }
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        toast.success("Login success");
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard after a delay
        }, 2000); // 2000 milliseconds (2 seconds) delay
      } catch (error) {
        setFormErrors({
          general: "Login failed. Please check your email and password.",
        });
        toast.error("Login failed. Please check your email and password.");
        console.error("Error during login:", error);
      }
    }
  };
  

  return (
    <div className=" w-full mt-0 lg-mt-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mt-2 lg:mt-5">
          {images.map((image, index) => (
            <div key={index} className="rounded-full p-0 bg-slate-300">
              <img className="rounded-full w-10" src={image} />
            </div>
          ))}
        </div>
        <p className="mt-2 lg:mt-4 text-[14px] lg:text-[15ppx]">
          or login with email
        </p>
        <div className="password-input-container mt-4">
          <div className="px-1 lg:px-3 border-2 border-[#DDDDDD] hover:border-[#5932EA] rounded-[10px]  py-1 lg:py-1  relative transition duration-300">
            <label className="text-[14px]">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full input-style text-[12px]  p-1 lg:p-1  bg-transparent border-0 outline-none"
            />
          </div>
        </div>
        <div className="password-input-container  mt-2 lg:mt-2">
          <div className=" px-1 lg:px-3 border-2 border-[#DDDDDD] hover:border-[#5932EA] rounded-[10px]   py-1 pb-2 relative transition duration-300">
            <label className="text-[13px]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              className="w-full input-style text-[12px] p-1 bg-transparent border-0 outline-none"
            />
            <span
              className="password-toggle-icon absolute right-2 lg:right-4 top-7 lg:top-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          <p className="text-[12px] text-[#1A0710A6]">8+ characters only</p>
        </div>
        <ToastContainer />
        {formErrors.general && (
          <span className="error">{formErrors.general}</span>
        )}
        <button
          className=" w-full  rounded-[8px] bg-[#5932EA] text-[#ffffff] hover:transition duration-300 mt-4  py-2 lg:py-3 font-[700]"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
