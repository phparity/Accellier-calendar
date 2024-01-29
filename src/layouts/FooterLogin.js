import React from "react";
import i18n from "../config/i18n";
import { Trans } from "react-i18next";

const Footer = () => {
  function getYear() {
    return new Date().getFullYear();
  }
  const lang = localStorage.getItem("language")
  if (lang) {
    i18n.changeLanguage(lang)
  }
  return (

    <div className="nav_bg fuuter">
      <footer className="text-center mt-5 futer">
        <p>© {getYear()} Accellier Limited. <Trans>All Rights</Trans> Reserved<b></b></p>
      </footer>
    </div>

  );
};

export default Footer;
