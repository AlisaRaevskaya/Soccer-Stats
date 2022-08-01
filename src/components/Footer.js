import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="page-footer bg-secondary">
        <div className="container-fluid">
          <div className="page-footer__content">
            <div className="page-footer__inner"></div>
          </div>
          <div className="page-footer__copyright">
            <p className="mb-2">
              <a href="https://www.google.com" title="Privacy" target="_blank">
                SoccerSTATS.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
