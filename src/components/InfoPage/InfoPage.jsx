import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (

    <>
    <h1 className='info-title'> Gresser</h1>
    <div className="container">
      <img className='GresserPic' src='/documentation/images/Gressercompany.jpg' alt='Gresser' />
    </div>

    </>
  );
}

export default InfoPage;
