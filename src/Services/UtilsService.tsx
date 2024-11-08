import React from "react";

export const removeEmptyFields = (obj: object) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v !== '')
    );
};

//REMOVE __typename OF THE INTERFACE
const removeTypename = (key: string, value: string) => (key === '__typename' ? undefined : value);

export const removeTypenameFromObject = (obj: object) => JSON.parse(JSON.stringify(obj), removeTypename);

//GET CURRENT DATE

export const getCurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('.')[0] + 'Z';
  return formattedDate;
}

//SUBTRING DATE 0, 10
export const getDateFormat = (date: string): string | null => {
  // Extract only the date part (YYYY-MM-DD)
  if(date){
    return date.substring(0, 10);
  }
  return '';
  
  
};
