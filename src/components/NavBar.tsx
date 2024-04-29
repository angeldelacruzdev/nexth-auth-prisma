import { getServerSession } from "next-auth/next";

import Link from "next/link";
import React from "react";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
 
  return (
    <div className="container mx-auto">
      <nav className="flex  justify-between bg-slate-100 px-4 py-4 rounded">
        <h1>NextAuth</h1>
        <ul className="flex flex-row gap-4 ">
          {!session ? (
            <>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/auth/login"}>Log In</Link>
              </li>
              <li>
                <Link href={"/auth/register"}>Sign In</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <Link href={"/logout"}>Log Out</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
