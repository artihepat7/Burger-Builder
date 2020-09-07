import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let ValidationError = null;
  let InputElementClasses = [classes.InputElement];
  if (props.Invalid && props.shouldValidate && props.touched) {
    InputElementClasses.push(classes.Invalid);
    ValidationError = (
      <p className={classes.ValidationError}>
        please enter valid {props.valueType}
      </p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={InputElementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={InputElementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={InputElementClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={InputElementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {ValidationError}
    </div>
  );
};
export default Input;
