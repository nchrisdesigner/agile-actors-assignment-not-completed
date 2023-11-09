import React, { useState } from "react";
import { ContactForm } from "./contact-form";
import { Message } from "./message";
import { UserPanel } from "./user-panel";

const CONTACT_FORM_DEFAULTS = {
  name: "",
  email: "",
  option: "",
  select: "1",
  message: "",
  terms: false,
};

export const App = () => {
  const [isContactSent, setIsContactSent] = useState(false);
  const [contact, setContact] = useState(CONTACT_FORM_DEFAULTS);
  const [currentUser, setCurrentUser] = useState(null);

  const contactChanged = (newContact) => setContact(newContact);

  const sendContact = (newContact) => {
    // For now just mark it as `sent`
    setIsContactSent(true);
    setContact(CONTACT_FORM_DEFAULTS)
  };

  // console.log(isContactSent);

  const logIn = () =>
    setCurrentUser({
      name: "Test User",
      email: "user@example.com",
    });

    if(isContactSent) return <Message text="Thank You" />


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="pull-right">
            <button className="btn btn-default" onClick={logIn}>
              <UserPanel  />
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <h2>Contact us</h2>
          <p>Please fill in form on the right to get fast reply</p>
          <img
            style={{ width: "100%" }}
            src="http://via.placeholder.com/300x200"
            alt="placeholder"
          />
        </div>

        <div className="col-md-8">

          <ContactForm currentUser={currentUser} data={contact} onChange={contactChanged} onSubmit={sendContact} />

        </div>
      </div>
    </div>
  );
};
