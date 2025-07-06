import React from "react";
import { useNavigate } from "react-router-dom";
import imgFrame from "../assets/img/Frame.png";
import CloseIcon from "@mui/icons-material/Close";

const SuccessPage = ({ switchToLoginTab, handleSwitchToLoginTab }) => {
  const navigate = useNavigate();

  const handleHomeAndLogin = ({ switchToLoginTab }) => {
    navigate("/");
    // switchToLoginTab();
    handleSwitchToLoginTab();
  };

  return (
    <div>
      <div className="tabs bg-[#fbfbfb]  w-full h-screen flex justify-center items-center">
        <div className="bg-[#ffffff] relative shadow-xl  w-[90%] md:w-[45%] lg:w-[35%] rounded-[20px] h-[85%]">
          <div className="rounded-[20px] ">
            <div className="overflow-hidden ">
              <img src={imgFrame} className="" alt="" />
              <CloseIcon
                className="absolute top-3 right-3 cursor-pointer  text-[24px] text-[#1A0710A6]"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="div px-6 my-8">
              <h2 className="text-[#1a0710da] text-[20px] md:text-[30px] font-[800] hello ">
                You are successfully registered !
              </h2>
            </div>
            <div className="px-2 my-8 justify-center flex items-center">
              <button
                className=" w-[90%]  rounded-[8px] bg-[#5932EA] text-[#ffffff] hover:transition duration-300 mt-4  py-2 lg:py-3 font-[700]"
                onClick={handleHomeAndLogin}
              >
                Go to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
