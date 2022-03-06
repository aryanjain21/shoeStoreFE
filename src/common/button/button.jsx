import './button.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = (props) => {

  const {
    type,
    // color,
    // background,
    children,
    redirectionLink,
    disabled,
    clickHandler
  } = props;

  const customStyle = `button ${disabled ? 'disabled_btn' : ''}`

  const buttonHandler = () => {
    if(!disabled) {
      clickHandler();
    }
  }

  return (
    type === 'button' ?
      <button
        className={`${customStyle}`}
        onClick={buttonHandler}>
        {children}
      </button>
      :
      type === 'link' ?
        <Link to={redirectionLink}>
          {children}
        </Link>
        : null
  );
}

export default Button;

Button.defaultProps = {
  type: 'button',
  color: 'color_white',
  background: 'color_light_gray',
  redirectionLink: '#',
  disabled: false,
  children: null,
  clickHandler: () => { }
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'link']),
  color: PropTypes.string,
  background: PropTypes.string,
  redirectionLink: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  clickHandler: PropTypes.func
}