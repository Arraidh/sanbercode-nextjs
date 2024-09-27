import Menu from "../menu";
import { withAuth } from "../with-auth";

function Header() {
  return (
    <div className="w-full flex justify-between p-4 items-center cursor-pointer">
      <h1 className="text-xl">Sanbercode Next JS</h1>
      <Menu />
    </div>
  );
}

export default withAuth(Header);
