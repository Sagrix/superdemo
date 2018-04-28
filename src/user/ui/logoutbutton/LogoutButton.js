import React from 'react'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    // <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onLogoutUserClick(event)}></a>
    // </li>
  )
}

export default LogoutButton
