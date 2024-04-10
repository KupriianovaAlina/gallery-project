import { NavLink } from 'react-router-dom';

interface ButtonProps {
  text: string;
  to: string;
}

export const Button: React.FC<ButtonProps> = ({ text, to }) => (
  <NavLink
    className="header-button inline-block w-28 text-center py-2 mx-5 text-black rounded-md transition-colors duration-300"
    to={to}
  >
    {text}
  </NavLink>
);
