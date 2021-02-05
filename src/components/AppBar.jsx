import PropTypes from "prop-types";

const AppBar = (props) => {
  const { brandName, logo, logoAltText } = props;
  return (
    <div className="navbar-wrapper">
      <a href="/" className="navbar-brand">
        <img src={logo} alt={logoAltText} />{" "}
        <span className="navbar-brand-name">{brandName}</span>
      </a>
    </div>
  );
};

AppBar.propTypes = {
  brandName: PropTypes.string.isRequired,
  logo: PropTypes.node.isRequired,
  logoAltText: PropTypes.string.isRequired,
};

export default AppBar;
