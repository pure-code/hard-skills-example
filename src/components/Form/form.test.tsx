import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./index";
import { FormProps } from "./interfaces";

const formProps: FormProps = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  fields: [
    { name: "field1", placeholder: "placeholder1" },
    { name: "field2", placeholder: "placeholder2" },
  ],
  heading: "",
  error: false,
};

describe("Form component", () => {
  test("Проверяем отрисовку полей", () => {
    const { baseElement } = render(<Form {...formProps} />);
    const inputs = baseElement.querySelectorAll("input");

    expect(inputs.length).toEqual(formProps.fields.length);
  });

  test("Заполняем данными", () => {
    const { baseElement } = render(<Form {...formProps} />);
    const inputs = baseElement.querySelectorAll("input");

    inputs.forEach((el) => {
      fireEvent.change(el, { target: { value: "test value" } });
      expect(formProps.onChange).toBeCalledWith(el.name, "test value");
    });
  });

  test("Проверяем отправку пустой формы", () => {
    const formPropsWithError = { ...formProps, error: true };
    const { getByTestId } = render(<Form {...formPropsWithError} />);
    const submitBtn = getByTestId("submitBtn");

    userEvent.click(submitBtn);

    expect(formProps.onSubmit).not.toBeCalled();
  });

  test("Проверяем отправку формы", () => {
    const { getByTestId } = render(<Form {...formProps} />);
    const submitBtn = getByTestId("submitBtn");

    userEvent.click(submitBtn);

    expect(formProps.onSubmit).toBeCalled();
  });
});
