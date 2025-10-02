import Image from "next/image";
import { logout } from "./logout/actions";

export default function Home() {
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
}
