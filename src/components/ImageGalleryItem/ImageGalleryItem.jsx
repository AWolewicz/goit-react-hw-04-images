import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ images, onClick }) => {
        
    return images.map(image => (
        <li key={image.id} className={css.item}>
            <img
                className={css.image}
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => onClick(image)}
            />
        </li>
    ));                        
};

ImageGalleryItem.propTypes = {
    images: PropTypes.array,
}