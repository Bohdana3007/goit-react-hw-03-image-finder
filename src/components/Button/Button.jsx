import { Component } from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };
  state = {};
  render() {
    return (
      <button type="button" className={s.button} onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
