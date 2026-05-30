"use client";

import React, { useState } from "react";

interface FormErrors {
  name?: string;
  job_title?: string;
  company?: string;
  number?: string;
  email?: string;
  company_website_URL?: string;
  privacy_policy?: string;
}

export default function RegistrationForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    job_title: "",
    company: "",
    number: "",
    email: "",
    company_website_URL: "",
    privacy_policy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for field
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
      isValid = false;
    }
    if (!formData.job_title.trim()) {
      newErrors.job_title = "Please enter your job title.";
      isValid = false;
    }
    if (!formData.company.trim()) {
      newErrors.company = "Please enter your company name.";
      isValid = false;
    }
    
    const phonePattern = /^[0-9]+$/;
    if (!formData.number.trim()) {
      newErrors.number = "Please enter your phone number.";
      isValid = false;
    } else if (!phonePattern.test(formData.number.trim())) {
      newErrors.number = "Please enter a valid phone number.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your corporate email.";
      isValid = false;
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setLoading(true);
      // Simulate loading/progress verification like the original 2s timeout
      setTimeout(() => {
        setLoading(false);
        setStep(2);
      }, 1500);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.company_website_URL.trim()) {
      newErrors.company_website_URL = "This field cannot be left blank.";
      isValid = false;
    }

    if (!formData.privacy_policy) {
      newErrors.privacy_policy = "You must agree to the privacy policy.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Build GET query parameters to match the original API structure
      const queryParams = new URLSearchParams({
        event_name: "CSEvents Invite",
        name: formData.name,
        job_title: formData.job_title,
        company: formData.company,
        number: formData.number,
        email: formData.email,
        company_website_URL: formData.company_website_URL,
        terms: String(formData.privacy_policy),
      });

      const response = await fetch(`/functions/RegistrationAPI?${queryParams.toString()}`, {
        method: "GET",
      });

      const result = await response.json();

      setLoading(false);

      if (result.success) {
        setSuccess(true);
        // Reset form and return to step 1 after 4 seconds (like original)
        setTimeout(() => {
          setSuccess(false);
          setFormData({
            name: "",
            job_title: "",
            company: "",
            number: "",
            email: "",
            company_website_URL: "",
            privacy_policy: false,
          });
          setStep(1);
        }, 4000);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      setLoading(false);
      alert("Request failed. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="form-card">
      <div className="form-title-box">
        <h2>Register <span className="highlight">Now</span></h2>
        <p className="form-subtitle">Invitation-only private conference</p>
      </div>

      <div className="form-content-relative">
        {/* Loading Spinner overlay */}
        {loading && (
          <div className="form-loading-overlay">
            <div className="spinner"></div>
            <p className="loading-text">Processing your request...</p>
          </div>
        )}

        {/* Success message overlay */}
        {success ? (
          <div className="success-message-box fade-in">
            <div className="success-icon">✓</div>
            <h3>Registration Submitted!</h3>
            <p>
              Thank you for registering with us! Your interest in our event is greatly appreciated. 
              This is an <strong>INVITATION ONLY</strong> private conference. 
              Our team will be in touch with you shortly to confirm your participation!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="event-registration-form">
            {step === 1 && (
              <div className="form-step-container fade-in">
                <div className="form-group">
                  <label htmlFor="name">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "input-error" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="job_title">Job Title <span className="required">*</span></label>
                  <input
                    type="text"
                    name="job_title"
                    id="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    className={errors.job_title ? "input-error" : ""}
                    placeholder="Enter your corporate title"
                  />
                  {errors.job_title && <div className="error-message">{errors.job_title}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company <span className="required">*</span></label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={errors.company ? "input-error" : ""}
                    placeholder="Enter company name"
                  />
                  {errors.company && <div className="error-message">{errors.company}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="number">Phone Number <span className="required">*</span></label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className={errors.number ? "input-error" : ""}
                    placeholder="E.g., 971500000000 (digits only)"
                  />
                  {errors.number && <div className="error-message">{errors.number}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Corporate Email Address <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "input-error" : ""}
                    placeholder="name@company.com"
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary w-full mt-4"
                >
                  Next step &rarr;
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step-container fade-in">
                <div className="form-group">
                  <label htmlFor="company_website_URL">Company Website URL <span className="required">*</span></label>
                  <input
                    type="text"
                    name="company_website_URL"
                    id="company_website_URL"
                    value={formData.company_website_URL}
                    onChange={handleInputChange}
                    className={errors.company_website_URL ? "input-error" : ""}
                    placeholder="https://example.com"
                  />
                  {errors.company_website_URL && (
                    <div className="error-message">{errors.company_website_URL}</div>
                  )}
                </div>

                <div className="form-group checkbox-group">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="privacy_policy"
                      id="privacy_policy"
                      checked={formData.privacy_policy}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="privacy_policy" className="checkbox-label">
                      By filling out the registration form to attend our event, you agree and consent to Cogent Solutions™ sharing your personal contact details, in accordance with GDPR guidelines, with our sponsors and partners. Read our{" "}
                      <a href="https://cogentsolutions.ae/privacy-policy" target="_blank" rel="noopener noreferrer" className="link-text">
                        Privacy Policy
                      </a>{" "}
                      <span className="required">*</span>
                    </label>
                  </div>
                  {errors.privacy_policy && (
                    <div className="error-message checkbox-error">{errors.privacy_policy}</div>
                  )}
                </div>

                <div className="button-group-split">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    &larr; Back
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Invitation
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
