import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

function searchCity()
{
    return(
      <div className="input-group mt-1 mb-2">
          <input className="form-control" placeholder="Search by City" />
          <input className="form-control" placeholder="Search by State" />
          <input className="form-control" placeholder="Search by Username" />
          <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Search</button>
          <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Add City</button>
      </div>
        

    );
  };
export default searchCity;