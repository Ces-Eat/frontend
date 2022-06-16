import { Button } from "@mui/material";
import React, { useState } from "react";

const MultiStep: React.FC = ({ children }) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement[];
  const [currentStep, setCurrentStep] = useState(0);
  const currentChild = childrenArray[currentStep];

  function isLastStep() {
    return currentStep === childrenArray.length - 1;
  }

  const onSubmit = () => {
    if (!isLastStep()) {
      setCurrentStep((s) => s + 1);
    }
  };

  return (
    <div>
      {currentChild}{" "}
      {currentStep > 0 && (
        <Button onClick={() => setCurrentStep((s) => s - 1)} type="button">
          Précèdent
        </Button>
      )}
      <Button onClick={onSubmit} type={isLastStep() ? "submit" : "button"}>
        {isLastStep() ? "Inscription" : "Suivant"}
      </Button>
    </div>
  );
};

export default MultiStep;
