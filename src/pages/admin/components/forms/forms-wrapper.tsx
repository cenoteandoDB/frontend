import React from 'react';
import { useLocation } from 'react-router-dom';
import { CenoteFormWrapper } from './cenotes/cenote-update/cenote-form-wrapper';

const getFormComponent: Record<string, React.FC<any>> = {
  cenotes: CenoteFormWrapper,
};

export const FormsWrapper = () => {
  const { pathname } = useLocation();
  const index = pathname.split('/');

  const FormComponent = getFormComponent[index[2]];

  if (!FormComponent) {
    return null;
  }

  return <FormComponent cenoteId={index.pop()} />;
};
