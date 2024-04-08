import React from 'react';

export const CloseButton: React.FC<{ resetFunction: () => void }> = ({
  resetFunction,
}) => {
  return (
    <button
      onClick={resetFunction}
      type="button"
      className="absolute inset-y-0 right-4 flex items-center px-2 text-gray-700"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  );
};