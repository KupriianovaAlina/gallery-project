import { navigationRoutes } from '../routes';

export const NavigationLinks = ({ url }) => (
  <ul className="text-center flex items-center font-bold text-gray md:gap-10 gap-3 text-base md:text-xl">
    <li
      className={`hover:text-orange ${url === '' ? 'text-orange' : 'text-gray'}`}
    >
      <a href={navigationRoutes.main()}>Main Page</a>
    </li>
    <li
      className={`hover:text-orange ${url === 'favorites' ? 'text-orange' : 'text-gray'}`}
    >
      <a href={navigationRoutes.favorites()}>Favorites</a>
    </li>
    <li
      className={`hover:text-orange ${url === 'history' ? 'text-orange' : 'text-gray'}`}
    >
      <a href={navigationRoutes.history()}>History</a>
    </li>
  </ul>
);
