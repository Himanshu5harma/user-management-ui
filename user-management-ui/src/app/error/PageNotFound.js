import {Link} from 'react-router-dom'
import { HOME_ROUTE_PATH } from '../../data/Constant';
const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-medium">404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <div className='mt-5'>
        <Link
          to={HOME_ROUTE_PATH}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Go back to Home
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
