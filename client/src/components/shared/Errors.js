import React from "react";

export function Error(props) {
  const errors = props.errors;

  return (
    errors.length > 0 && (
      <div className="alert alert-danger">
        {errors.map((error, index) => (
          <p key={index}> {error.message} </p>
        ))}
      </div>
    )
  );
}
