import React, { Suspense } from 'react';
import { useRecord } from './use-record.js';

const Item = ({ id }) => {
  const entry = useRecord(`${process.env.REST_SERVER}/dsx-test3/${id}`);

  return <div>{JSON.stringify(entry)}</div>
};


export default Item;