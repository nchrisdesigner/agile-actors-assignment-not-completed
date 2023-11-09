import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../components/app";

describe("<App /> Component", () => {
  it("should render <ContactForm />", () => {
    render(<App />);

    expect(screen.getByText("Contact Form")).toBeInTheDocument();
  });

  it("should hide <ContactForm /> after login", async () => {
    const user = userEvent.setup();
    render(<App />);

    const submitButton = screen.getByRole("button", { name: "Send" });

    await user.click(submitButton);

    expect(screen.queryByText("Contact Form")).not.toBeInTheDocument();
  });

  it("should show <Message /> after login", async () => {
    const user = userEvent.setup();
    render(<App />);

    const submitButton = screen.getByRole("button", { name: "Send" });

    await user.click(submitButton);

    expect(screen.getByText("Thank You")).toBeInTheDocument();
  });

  it("should not show <UserPanel /> until logged in", async () => {
    const user = userEvent.setup();
    render(<App />);

    const welcomeText = "Welcome, Test User";
    const loginButton = screen.getByRole("button", { name: "Log In" });

    expect(screen.queryByText(welcomeText)).not.toBeInTheDocument();

    await user.click(loginButton);

    expect(screen.getByText(welcomeText)).toBeInTheDocument();
  });

  it("should populate <ContactForm /> with user details (name, email) after login", async () => {
    const user = userEvent.setup();
    render(<App />);

    const loginButton = screen.getByRole("button", { name: "Log In" });

    await user.click(loginButton);

    expect(screen.getByLabelText("Your Name:")).toHaveValue("Test User");
    expect(screen.getByLabelText("Your Best Email:")).toHaveValue("user@example.com");
  });
});
