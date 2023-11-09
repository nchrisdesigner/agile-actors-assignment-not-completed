import React from "react";
import { render, screen } from "@testing-library/react";
import { Message } from "../components/message";

describe("<Message /> Component", () => {
  it("should render <Message /> with no header and empty content", () => {
    const { container } = render(<Message />);

    expect(container).toHaveTextContent("");
  });

  it("should render <Message /> with header when `header` prop was provided", () => {
    const testHeader = "Test Header";

    render(<Message header={testHeader} />);

    expect(screen.getByRole("heading", { name: testHeader })).toBeInTheDocument();
  });

  it("should render <Message /> with body when `text` prop was provided", () => {
    const testText = "Test Text";

    render(<Message text={testText} />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("should render <Message /> content children when `text` prop was not provided", () => {
    const testText = "Test HTML Content";
    const testContent = <div>{testText}</div>;

    render(<Message>{testContent}</Message>);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
