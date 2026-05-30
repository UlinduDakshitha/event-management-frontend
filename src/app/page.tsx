"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    number: "",
    email: "",
    privacyPolicy: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Countdown to Nov 13, 2024 or any future date
    const targetDate = new Date("2024-11-13T09:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate > now ? targetDate - now : 0;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyPolicy) {
      setError("You must agree to the privacy policy.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Map frontend form data to backend expected format
    const payload = {
      name: formData.name,
      email: formData.email,
      professional_focus: `${formData.jobTitle} at ${formData.company}`,
    };

    try {
      const response = await fetch("http://localhost:8000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to submit registration. Server responded with error.",
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h4>Exclusive Invitation</h4>
          <h1>
            Troubled Waters: <span>Sailing with AI in Supply Chain</span>
          </h1>
          <p>Date - 13th November 2024</p>
          <p>Time - 09.30AM to 01.00PM</p>
          <p>Location - Marriott Resort, The Palm</p>
          <a href="#register-form" className="btn-primary">
            Register Now &rarr;
          </a>
        </div>
      </section>

      <section className="countdown-section">
        <h3>
          Count Every <br />
          Second Until <br /> the Event
        </h3>
        <div className="timer">
          <div>
            {timeLeft.days}
            <span>Days</span>
          </div>{" "}
          :
          <div>
            {timeLeft.hours}
            <span>Hours</span>
          </div>{" "}
          :
          <div>
            {timeLeft.minutes}
            <span>Minutes</span>
          </div>{" "}
          :
          <div>
            {timeLeft.seconds}
            <span>Seconds</span>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Navigate the Complexities of Gulf Supply Chain & Logistics</h2>
        <p>
          The Gulf's supply chains are under pressure from rising costs,
          geopolitical instability, and shifting sustainability mandates,
          forcing CFOs, COOs, and supply chain leaders to reduce costs, build
          resilience, and integrate sustainable practices without compromising
          performance, with AI-powered SCM and WMS solutions being key to
          future-proofing logistics and driving efficiency.
        </p>
        <p>
          This exclusive event offers practical insights and real-world
          strategies to streamline operations, reduce risks, and meet
          sustainability goals while staying ahead of market volatility.
        </p>
        <a href="#register-form" className="btn-primary">
          Register Now &rarr;
        </a>
      </section>

      <section className="reasons-section">
        <h2>Top 3 Reasons to Attend:</h2>

        <div className="reason-row">
          <div className="reason-content">
            <h3>Gen AI SCM Platform Unveiled:</h3>
            <p>
              Explore how AI powered SCM innovations offer predictive analytics,
              automation, improved visibility, and sustainability into Supply
              Chains such as yours.
            </p>
          </div>
          <div className="reason-image">
            <img src="/reason_1.png" alt="AI Technology" />
          </div>
        </div>

        <div className="reason-row">
          <div className="reason-content">
            <h3>Customer Success Stories That Deliver Results</h3>
            <p>
              Hear how companies partnered with experts to optimize logistics
              flows, cut costs, and improve resilience while reducing their
              environmental impact through smarter inventory management and
              automation.
            </p>
          </div>
          <div className="reason-image">
            <img src="/reason_2.png" alt="Customer Success" />
          </div>
        </div>

        <div className="reason-row">
          <div className="reason-content">
            <h3>Practical Solutions for Green and Resilient Operations</h3>
            <p>
              Learn how to navigate geopolitical risks, last-mile delivery
              challenges, and integrate eco-friendly practices - keeping
              operations agile and competitive in an evolving Gulf market.
            </p>
          </div>
          <div className="reason-image">
            <img src="/reason_3.png" alt="Green Logistics" />
          </div>
        </div>
      </section>

      <div className="red-banner">
        <h2>
          This is your opportunity to rethink your supply chain strategy,
          <br />
          stay ahead of disruption, and lead with sustainable, data-driven
          solutions tailored to the region's needs.
        </h2>
      </div>

      <section className="speakers-section">
        <h2>Our Speakers</h2>
        <div className="speakers-grid">
          <div className="speaker-card">
            <img src="/speaker_male.png" alt="Dr Raman Kumar" />
            <h4>Dr Raman Kumar</h4>
            <h6>CEO</h6>
            <div className="company">Al-Futtaim Logistics</div>
          </div>
          <div className="speaker-card">
            <img src="/speaker_female.png" alt="David Moono" />
            <h4>Sarah Jenkins</h4>
            <h6>Global Logistics Manager</h6>
            <div className="company">Weatherford</div>
          </div>
          <div className="speaker-card">
            <img src="/speaker_male.png" alt="Tamer Hamed" />
            <h4>Tamer Hamed</h4>
            <h6>CIO</h6>
            <div className="company">Dubai Cable Company</div>
          </div>
          <div className="speaker-card">
            <img src="/speaker_female.png" alt="Richard Buxton" />
            <h4>Emily Buxton</h4>
            <h6>VP EMEA</h6>
            <div className="company">Accelalpha</div>
          </div>
        </div>
      </section>

      <section className="agenda-section">
        <h2>Agenda</h2>
        <div className="agenda-list">
          <div className="agenda-item">
            <div className="agenda-time">9.30 AM - 10.00 AM</div>
            <div className="agenda-title">Registrations</div>
          </div>
          <div className="agenda-item">
            <div className="agenda-time">10.00 AM - 10.10 AM</div>
            <div className="agenda-title">Welcome Note</div>
          </div>
          <div className="agenda-item">
            <div className="agenda-time">10.10 AM - 10.40 AM</div>
            <div className="agenda-title">
              Industry Keynote (Outlook & Challenges on Digital Logistics)
            </div>
          </div>
          <div className="agenda-item">
            <div className="agenda-time">10.40 AM - 11.10 AM</div>
            <div className="agenda-title">
              A Practical Guide to Successful Implementation
            </div>
          </div>
        </div>
      </section>

      <section className="registration-section" id="register-form">
        <div className="registration-form-container">
          <h2 style={{ marginBottom: "20px" }}>
            Register <span style={{ color: "var(--primary-color)" }}>Now</span>
          </h2>

          {result ? (
            <div className="match-result">
              <h3>Registration Successful!</h3>
              <p>We found a perfect session for your professional focus.</p>
              <br />
              <strong>Matched Session:</strong> {result.matched_session_title}
              <br />
              <strong>Time:</strong> {result.matched_session_time}
              <br />
              <div className="draft-email">
                <strong>Draft Email from AI:</strong>
                <br />
                {result.draft_email}
              </div>
              <button className="btn-primary" onClick={() => setResult(null)}>
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ color: "red", marginBottom: "15px" }}>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label>
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Job Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Company <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Corporate Email Address{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  id="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleInputChange}
                />
                <label htmlFor="privacyPolicy">
                  By filling out the registration form to attend our event, you
                  agree and consent to sharing your personal contact details, in
                  accordance with GDPR guidelines, with our sponsors and
                  partners. <span style={{ color: "red" }}>*</span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: "100%" }}
              >
                {loading ? "Submitting..." : "Submit Form"}
              </button>
            </form>
          )}
        </div>

        <div className="registration-info">
          <h2>Supply Chain & Logistics</h2>
          <p>
            Join industry experts and thought leaders for an exclusive deep dive
            into the future of operations.
          </p>
        </div>
      </section>
    </main>
  );
}
