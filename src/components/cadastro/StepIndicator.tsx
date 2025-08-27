import React from "react";
import "../../styles/cadastroStyle/StepIndicator.css";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`step ${currentStep === i + 1 ? "active" : ""}`}
        >
          <span>{i + 1}</span>
        </div>
      ))}
    </div>
  );
}
