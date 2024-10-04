import Menu from "../menu";
import { withAuth } from "../with-auth";
import Image from "next/image";
import navIcon from "@/public/next.png";

function Header() {
  return (
    <div className="w-full flex justify-between p-4 items-center cursor-pointer bg-white rounded-lg">
      <Image
        src={navIcon}
        width={32}
        height={32}
        alt="next js"
        blurDataURL="data:..."
        placeholder="blur"
      />
      {/* <h1 className="text-xl">Sanbercode Next JS</h1> */}
      <Menu />
    </div>
  );
}

export default withAuth(Header);
