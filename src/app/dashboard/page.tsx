'use client'
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <>
      <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-black text-5xl">Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="bg-black text-white px-4 py-2 rounded-md mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
