import React from 'react';

/**
 * Renders placeholder cards when content is loading
 * 
 * @returns {JSX.Element} jsx element to render
 */
const Placeholder = () => {
    return (
        <div className="ui placeholder">
            <div className="image header">
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="paragraph">
              <div className="medium line"></div>
              <div className="short line"></div>
            </div>
        </div>
    );
};

export default Placeholder;