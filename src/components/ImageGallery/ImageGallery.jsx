import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  static propTypes = {
    gallery: PropTypes.array.isRequired,
  };
  render() {
    return (
      <ul className={s.imageGallery}>
        {this.props.gallery.map((item, index) => {
          return <ImageGalleryItem imageData={item} key={index} />;
        })}
      </ul>
    );
  }
}

export default ImageGallery;
