import { Link } from 'react-router-dom';
import { navigationRoutes } from '../routes';

export const NotFound = () => {
  return (
   <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold not-found-text">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
      <p className="mt-6 text-base leading-7 text-white">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link className='not-found-button inline-block w-28 text-center py-2 mx-5 text-black rounded-md transition-colors duration-300'
        to={navigationRoutes.main()}>
          Go back
        </Link>
      </div>
    </div>
   </div>
  );
};