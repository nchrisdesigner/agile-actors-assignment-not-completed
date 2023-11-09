import React, { useEffect } from "react";
import { object, func } from "prop-types";
import { Message } from "./message";

const defaultData = {
  name: "",
  email: "",
  option: "A",
  select: "1",
  message: "",
  terms: false,
};

const options = [
  { id: "1", label: "Option A" },
  { id: "2", label: "Option B" },
  { id: "3", label: "Option C" },
];

export const ContactForm = ({ data = defaultData, onChange, onSubmit, currentUser }) => {

  // Submit onClick
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
    // console.log(data);
    // console.log('DATA SUBMITTED');
  };

  // Submit on press Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  //On change function
  const fieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    onChange((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };


  // console.log(currentUser);


  return (
    <form onSubmit={handleSubmit}>
      <h3>Contact Form</h3>

      <div className="form-group">
        <label htmlFor="input-name" className="form-label">
          Your Name:
        </label>
        <input
          id="input-name"
          name="name"
          className="form-control"
          value={!currentUser ?  data.name : currentUser.name}
          onChange={fieldChange}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="form-group">
        <label htmlFor="input-email" className="form-label">
          Your Best Email:
        </label>
        <input
          id="input-email"
          name="email"
          className="form-control"
          value={!currentUser ?  data.email : currentUser.email}
          onChange={fieldChange}
          onKeyDown={handleKeyPress}
        />
      </div>

      <label className="form-label">Select your membership option:</label>
      <div className="form-group row">
        {options.map((option) => (
          <label key={option.id} className="form-label col-xs-4">
            <input
              type="radio"
              name="option"
              value={option.label}
              checked={data.option === option.label}
              onChange={fieldChange}
              onKeyDown={handleKeyPress}
            />
            {option.label}
          </label>
        ))}
      </div>

      <hr />

      <div className="form-group">
        <label htmlFor="input-select" className="form-label">
          What can we help you with:
        </label>
        <select
          id="input-select"
          className="form-control"
          name="select"
          value={data.select}
          onChange={fieldChange}
          onKeyDown={handleKeyPress}
        >
          {/* {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))} */}
//           <option value="1">I have question about my membership</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="input-message" className="form-label">
          Message:
        </label>
        <textarea
          id="input-message"
          name="message"
          rows="10"
          placeholder="Please type your question here"
          className="form-control"
          value={data.message}
          onChange={fieldChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="input-terms" className="form-label">
          <input
            id="input-terms"
            type="checkbox"
            name="terms"
            checked={data.terms}
            onChange={fieldChange}
            onKeyDown={handleKeyPress}
          />
          I agree to terms and conditions
        </label>
      </div>

      <button type="submit" className="contactform-submit">
        Send
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  data: object.isRequired,
};

export default ContactForm;
