import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="nav-left">
        <div
          className="logo-box pull-left"
          style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
        >
          <div className="logo">
          
          </div>
        </div>

        <Link href="/" className="site-title">
          Event Solutions<span className="tm">™</span>
        </Link>
      </div>
      <div className="nav-right">
        <img
          className="partner-img"
          src="/images/oracle_partner.svg"
          alt="Oracle Partner"
        />
      </div>
    </header>
  );
}
