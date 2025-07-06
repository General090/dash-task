import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Steps = ({
  title,
  fields,
  formData,
  handleChange,
  buttonText,
  handleButtonClick,
  additionalFields,
  showAdditionalFields,
  errors,
  inputText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h2>{title}</h2>
      <div>
        {fields.map((field, index) => (
          <div key={index}>
            {/* <label className="text-[13px]">{field.label}</label> */}
            <div className="fieldWrapper ">
              {field.type === "radio" ? (
                <>
                  <div className="mt-2">
                    <label className="my-0 mr-0 lg:my-2 lg:mr-2">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value="male"
                      checked={formData[field.name] === "male"}
                      onChange={handleChange}
                      className="m-1 "
                    />{" "}
                    Male
                    <input
                      type={field.type}
                      name={field.name}
                      value="female"
                      checked={formData[field.name] === "female"}
                      onChange={handleChange}
                      className="m-2"
                    />{" "}
                    Female
                  </div>
                  <p className="text-[12px] my-1 text-[#1A0710A6]">
                  <span className="font-[800]">&#x24D8; The phone number and birthday are only visible to you</span>
                  </p>
                </>
              ) : (
                <>
                  {field.type === "password" ? (
                    <div className="password-input-container  mt-2 lg:mt-7">
                      <div className=" px-1 lg:px-3 border-2 border-[#DDDDDD] hover:border-[#5932EA] rounded-[10px]   py-1 pb-2 relative transition duration-300">
                        <label className="text-[13px]">{field.label}</label>
                        
                        <input
                          type={showPassword ? "text" : "password"}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full input-style text-[12px] p-1 bg-transparent border-0 outline-none"
                        />
                        <span
                          className="password-toggle-icon absolute right-2 lg:right-4 top-7 lg:top-3 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#1A0710A6]">
                        {inputText}
                      </p>
                    </div>
                  ) : (
                    <div className="password-input-container mt-4">
                      <div className="px-1 lg:px-3 border-2 border-[#DDDDDD] hover:border-[#5932EA] rounded-[10px]  py-1 lg:py-1  relative transition duration-300">
                        <label className="text-[14px]">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full input-style text-[12px]  p-1 lg:p-1  bg-transparent border-0 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              {errors[field.name] && (
                <span className="error">{errors[field.name]}</span>
              )}
            </div>
          </div>
        ))}
        {showAdditionalFields &&
          additionalFields &&
          additionalFields.map((field, index) => (
            <div key={index}>
              <div className="field-wrapper w-full ">
                <label>{field.label}</label>
                <>
                  <div className=" w-full">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                    />
                  </div>
                </>
                {errors[field.name] && (
                  <span className="error">{errors[field.name]}</span>
                )}
              </div>
            </div>
          ))}
      </div>
      <button
        className="w-full rounded-[8px] bg-[#5932EA] text-[#ffffff] hover:transition duration-300 mt-4 py-2 lg:py-3 font-[700]"
        onClick={handleButtonClick}
      >
        {buttonText}
      </button>
      <div className="flex gap-2 items-center mt-2">
        <input type="checkbox" />
        <p className="text-[12px]">Send me news and promotions</p>
      </div>
    </>
  );
};

export default Steps;
