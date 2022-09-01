import React from 'react';
import './ProgressBar.scss';
import { NavLink } from 'react-router-dom';

const ProgressBar = ({ bookPath, totalPages, currentPage }) => {

    const buildLinks = (bookPath, totalPages) => {
        let links = [];
        for (let i = 0; i < totalPages; i++) {
            links.push(<NavLink className={(i + 1 < currentPage ? 'read' : null)} key={i + 1} to={bookPath + (i + 1)}>{i + 1}</NavLink>);
        }
        return links;
    }
    console.log(currentPage)
    return (
        <div className='progress-wrapper'> Hover Me
            <div className='progress-bar'>
                {(bookPath && totalPages) ? buildLinks(bookPath, totalPages).map((link) => link) : null}
            </div>
        </div>
    )
}

export default ProgressBar;