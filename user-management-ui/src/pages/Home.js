import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LOGIN_ROUTE_PATH } from "../data/Constant";

const Home = (props) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) navigate(LOGIN_ROUTE_PATH);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-3 gap-4">
          {/* Tile 1 */}
          <div className="bg-gray-200 p-4 text-center rounded-lg">
            <img src="image1.png" alt="Image 1" className="w-52 h-52 mx-auto" />
            <p className="mt-2">Option 1</p>
          </div>

          {/* Tile 2 */}
          <div className="bg-gray-200 p-4 text-center rounded-lg">
            <img src="image2.png" alt="Image 2" className="w-52 h-52 mx-auto" />
            <p className="mt-2">Option 2</p>
          </div>

          {/* Tile 3 */}
          <div className="bg-gray-200 p-4 text-center rounded-lg">
            <img src="image3.png" alt="Image 3" className="w-52 h-52 mx-auto" />
            <p className="mt-2">Option 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
