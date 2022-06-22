import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import s from "./MultiStep.module.scss";

interface Props {
  loading: boolean;
  disabled: boolean;
  buttonText: string;
  children: React.ReactNode;
}

const MultiStep: React.FC<Props> = ({
  children,
  loading,
  disabled,
  buttonText,
}) => {
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
      setCurrentStep((step) => step + 1);
    }
  };

  return (
    <div>
      {currentChild}{" "}
      <Container className={s.container}>
        {currentStep > 0 && (
          <Button
            onClick={() => setCurrentStep((step) => step - 1)}
            type="button"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Précèdent
          </Button>
        )}
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={onSubmit}
          type={isLastStep() ? "submit" : "button"}
          loading={loading}
          disabled={isLastStep() && disabled}
        >
          {isLastStep() ? buttonText : "Suivant"}
        </LoadingButton>
      </Container>
    </div>
  );
};

export default MultiStep;
