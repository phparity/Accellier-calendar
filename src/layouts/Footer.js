import React from "react";
import i18n from "../config/i18n";
import { Trans } from "react-i18next";

const Footer = () => {
  function getYear() {
    return new Date().getFullYear();
  }
  const lang = localStorage.getItem("language")
  if (lang){
    i18n.changeLanguage(lang)
  }
  return (

      <div className="h_footer">
       
          <p>© {getYear()} Accellier Limited. <Trans>All Rights</Trans> Reserved<b></b></p>
        
      </div>
  
  );
};

export default Footer;
