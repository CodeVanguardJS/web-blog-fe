import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="w-1/6 bg-primary p-4 flex flex-col items-center justify-between">
        <div className="flex items-center flex-col w-full">
          <div className="mb-5">
            <img
              className="py-5"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADjUlEQVRoQ+1abUsqQRQ+FiJhiKJhkC+FaBDSl/7/P0iSkEwlTFMwKog0IjK9PXuZubPnDu62L8FuM+AHdXbmPOc5L8+MJs7Pz9f0i0bCAI4524bhmBNMhmHDcMw8YEI6ZoT+B8cwbBiOmQd+X0jP5/P18/Mz3d/fx4xLO5xsNkt4JdZfA1+9vb3RaDSi19fX2AGv1WoWWAwJGG8+Pj7o5uYmVqCPj49pd3dXkphYLpfr7e1t+cHLywsNBoNYsMzBrlYrSnS73TUoTyaTEuRkMol8TheLRSqVShKTiF6rSqfTaWo0GrS1tWVNWCwW1Ov1Is3y6empJBHM9vt9K1VlW6rX65TJZCTI6+vryOZyoVCgarUqsTw8PNB4PP5btMSd1qZJUaNaJQ/sXlxc/Cta6iXe2dlZIMVLDScs6KYQVioV2tvbs+Xc5eWlJ1+r+/P0tCktdeL7+zt1Oh1PG6LnHR0dyZqARTYVQj4frAyHQ4Ig8jJU4tRwtoU03jSbTUqlUtYePBS+u/Hh4SHl83n52OfnJ7Xbbe0yPCJmsxlNp9PvbmnN59VZdTS+szHM+1ar1fK0qXjo5OSEdnZ25BpgDMJGHaoKwud+OwQHjOKLgYgDmTbAfHO/gHm7w8aQr4+Pj5YRvFAiCiB6/MhbjgEOVtMrVMAAdXBwQPv7+5JUCAAUIzgD1VRVeaozvIYWB4z9hKhCXQodMAznqfL09GQZofZ9fHZ7e+sVp3yOAxZfiOL1I4A5myiIQtXBID8dgXtIB1htiz8CWFc9haGq7PNN79cCOsCqagy1SrvxftAHFQ6YR48NsNqHN/VNr0zw3ox1gspdYRMvkrwVhqK0dA7RqS/MQ0jf3d3JVuXVmeI53oc3Ag5KS+uM5mpKnSNalV+w4nkVB66urq6u5NKSYe4ZrkH9GMPzSmhkcc+EtXUqzOueqnN5aoZ+HuZqSmWTsx6E8ICT+NleLYwWYJ5fPAy8etpJTYUhLWEr8CCqxFCdHOqdFve0Lmz5HDdnZzcEcHUnDiWh3VrqLtF0B3pdFATRm3XrIp9DuZd2OiVxhrhzglJfSJlyuWyTsaH88uDmHMxB89AOso7gQk+cyxNB/7bElY5bxaYLQT83H9yhYDuXy5l/8bgpgJGe8/t+HzZ/Lo10wDobb0La2UfRnmEYjjZ/ztYbhp19FO0ZhuFo8+dsvWHY2UfRnmEYjjZ/ztb/AcmC3wHFaBA5AAAAAElFTkSuQmCC"
              alt="photo-profile"
            />
            <h2 className="text-white text-lg font-bold">Name</h2>
          </div>
          <nav className="w-full">
            <ul className="flex flex-col gap-3 w-full text-center">
              <li className="hover:bg-orange-800 w-full py-5">
                <Link
                  to="/profile"
                  className="text-white hover:text-secondary"
                >
                  Profile
                </Link>
              </li>
              <li className="hover:bg-orange-800 w-full py-5">
                <Link
                  to="/dashboard"
                  className="text-white hover:text-secondary"
                >
                  Dashboard
                </Link>
              </li>
              <li className="hover:bg-orange-800 w-full py-5">
                <Link to="/articles/list" className="text-white hover:text-secondary">
                  Article
                </Link>
              </li>
              <li className="hover:bg-orange-800 w-full py-5">
                <Link
                  to="/categories"
                  className="text-white hover:text-secondary"
                >
                  Categories
                </Link>
              </li>
              <li className="hover:bg-orange-800 w-full py-5">
                <Link
                  to="/"
                  className="text-white hover:text-secondary"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
		<div className="w-full"><button className="w-full py-5 text-white hover:text-secondary bg-orange-700">Logout</button></div>
      </div>
    </>
  );
};

export default SideBar;
