import React from 'react'
import withKeycloak from '../hoc/withKeycloak';
import Dashboard from '../components/Dashboard/Dashboard'

//dashboard page view
const MainPage = () => {

  return (
    <>
      <Dashboard />

    </>
  )

}

export default withKeycloak(MainPage);
