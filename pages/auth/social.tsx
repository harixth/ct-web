import { NextPage } from "next";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { authState } from "../../store/auth";

const Social: NextPage = () => {
  const router = useRouter();
  const [_accessToken, setAccessToken] = useRecoilState(authState);
  const { isReady, query } = router;

  useEffect(() => {
    if (router.isReady) {
      const { token: authToken } = router.query;
      if (authToken) {
        setAccessToken(authToken as string);
        Router.push("/dashboard/overview");
      } else {
        Router.push("/");
      }
    }
  }, [isReady, query]);

  return null;
};

export default Social;
