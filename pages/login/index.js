import { useMutation } from "@/hooks/useMutation";
import { Button, Heading, Input, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { mutates } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    const response = await mutates({
      url: "https://service.pace-unv.cloud/api/login",
      payload,
    });

    if (!response?.success) {
      toast({
        title: "Login Gagal",
        description: "Email dan password tidak sesuai",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      Cookies.set("user_token", response?.data.token, {
        expires: new Date(response?.data.expires_at),
        path: "/",
      });
      router.push("/");
    }

    console.log("response", response);
  }
  return (
    <div className="container max-w-md mx-auto p-8">
      <Stack>
        <Heading size={"xl"}>Login</Heading>
        <Input
          value={payload?.email}
          onChange={(event) =>
            setPayload({ ...payload, email: event.target.value })
          }
          placeholder="Email"
        />
        <Input
          value={payload?.password}
          type="password"
          onChange={(event) =>
            setPayload({ ...payload, password: event.target.value })
          }
          placeholder="Password"
        />
        <Button onClick={handleSubmit}>Login</Button>
      </Stack>
    </div>
  );
}
