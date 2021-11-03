import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

function TopBorder()
{
    return(
      <div className="input-group mt-1 mb-2">
        <div className="input-group-append">
          <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Options</button>
        </div>

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
