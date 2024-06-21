import React from "react";

export const removeEmptyFields = (obj: object) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v !== '')
    );
  };