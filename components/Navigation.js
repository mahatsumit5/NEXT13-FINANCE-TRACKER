import { useContext } from "react";
import { ImStatsBars } from "react-icons/im";

import { authContext } from "@/lib/store/auth-context";
export default function Nav() {
  const { user, loading, logout } = useContext(authContext);
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex justify-between items-center">
        {" "}
        {/* user information */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* img  */}
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
              />
            </div>
            <small>Hi, {user.displayName}</small>
          </div>
        )}
        {/* navgationi */}
        {user && !loading && (
          <nav className="flex items-center gap-2">
            <div>
              <a href="#stats">
                <ImStatsBars className="text-2xl" />
              </a>
            </div>
            <div>
              <button className="btn btn-danger" onClick={logout}>
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
