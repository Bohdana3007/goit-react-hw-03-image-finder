import { Component } from 'react';
import s from './ImageGalleryItem.module.css';
import Modal from '../Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    imageData: PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  };

  state = {
    openModal: false,
    largeSrc: null,
  };

  imageClickHandler = e => {
    this.setState({
      largeSrc: e.target.dataset.largeimg,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { openModal: !prevState.openModal };
    });
  };

  render() {
    const { id, webformatURL, largeImageURL } = this.props.imageData;
    const { openModal } = this.state;
    return (
      <>
        <li className={s.imageGalleryItem}>
          <img
            src={webformatURL}
            alt={id}
            className={s.image}
            onClick={this.imageClickHandler}
          />
        </li>
        {openModal && <Modal onClose={this.toggleModal} src={largeImageURL} />}
      </>
    );
  }
}

export default ImageGalleryItem;
