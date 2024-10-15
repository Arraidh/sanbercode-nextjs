import { ChevronDownIcon } from "@chakra-ui/icons";
import { MenuButton, Menu, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";

export default function MenuNavbar() {
  const router = useRouter();
  const { mutates } = useMutation();
  const { data } = useQueries({
    prefixUrl: "https://service.pace-unv.cloud/api/user/me",
    headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
  });

  const handleLogout = async () => {
    const response = await mutates({
      url: "https://service.pace-unv.cloud/api/logout",
      method: "POST",
      headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
    });

    if (!response?.success) {
    } else {
      router.push("/login");
      Cookies.remove("user_token");
    }
  };

  console.log(data);
  return (
    <div className="flex gap-4 items-center text-black">
      <a href="/" className="text-sm font-bold ">
        Home
      </a>
      <a href="/profile" className="text-sm font-bold ">
        Profile
      </a>
      <a href="/chess-gm" className="text-sm font-bold ">
        Chess GM
      </a>
      <a href="/notes" className="text-sm font-bold ">
        Notes
      </a>
      <a href="/login" className="text-sm font-bold ">
        Login
      </a>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {data?.data.name}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
