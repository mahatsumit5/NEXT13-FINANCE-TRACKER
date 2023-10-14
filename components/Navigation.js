import { ImStatsBars } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

export default function Nav() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex justify-between items-center">
        {" "}
        {/* user inf */}
        <div className="flex items-center gap-2">
          {/* img  */}
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-768x832.jpg"
              alt="profile img"
            />
          </div>
          <small>Hi, Sumit</small>
        </div>
        {/* navgationi */}
        <nav className="flex items-center gap-2">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
