import React from 'react'
import Loading from './Loading';

const Button = ({isDisabled, isLoading,onClick,text}) => {
  return (
    <button
      type="submit"
      className="font-semibold text-white bg-[var(--primary-color)]  w-full p-2 rounded-md mt-3 hover:bg-white hover:text-black cursor-pointer"
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? <Loading /> : text}
    </button>
  );
}

export default Button