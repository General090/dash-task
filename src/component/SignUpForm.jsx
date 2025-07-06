import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "./Steps";
import { AuthContext } from "../auth/AuthContext"; // Ensure this path is correct
import PlaceIcon from "@mui/icons-material/Place";
import img1 from "../assets/img/Apple.png";
import img2 from "../assets/img/Group.png";
import img3 from "../assets/img/Google.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiSearch } from "react-icons/ci";
import { FiDollarSign, FiUsers } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";

// import { Navigate } from "react-router-dom";

const SignUpForm = ({ switchToLoginTab, switchToNextStep, currentStep, setCurrentStep, setActiveTab }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    date: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const images = [img1, img2, img3];

  const [formErrors, setFormErrors] = useState({});
  const { signUp } = useContext(AuthContext); // Destructure signUp from AuthContext

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setFormData(JSON.parse(storedUser));
    }
  }, []);

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
      switchToNextStep();
    }
  };

  const tohandleNextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
      // switchToNextStep();
      navigate("/successPage");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signUp(formData.email, formData.password);
        // setStep(step + 1);
        toast.success("Sign up success");
        setTimeout(() => {
          navigate("/successPage"); // Navigate to dashboard after successful sign up
        }, 2000);
      } catch (error) {
        toast.error("Sign Up failed. Please provide valid details.");
        setTimeout(() => {
          setStep(1) // Navigate to dashboard after successful sign up
          setCurrentStep(1); //
          setActiveTab(0);
        }, 2000);
       
        console.error("Error during sign up:", error);
      }
    }
  };

  const handleGoBackToLoginTab = () => {
    switchToLoginTab();
  };

  const handleAddManually = () => {
    setShowAdditionalFields(true);
  };

  const handleUseCurrentLocation = () => {
    alert("Using current location");
  };

  const validateForm = () => {
    let errors = {};
    if (step === 1) {
      if (!formData.email) {
        errors.email = "Email is required";
      } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(formData.email)) {
          errors.email = "Invalid email format";
        }
      }
      if (!formData.password) {
        errors.password = "Password is required";
      }
    } else if (step === 2) {
      if (!formData.fullName) {
        errors.fullName = "Full name is required";
      }
      if (!formData.gender) {
        errors.gender = "Gender is required";
      }
      if (!formData.phone) {
        errors.phone = "Phone number is required";
      }
      if (!formData.date) {
        errors.date = "Date of birth is required";
      }
    } else if (step === 3 && showAdditionalFields) {
      if (!formData.street) {
        errors.street = "Street is required";
      }
      if (!formData.city) {
        errors.city = "City is required";
      }
      if (!formData.state) {
        errors.state = "State is required";
      }
      if (!formData.zip) {
        errors.zip = "Zip code is required";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className=" w-full mt-0 lg-mt-6">
      {step === 1 && (
        <>
          <div className="flex gap-3 mt-2  lg:mt-5">
            {images.map((image, index) => (
              <div key={index} className="rounded-full p-0 bg-slate-300">
                <img className="rounded-full w-10" src={image} />
              </div>
            ))}
          </div>
          <p className="mt-2 lg:mt-4 text-[14px] lg:text-[15ppx]">
            or register with email
          </p>
          <div className=" mt-3 lg:mt-4 w-full">
            <Steps
              //   title="User Details"
              fields={[
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  //   placeholder: "Enter your email",
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  //   placeholder: "Enter your password",
                },
              ]}
              inputText="8+ characters required"
              formData={formData}
              handleChange={handleChange}
              buttonText="Create Account"
              handleButtonClick={handleNextStep}
              errors={formErrors}
            />
          </div>
          {/* t and cs */}
          <div className="mt-3 lg:mt-7 items-center justify-center ">
            <p className="text-[10px] lg:text-[12px] text-[#1B1F3B66] font-[300] text-center">
              By continuing I agree with the{" "}
              <span className="text-[10px] lg:text-[12px] text-[#35709e]">
                {" "}
                Terms & Conditions,
                <br /> Privacy Policy
              </span>
            </p>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className=" w-full mt-4">
            <Steps
              //   title="Continuous Details"
              fields={[
                {
                  //   label: "Full Name",
                  name: "fullName",
                  type: "text",
                  placeholder: "Enter your full name",
                },
                {
                  label: "Gender",
                  name: "gender",
                  type: "radio",
                  placeholder: "Enter your gender",
                },
                {
                  //   label: "Phone",
                  name: "phone",
                  type: "number",
                  placeholder: "Phone number",
                },
                {
                  //   label: "Birthday",
                  name: "date",
                  type: "date",
                  placeholder: "Birthday",
                },
              ]}
              formData={formData}
              handleChange={handleChange}
              buttonText="Save Information"
              handleButtonClick={handleNextStep}
              errors={formErrors}
            />
          </div>
        </>
      )}
      {step === 3 && (
        <div className="">
          {/* <h2>Location Details</h2> */}
          {!showAdditionalFields ? (
            <>
              <div>
                {/* <label>Search Location</label> */}
                <div className="searc mt-4 md:mt-0 lg:mt-0">
                  <div className="search">
                    <div className="flex items-center border-2 rounded-[10px] gap-1 px-2 bg-white">
                      <CiSearch className="w-5 h-5 text-[#AAAAAA]" />{" "}
                      {/* Adjust the size and color */}
                      <input
                        type="text"
                        placeholder="Search Location"
                        className="border-0 font-[400] text-[14px] bg-transparent outline-0 h-[36px] w-[180px] px-2 py-3"
                      />
                    </div>
                  </div>
                </div>
               
                <p className="text-[12px] text-[#1A0710A6] font-[600]">
                  Your address is not visible to other users
                </p>
              </div>
              <div className=" md:flex  mt-4 lg:gap-6 md:gap-3 lg:mt-8 md:mt-6 ">
                <div className="flex gap-0 my-3 md:my-0 lg:my-0 md:w-1/1 md:h-8 text-[#5932EA] border-2 border-[#EF498F47] lg:px-2 md:px-1 py-0 rounded-2xl items-center  font-[700] ">
                  <span>
                    <PlaceIcon fontSize="small" />
                  </span>
                  <button
                    className="lg:text-[14px] text-[12px] p-2 md:p-0 lg:p-0 md:text-[11px] "
                    onClick={handleUseCurrentLocation}
                  >
                    Use Current Location
                  </button>
                </div>
                <div className="flex md:w-1/1 md:h-8 text-[#5932EA] px-2 justify-start md:justify-center lg:justify-center border-2 border-[#EF498F47] lg:px-4 md:px-5 py-0 rounded-2xl items-center  font-[700] ">
                  <button
                    className="text-[#5932EA] text-[12px] p-2 md:p-0 lg:p-0 lg:text-[14px] md:text-[12px] font-[700]"
                    onClick={handleAddManually}
                  >
                    Add Manually
                  </button>
                </div>
              </div>

              <div className="info mt-[120px] bottom-0 m">
                <h2 className="text-[16px] font-[700] ">
                  Sharing your address shows:
                </h2>
                
                <div className="mt-3">
                <p className="text-[14px] font-[500] text-[#1A0710A6] flex items-center gap-2"><span><FiUsers /></span>People near you</p>
                <p className="text-[14px] font-[500] text-[#1A0710A6] flex items-center gap-2"><span><FaRegClock /></span>
                  Estimated delivery time 
                </p>
                <p className="text-[14px] font-[500] text-[#1A0710A6] flex items-center gap-2"><span><FiDollarSign /></span>
                  Estimated shipping costs 
                </p>
                </div>
                
              </div>
            </>
          ) : (
            <Steps
              // title="Enter Address Manually"
              fields={[
                {
                  //   label: "Street",
                  name: "street",
                  type: "text",
                  placeholder: "Enter your address",
                },
                {
                  //   label: "Apartment",
                  name: "apartment",
                  type: "text",
                  placeholder: "Enter your apartment",
                },
                {
                  //   label: "City",
                  name: "city",
                  type: "text",
                  placeholder: "Enter your city",
                },
                {
                  //   label: "State",
                  name: "state",
                  type: "text",
                  placeholder: "Enter your state",
                },
                {
                  //   label: "Zip Code",
                  name: "zip",
                  type: "text",
                  placeholder: "Enter your zip code",
                },
              ]}
              formData={formData}
              handleChange={handleChange}
              buttonText="Submit"
              handleButtonClick={handleSubmit}
              errors={formErrors}
            />
          )}
          <ToastContainer />
        </div>
      )}
      {/* {step === 4 && (
        <div>
          <div>
            <img src={imgFrame} alt="" />
          </div>
          <h2>You have successfully registered</h2>
          <button onClick={handleSubmit}>Go back to login</button>
        </div>
      )} */}
    </div>
  );
};

export default SignUpForm;
