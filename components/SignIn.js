import { authContext } from "@/lib/store/auth-context";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
export const SignIn = () => {
  const { googleLoginHandler } = useContext(authContext);
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Welcome</h1>

      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 rounded-2xl bg-slate-800">
        <div className="h-52">
          <img
            className="object-cover w-full h-full"
            src="https://tse4.mm.bing.net/th?id=OIP.baS9_PyQVddvMUtXeEZBCwHaE7&pid=Api&P=0&h=180"
          />
        </div>
        <div className="px-4 py-4 flex flex-col items-center gap-2">
          <h3 className="text-2xl text-center">Please sign to continue</h3>
          <button
            className="btn btn-primary-outline text-center flex"
            onClick={googleLoginHandler}
          >
            <FcGoogle />
          </button>
        </div>
      </div>
    </main>
  );
};
