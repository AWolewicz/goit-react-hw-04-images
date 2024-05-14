import PropTypes from 'prop-types';
import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = (ariaLabel, color, glassColor, height, visible, width, wrapperClass, wrapperStyle) => {
    const style = {
        textAlign: 'center'
    };
    
    return (
        <div style={style}>
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>
    )
};

Loader.propTypes = {
    ariaLabel: PropTypes.string,
    color: PropTypes.string,
    glassColor: PropTypes.string,
    height: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.string,
    wrapperClass: PropTypes.string,
    wrapperStyle: PropTypes.object,
    
}