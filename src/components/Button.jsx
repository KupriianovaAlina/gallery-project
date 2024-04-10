import { NavLink } from 'react-router-dom';

export const Button = ({ text, to, onClick }) => (
  <NavLink
    className="inline-block w-28 py-2 mx-5 text-gray text-center md:text-lg text-sm font-bold border border-orange rounded-md hover:bg-orange hover:text-white"
    to={to}
    onClick={onClick}
  >
    {text}
  </NavLink>
);
