import React, { useState } from "react";
import "../style/payment.css";
import logo from "../assets/images/logo.png";


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || form.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/phonepe/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          amount: Number(form.amount),
        }),
      });

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Payment initiation failed");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
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
            <img src={logo} alt="mrpro" />
            <h2>Mr Professional</h2>
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
              Mr Professional and PhonePe, adhering to applicable laws.
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
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
            <input type="number" name="amount" placeholder="Enter Amount" value={form.amount} onChange={handleChange} required />
            <button type="submit">Proceed to Pay</button>
          </form>
        </div>

      </div>
    </div>
  );
}
