import { ref } from "vue";

export default function useAlert() {
  const alertOpen = ref(false);

  let timerId;

  const showAlert = () => {
    clearTimeout(timerId);
    alertOpen.value = true;
    timerId = setTimeout(() => {
      alertOpen.value = false;
    }, 2000);
  };

  return {
    alertOpen,
    showAlert,
  };
}
