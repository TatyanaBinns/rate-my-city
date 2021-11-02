
//New code

import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import TopBorder from '../components/TopBorder';
import SearchCity from '../components/SearchCity';

const MainPage = () =>
{
   return(
     <div className = "container">
       <TopBorder />
       <PageTitle />
       <SearchCity />
       
       
     </div>
   );
};
export default MainPage;

