"use client";

import { useState } from "react";
import styles from "./page.module.css";

const PERKS = [
  { title: "Up to ₹25 Lakhs", desc: "Personal loans tailored to your needs, with no collateral required." },
  { title: "Approval in 24 hrs", desc: "Fast decisions so you're not kept waiting when time is short." },
  { title: "Flexible tenures", desc: "Repay over 12 to 60 months at rates starting at 10.5% p.a." },
];

const INITIAL_FORM = { name: "", phone: "", email: "", pan: "", amount: "" };

export default function LoanApplicationPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())
      e.name = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan.toUpperCase()))
      e.pan = "Enter a valid PAN (e.g. ABCDE1234F)";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) < 10000)
      e.amount = "Minimum loan amount is ₹10,000";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "pan" ? value.toUpperCase() : value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitted(true);
  };

  const formatAmount = (val) => {
    const n = Number(val);
    if (!val || isNaN(n)) return "";
    return "₹" + n.toLocaleString("en-IN");
  };

  if (submitted) {
    return (
      <div className={styles.successWrap}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className={styles.successTitle}>Application submitted</h1>
          <p className={styles.successSub}>
            Thanks, {form.name.split(" ")[0]}. We have received your loan request and
            will reach out to {form.email} within 24 hours.
          </p>
          <div className={styles.successRef}>
            Requested amount
            <span>{formatAmount(form.amount)}</span>
          </div>
          <p className={styles.successSub} style={{ fontSize: "0.8rem" }}>
            Keep your PAN and income documents handy for the next step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrap}>

      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.brand}>Acme Finance</div>
        <div className={styles.leftBody}>
          <h1 className={styles.leftHeadline}>
            Get funds<br />
            <em>when it matters.</em>
          </h1>
          <div className={styles.perks}>
            {PERKS.map((p) => (
              <div className={styles.perk} key={p.title}>
                <div className={styles.perkDot} />
                <div>
                  <div className={styles.perkTitle}>{p.title}</div>
                  <div className={styles.perkDesc}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.leftFooter}>© 2026 Acme Finance. RBI Registered NBFC.</div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.formHeader}>
          <p className={styles.formEyebrow}>Personal Loan</p>
          <h2 className={styles.formTitle}>Check your offer</h2>
          <p className={styles.formSub}>Fill in your details — takes under 2 minutes.</p>
        </div>

        <div className={styles.form}>

          <div className={styles.field}>
            <label htmlFor="name">Full name</label>
            <input
              id="name" name="name" type="text"
              placeholder="As on your PAN card"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? styles.hasError : ""}
            />
            {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="phone">Mobile number</label>
              <input
                id="phone" name="phone" type="tel"
                placeholder="10-digit number"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                className={errors.phone ? styles.hasError : ""}
              />
              {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="pan">PAN</label>
              <input
                id="pan" name="pan" type="text"
                placeholder="ABCDE1234F"
                value={form.pan}
                onChange={handleChange}
                maxLength={10}
                className={errors.pan ? styles.hasError : ""}
              />
              {errors.pan && <span className={styles.errorMsg}>{errors.pan}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email address</label>
            <input
              id="email" name="email" type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? styles.hasError : ""}
            />
            {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="amount">Loan amount required</label>
            <div className={styles.inputWrap}>
              <span className={styles.amountPrefix}>₹</span>
              <input
                id="amount" name="amount" type="number"
                placeholder="e.g. 500000"
                value={form.amount}
                onChange={handleChange}
                className={`${styles.amountInput}${errors.amount ? ` ${styles.hasError}` : ""}`}
                min={10000}
              />
            </div>
            {form.amount && !errors.amount
              ? <span className={styles.hint}>{formatAmount(form.amount)}</span>
              : errors.amount && <span className={styles.errorMsg}>{errors.amount}</span>
            }
          </div>

          <button className={styles.submitBtn} onClick={handleSubmit}>
            Check my eligibility →
          </button>

          <p className={styles.disclaimer}>
            By submitting, you consent to us fetching your credit information from bureaus.
            Your data is encrypted and never sold.
          </p>

        </div>
      </div>

    </div>
  );
}