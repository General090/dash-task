import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import TabContent from "./TabContent";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

import CloseIcon from "@mui/icons-material/Close";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [pendingLoginTabSwitch, setPendingLoginTabSwitch] = useState(false);

  const handleSwitchToLoginTab = () => {
    setPendingLoginTabSwitch(true);
    console.log('Working');
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (pendingLoginTabSwitch) {
      setActiveTab(1); // Assuming the second tab (index 1) is the login tab
      setPendingLoginTabSwitch(false); // Reset the pending state
    }
  }, [pendingLoginTabSwitch]);

  const tabData = [
    {
      label: "Register",
      content: (
        <SignUpForm
          switchToLoginTab={handleSwitchToLoginTab}
          switchToNextStep={handleNextStep}
          currentStep={currentStep} // Pass currentStep to SignUpForm
          setCurrentStep={setCurrentStep} // Pass setCurrentStep to SignUpForm
          setActiveTab={setActiveTab} // Pass setActiveTab to SignUpForm
        />
      ),
    },
    { label: "Log In", content: <LoginForm /> },
  ];

  return (
    <div className="tabs bg-[#fbfbfb] w-full h-screen flex justify-center items-center">
      <div className="bg-[#ffffff] relative shadow-xl w-[95%] md:w-[50%] lg:w-[35%] rounded-[20px] lg:px-8 px-5 md:px-5 py-8">
        <div className="tab-list w-full flex items-center justify-between py-2">
          {currentStep === 1 ? (
            <div className="flex gap-3">
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  isActive={index === activeTab}
                  onClick={() => setActiveTab(index)}
                />
              ))}
            </div>
          ) : (
            <h2 className="flex logoText font-[700] items-center">
              {currentStep === 2 ? (
                <>
                  Personal Details <span className="ml-8 text-sm logoText text-[#6BC62D] font-[600]">2 of 3</span>
                </>
              ) : (
                <>
                Add Address <span className="ml-8 text-sm logoText text-[#6BC62D] font-[600]">3 of 3</span>
              </>
              )}
            </h2>
          )}
          <CloseIcon />
        </div>
        <div className="tab-content-list">
          {tabData.map((tab, index) => (
            <TabContent key={index} isActive={index === activeTab}>
              {tab.content}
            </TabContent>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TabContainer;
