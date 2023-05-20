import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '../resources/logo.png'

export default function Head() {
  return (
    <div>
      <Helmet>
        <title>YouSub</title>
        <link rel="icon" href={`${logo}`} type="image/png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, private"/>
        <meta http-equiv="Pragma" content="no-cache"/>
        <meta http-equiv="Expires" content="0"/>
      </Helmet>
    </div>
  );
}