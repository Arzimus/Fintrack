import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <UserButton />
      <h1>This is an authenticated route</h1>
    </div>
  );
}
