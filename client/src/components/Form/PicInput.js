import React from "react";
import { Label } from "./Label";

export const PicInput = props => (
  <div className="form-group">
    <Label htmlFor={props.name}>{props.label}</Label>
    <input className="form-control" type="file" {...props}/>
  </div>
);