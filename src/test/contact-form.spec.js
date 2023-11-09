import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../components/contact-form";

const testContactData = {
  name: "Test",
  email: "test@example.com",
  option: "A",
  select: "3",
  message: "Test message",
  terms: true,
};

describe("<ContactForm /> Component", () => {
  it("should call onSubmit when send button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: "Send" });
    await user.click(submitButton);

    expect(onSubmit).toBeCalled();
    expect(onSubmit).lastCalledWith(testContactData);
  });

  it("should call onSubmit when Enter is pressed inside a field", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Your Name:"), "{Enter}");

    expect(onSubmit).toBeCalled();
    expect(onSubmit).lastCalledWith(testContactData);
  });

  it("should not call onSubmit when Enter is pressed inside a textarea", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const onChange = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Message:"), "{Enter}");

    expect(onSubmit).not.toBeCalled();
  });

  it("should call onChanges with updated contact data when `name` field changes", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Your Name:"), "A");

    expect(onChange).toBeCalled();
    expect(onChange).lastCalledWith({
      ...testContactData,
      name: testContactData.name + "A",
    });
  });

  it("should call onChanges with updated contact data when `email` field changes", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Your Best Email:"), "A");

    expect(onChange).toBeCalled();
    expect(onChange).lastCalledWith({
      ...testContactData,
      email: testContactData.email + "A",
    });
  });

  it("should call onChanges with updated contact data when `options` field changes", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    // If the default value is correctly set to A
    // then clicking Option A should do nothing
    await user.click(screen.getByLabelText("Option A"));
    expect(onChange).not.toBeCalled();

    await user.click(screen.getByLabelText("Option B"));
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).lastCalledWith({
      ...testContactData,
      option: "B",
    });

    await user.click(screen.getByLabelText("Option C"));
    expect(onChange).toBeCalledTimes(2);
    expect(onChange).lastCalledWith({
      ...testContactData,
      option: "C",
    });
  });

  it("should call onChanges with updated contact data when `select` field changes", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    const selectField = screen.getByLabelText("What can we help you with:");
    const selectFieldOptions = ["1", "2", "3", "4"];

    for (const [index, option] of Object.entries(selectFieldOptions)) {
      await user.selectOptions(selectField, option);
      expect(onChange).toBeCalledTimes(Number(index) + 1);
      expect(onChange).lastCalledWith({ ...testContactData, select: option });
    }
  });

  it("should call onChanges with updated contact data when `message` field changes", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Message:"), "A");

    expect(onChange).toBeCalled();
    expect(onChange).lastCalledWith({
      ...testContactData,
      message: testContactData.message + "A",
    });
  });

  it("should call onChanges with updated contact data when `terms` field changes", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    await user.click(screen.getByLabelText("I agree to terms and conditions"));

    expect(onChange).toBeCalled();
    expect(onChange).lastCalledWith({
      ...testContactData,
      terms: !testContactData.terms,
    });
  });

  it("should update `name` field value", () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const { rerender } = render(
      <ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />
    );

    expect(screen.getByLabelText("Your Name:")).toHaveDisplayValue(testContactData.name);

    const changedContactData = {
      ...testContactData,
      name: "Changed",
    };

    rerender(<ContactForm data={changedContactData} onChange={onChange} onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Your Name:")).toHaveDisplayValue(changedContactData.name);
  });

  it("should update `email` field value", () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const { rerender } = render(
      <ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />
    );

    expect(screen.getByLabelText("Your Best Email:")).toHaveDisplayValue(testContactData.email);

    const changedContactData = {
      ...testContactData,
      email: "Changed",
    };

    rerender(<ContactForm data={changedContactData} onChange={onChange} onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Your Best Email:")).toHaveDisplayValue(changedContactData.email);
  });

  it("should show correct initial value for `options` field", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    const selectFieldOptions = [
      { label: "I have question about my membership", selected: false },
      { label: "I have technical question", selected: false },
      { label: "I would like to change membership", selected: true },
      { label: "Other question", selected: false },
    ];

    for (const { label, selected } of selectFieldOptions) {
      expect(screen.getByRole("option", { name: label }).selected).toBe(selected);
    }
  });

  it("should update `options` field", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const { rerender } = render(
      <ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />
    );

    expect(screen.getByLabelText("Option A")).toBeChecked();
    expect(screen.getByLabelText("Option B")).not.toBeChecked();
    expect(screen.getByLabelText("Option C")).not.toBeChecked();

    const changedContactData1 = {
      ...testContactData,
      option: "B",
    };

    rerender(<ContactForm data={changedContactData1} onChange={onChange} onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Option A")).not.toBeChecked();
    expect(screen.getByLabelText("Option B")).toBeChecked();
    expect(screen.getByLabelText("Option C")).not.toBeChecked();

    const changedContactData2 = {
      ...testContactData,
      option: "C",
    };

    rerender(<ContactForm data={changedContactData2} onChange={onChange} onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Option A")).not.toBeChecked();
    expect(screen.getByLabelText("Option B")).not.toBeChecked();
    expect(screen.getByLabelText("Option C")).toBeChecked();
  });

  it("should update `select` field value", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const { rerender } = render(
      <ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />
    );

    expect(screen.getByRole("option", { name: "I have technical question" }).selected).toBe(false);
    expect(screen.getByRole("option", { name: "I would like to change membership" }).selected).toBe(
      true
    );

    const changedContactData = {
      ...testContactData,
      select: "2",
    };

    rerender(<ContactForm data={changedContactData} onChange={onChange} onSubmit={onSubmit} />);

    expect(screen.getByRole("option", { name: "I have technical question" }).selected).toBe(true);
    expect(screen.getByRole("option", { name: "I would like to change membership" }).selected).toBe(
      false
    );
  });

  it("should update `message` field value", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const { rerender } = render(
      <ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />
    );

    expect(screen.getByLabelText("Message:")).toHaveDisplayValue(testContactData.message);

    const changedContactData = {
      ...testContactData,
      message: "Changed",
    };

    rerender(<ContactForm data={changedContactData} onChange={onChange} onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Message:")).toHaveDisplayValue(changedContactData.message);
  });

  it("should render options with labels using component`s `options` values", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ContactForm data={testContactData} onChange={onChange} onSubmit={onSubmit} />);

    const selectFieldOptions = [
      "I have question about my membership",
      "I have technical question",
      "I would like to change membership",
      "Other question",
    ];

    for (const option of selectFieldOptions) {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    }
  });
});
