import React, { useState } from "react";
import "../style/payment.css";
import puLogo from "../assets/images/pu-logo.png"; // use your PU logo here

export default function Payment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment flow will be integrated here");
  };

  return (
    <div className="payment-page">
      <div className="payment-container">

        {/* LEFT SIDE */}
        <div className="payment-left">
          <h1 className="section-title">
            Consultancy Services
            <span className="underline" />
          </h1>

          <div className="brand">
            <img src={puLogo} alt="mrpro" />
            <h2>
             Mr Professional <br /> 
            </h2>
          </div>

          <p className="tagline">"One-Stop Corporate Solution"</p>

          <div className="contact">
            <h4>Contact Us:</h4>
            <p>📧 info@mrprofessional.co.in</p>
            <p>📞 +91-8800932090</p>
            <p>📞 +91-94157 18705</p>
          </div>

          <div className="terms">
            <h4>Terms & Conditions:</h4>
            <p>
              You agree to share information entered on this page with
              Mr Professional (owner of this page) and PhonePe,
              adhering to applicable laws.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="payment-right">
          <h2 className="section-title">
            Payment Details
            <span className="underline" />
          </h2>

          <form onSubmit={handleSubmit} className="payment-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>

      </div>
    </div>
  );
}
