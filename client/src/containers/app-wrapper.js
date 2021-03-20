import React from "react";
import PropTypes from "prop-types";
//import Sitebar from "../components/Sitebar";
import Header from "../components/header";
function App({ children }) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;
