import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({selected: state.selected});

/**
 * Renders repo card for repos list
 * 
 * @param {any} props 
 * @returns {JSX.Element} jsx element to render 
 */
const RepoCard = ({
    /**
     * GitHub repo to render
     */
    repo,
    /**
     * selecting repository callback
     */
    onSelect, 
    /**
     * redux `selected` repository - uses `selected.id` to render 
     *      selected repo link in `red` colour 
     */
    selected
}) => {
    const {id, name, description, owner: {login, avatar_url: url}} = repo;
    return (
        <div style={{marginBottom: "20px"}} className="comment">
            <div className="avatar">
                <img alt={name} src={url} />
            </div>
            <div className="content">
                <span className="author">{login}</span>
                <div className="metadata">
                    <span className="date">[{id}]</span>
                </div>
                <div onClick={() => onSelect(repo)} style={{textDecoration:"underline", cursor: "pointer", color: selected && selected.id === id ? "red": "black"}} className="text">
                    {name}
                </div>
                <div className="text">
                    {description}
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(RepoCard);