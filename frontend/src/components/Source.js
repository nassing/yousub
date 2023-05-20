import '../css/Source.css';
import React from 'react';

export default function Source({ sourceLink }) {
  return (
    <div id="source-wrapper">
        <a href={sourceLink} target="_blank">source</a>
    </div>
  );
};