import { useStore } from "vuex";
import { ref } from "vue";

export default function useFetching() {
  const { dispatch } = useStore();
  const responseError = ref("");
  const isFetched = ref(true);

  const fetchAction = async (name, data) => {
    isFetched.value = false;
    responseError.value = (await dispatch(name, data)).error;
    isFetched.value = true;
  };

  return {
    responseError,
    isFetched,
    fetchAction,
  };
}
