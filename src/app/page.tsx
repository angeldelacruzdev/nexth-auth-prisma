import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-black text-5xl mb-7">Home Page</h1>
          <Link
            href={"/auth/login"}
            className="bg-black text-white px-4 py-2 rounded-md "
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
