import React, { useState, useEffect } from 'react';
import { Modal, Form, Container, Col } from 'react-bootstrap';

const UserDataModal = ({
  show,
  handleClose,
  handleSave,
  title,
  subTitle,
  formFields,
}) => {
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (!show) {
      // Reset errors when modal is closed
      setErrors({});
    }
  }, [show]);

  const validateFields = () => {
    const requiredFields = ['Institute*', 'Degree / Course*', 'Start Date*', 'End Date (or expected)*', 'Position*', 'Company Name*', ''];
    const newErrors = {};
  
    formFields.forEach(field => {
      if (requiredFields.includes(field.label) && !field.value.trim()) {
        newErrors[field.label] = 'This field is required';
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = () => {
    if (validateFields()) {
      handleSave();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Modal.Title id="example-custom-modal-styling-title" className="text-center">
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </Modal.Title>
        <div className="p-7">
          <Container className="mt-2">
            {formFields.map((field, index) => (
              <React.Fragment key={index}>
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'select' ? (
                  <Form.Select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      border: "0 0 1px 0 solid #ced4da",
                      borderRadius: "0",
                      boxShadow: "none",
                    }}
                  >
                    {field.options.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </Form.Select>
                ) : (
                  <Form.Control
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    type={field.type}
                    style={{
                      border: "0 0 1px 0 solid #ced4da",
                      borderRadius: "0",
                      boxShadow: "none",
                    }}
                  />
                )}
                {errors[field.label] && (
                  <span style={{ color: 'red' }}>{errors[field.label]}</span>
                )}
                <br />
              </React.Fragment>
            ))}
          </Container>
        </div>
        <div className="text-center">
          <button
            className="btn custom-button-reset my-1 my-sm-3"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserDataModal;
