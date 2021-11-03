import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';


function TopBorder()
{
    return(
      <div className="input-group mt-1 mb-2">
        
        <DropdownButton className="input-group-append icon-play" id="dropdown-basic-button" size="sm" variant="Secondary" menuVariant="secondary">
          <Dropdown.Item href="#/action-1">Add City</Dropdown.Item>
        </DropdownButton>

        <input className="form-control text-center fw-bold" placeholder="Welcome: User Registered" />
        <div className="input-group-append">
          <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Login / Register</button>
        </div>

        <div className="input-group-append">
          <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Settings</button>
        </div>
      </div>

    );
  };
export default TopBorder; 
