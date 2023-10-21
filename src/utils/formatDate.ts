import moment from 'moment';

export const formatDate = (unformatedDate: string) => {
  return moment(unformatedDate).format('LL');
};
