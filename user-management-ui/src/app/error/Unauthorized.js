import {Link} from 'react-router-dom'
import { HOME_ROUTE_PATH } from '../../data/Constant';
const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-medium">Unauthorized !!</h1>
        <p>Oops! You are not authorized to access this section</p>
        <div className='mt-5'>
        <Link
          to={HOME_ROUTE_PATH}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Go back to Home
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
