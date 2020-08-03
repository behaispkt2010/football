import React from "react";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { confirmable, createConfirmation } from "react-confirm";

class Confirmation extends React.Component {
  render() {
    const {
      proceedLabel,
      cancelLabel,
      title,
      confirmation,
      show,
      proceed,
      alert,
      enableEscape = true
    } = this.props;
    return (
      <div className="static-modal">
        <Modal
          isOpen={show}
          backdrop={enableEscape ? true : "static"}
          keyboard={enableEscape}
        >
          <ModalBody>{confirmation}</ModalBody>
          <ModalFooter>
            {alert == true && <Button onClick={() => proceed(false)}>{cancelLabel}</Button>}
            <Button
              className="button-l"
              color="primary"
              onClick={() => proceed(true)}
            >
              {proceedLabel}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Confirmation.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  alert: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool
};

export function confirm(
  confirmation,
  proceedLabel = "Xác nhận",
  cancelLabel = "Hủy",
  alert = true,
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    alert,
    ...options
  });
}
