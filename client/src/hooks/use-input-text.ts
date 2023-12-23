import React from "react";
import { UseInputText } from "./@types";
import helpers from "../helpers";

export function useInputText<T>(initialValues: T): T & UseInputText<T> {
  const passwordMsg =
    "Minimo 6 caracteres, uma letra maiuscula, um numero e um caractere especial";

  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<T>({} as T);

  function updateErrors(newErrors: { [T: string]: string }) {
    setErrors({
      ...errors,
      ...newErrors,
    });
  }

  function onChange(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.currentTarget;

    if (errors) setErrors({ ...errors, [name]: undefined });

    setValues({ ...values, [name]: value });
  }

  function onBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    const {
      name,
      value,
      type,
      required,
    }: EventTarget & (HTMLInputElement | HTMLTextAreaElement) =
      event.currentTarget;

    if (required && value === "") {
      updateErrors({ [name]: "Este campo é obrigatorio" });
      return;
    }

    if (type === "text" || type === "number") {
      if (required) {
        if (value === "") {
          updateErrors({ [name]: "Este campo é obrigatorio" });
          return;
        } else {
          updateErrors({ [name]: "" });
          return;
        }
      }
    }

    if (type === "url" || name === "website" || name === "url") {
      if (required) {
        if (value === "") {
          updateErrors({
            [name]: "URL inválida! Exemplo: https://dominio.com",
          });
          return;
        } else {
          updateErrors({ [name]: "" });
          return;
        }
      }

      if (value !== "") {
        updateErrors({
          [name]: "URL inválida! Exemplo: https://dominio.com",
        });
        return;
      } else {
        updateErrors({ [name]: "" });
        return;
      }
    }

    if (type === "email") {
      if (required) {
        if (!helpers.email.isValidEmail(value)) {
          updateErrors({ [name]: "email invalido" });
          return;
        } else {
          updateErrors({ [name]: "" });
          return;
        }
      }

      if (value !== "" && !helpers.email.isValidEmail(value)) {
        updateErrors({ [name]: "email invalido" });
        return;
      } else {
        updateErrors({ [name]: "" });
        return;
      }
    }

    if (type === "password") {
      if (!helpers.password.isValidPassword(value)) {
        updateErrors({
          [name]: passwordMsg,
        });
        return;
      } else {
        updateErrors({
          [name]: "",
        });
      }
    }
  }

  function updateInitial(key: string, value: string | number): void {
    setValues((prev) => {
      return { ...prev, [key]: value };
    });
  }

  function clear() {
    setValues(initialValues);
    setErrors({} as T);
  }

  return {
    ...values,
    errors,
    updateErrors,
    onChange,
    onBlur,
    clear,
    updateInitial,
  };
}
