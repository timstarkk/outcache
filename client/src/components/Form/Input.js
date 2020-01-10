import React from "react";
import { Label } from "./Label";

export const Input = props => (
  <div className="form-group">
    <Label htmlFor={props.name}>{props.label}</Label>
    <input className="form-control" {...props}/>
  </div>
);