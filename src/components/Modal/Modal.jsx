import { Component } from 'react';
import s from './Modal.module.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  toggleLoadind() {
    this.setState(prevState => {
      return { loading: !prevState.loading };
    });
  }
  backdropHandler = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };
  componentDidMount() {
    this.setState({ loading: true });
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleImageLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={s.overlay} onClick={this.backdropHandler}>
        <img
          className={s.modal}
          src={src}
          alt={alt}
          onLoad={this.handleImageLoaded}
        />
        {this.state.loading && (
          <Loader type="BallTriangle" color="#3f51b5" height={350} />
        )}
      </div>
    );
  }
}

export default Modal;
