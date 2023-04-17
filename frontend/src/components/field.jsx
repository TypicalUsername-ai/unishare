import React from 'react';
import * as Label from '@radix-ui/react-label';
import './field.css';

const Field = (props) => (
  <div
    style={{ display: 'flex', padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
  >
    <Label.Root className="LabelRoot" htmlFor={props.text}>
	{props.text}
    </Label.Root>
    <input className="Input" type={props.type ? props.type : "text"} id={props.id} name={props.name} placeholder={props.default} onChange={(e) => props.onChange(e)} />
  </div>
);

export default Field;

