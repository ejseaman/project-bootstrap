import React, { Suspense } from 'react';
import { useCollection } from './use-record.js';
import Item from './item.jsx';

const List = () => {
  const [list, { post }] = useCollection(`${process.env.REST_SERVER}/dsx-test3/`);

  const add = () => {
    post({});
  };

  return <fieldset>
    <legend>
      <span role="textbox" contentEditable>list</span>
      <input type="button" value="+" onClick={add}/>
    </legend>

    { list.map((id) => (
      <Item id={id} />
    )) }
  </fieldset>
};


export default List;