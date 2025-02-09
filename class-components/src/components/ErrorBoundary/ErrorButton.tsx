import { useState } from 'react';

const ErrorButton = ({ errorText }: { errorText: string }) => {
  const [generateError, setGenerateError] = useState(false);

  const handleClick = () => {
    setGenerateError(true);
  };

  if (generateError) {
    setGenerateError(false);
    throw new Error('I crashed!');
  }

  return (
    <button className="error-btn" onClick={handleClick}>
      {errorText}
    </button>
  );
};

export default ErrorButton;
