export default function useValidate() {
  const authValidate = (form) => {
    let { login, password, confirmPassword } = form.elements;
    let valid = true;

    if (!login.value) {
      login.classList.add("invalid");
      valid = false;
    }

    if (password.value.length < 5) {
      password.classList.add("invalid");
      valid = false;
    }

    if (confirmPassword && password.value != confirmPassword.value) {
      confirmPassword.classList.add("invalid");
      valid = false;
    }

    return valid;
  };

  const groupValidate = (form) => {
    let { title, description } = form;
    let valid = true;

    if (!title.value) {
      title.classList.add("invalid");
      valid = false;
    }

    if (!description.value) {
      description.classList.add("invalid");
      valid = false;
    }

    return valid;
  };

  return {
    authValidate,
    groupValidate,
  };
}
