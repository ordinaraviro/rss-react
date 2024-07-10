import { useState } from "react";
import "./ErrorButton.scss";

const ErrorButton = (errorText: string) => {
  const [generateError, setGenerateError] = useState(false);

  const handleClick = () => {
    setGenerateError(true);
  }

  if (generateError) {
    throw new Error("I crashed!");
  }

  return(
      <button className="error-btn" onClick={handleClick}>
        {errorText}
      </button>
  )
}

export default ErrorButton;
