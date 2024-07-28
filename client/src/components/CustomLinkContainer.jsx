import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomLinkContainer = ({ to, children, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname !== to) {
      navigate(to);
    }
  };

  return (
    <div {...props} onClick={handleClick}>
      {children}
    </div>
  );
};

CustomLinkContainer.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomLinkContainer;
