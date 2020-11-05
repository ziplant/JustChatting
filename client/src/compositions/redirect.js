import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default function useRedirect() {
  const router = useRouter();
  const { getters } = useStore();

  const notVerifiedRedirect = () => {
    if (!getters.isAuthorized) {
      router.push("/login");
      return true;
    }
    return false;
  };

  const verifiedRedirect = (path) => {
    if (getters.isAuthorized) {
      router.push(path);
    }
  };

  const redirect = (path) => {
    router.push(path);
  };

  return {
    notVerifiedRedirect,
    verifiedRedirect,
    redirect,
  };
}
