import { toast } from 'react-toastify';

const showAlert = (alerts) => {
  if (alerts.length > 0) {
    toast(alerts[0][1], {
      className: `alert alert-${alerts[0][0]} alert-dismissable fade show`
    });
  }
};

export default showAlert;
