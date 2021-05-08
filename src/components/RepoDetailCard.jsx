import React from 'react';

import { connect } from 'react-redux';

import { toggleFavorite } from '../actions';

const mapDispatchToProps = state => ({ selected: state.selected });

/**
 * Renders repo detail card for `repo` prop 
 * 
 *  `IMPORTANT` Plase note that `repo` is not the same as `selected` - although they are representing the same github repo.
 * 
 *  `selected` is fetching result for public api GET `/repositories` and ...
 * 
 *  `repo` is details  from GET `/repo/{owner}/{repo.name}`
 *        
 *   Uses redux `selected` to extract `favorite` attribute  
 * 
 * @param {any} props 
 * @returns {JSX.Element} jsx element to render
 */
const RepoDetailCard = ({ 
    /**
     * repo detail object from GET `/repo/{owner}/{repo.name}` 
     */
    repo, 
    /**
     * redux store `selected` repository from GET `/repositories` 
     */
    selected, 
    /** 
     * redux connected action to toggle favorite attrubute 
     */
    toggleFavorite }) => {

    const {id, name, description, language, stargazers_count: stars, owner: {login, avatar_url: url}} = repo;
    const {favorite = false} = selected;

    return (
        <div className="ui card">
            <div className="content">
                <div className="right floated meta">{id}</div>
                <img className="ui avatar image" alt={login} src={url} />
                {login}
            </div>
            <div className="content">
                <div className="header">{name}</div>
                <div className="description">
                    <p>{description}</p>
                </div>
            </div>
            <div className="content">
                {language}
            </div>
            <div className="extra content">
                <span className="left floated like">
                    <i onClick={() => toggleFavorite(id)} style={favorite ? {color: "red"}:{}} className="like icon"></i>
                    Like
                </span>
                <span className="right floated star">
                    <i className="star icon"></i>
                    {stars}
                </span>
            </div>
        </div>
    );

};

export default connect(mapDispatchToProps, {toggleFavorite} )(RepoDetailCard);