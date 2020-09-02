import React from "react";

function Header() {
  return (
    <div className="header">
      <nav
        className="navbar navbar-light justify-content-between"
        style={{ backgroundColor: "#dcdcdc" }}
      >
        <a href="/" className="navbar-brand">
          <h1 className="display-4">Learning MSA</h1>
        </a>
      </nav>
    </div>
  );
}

export default Header;
