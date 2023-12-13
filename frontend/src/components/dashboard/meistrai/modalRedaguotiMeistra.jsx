import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const modalRedaguotiMeistra = ({ id, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [photo, setPhoto] = useState('');
  const [service, setService] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const updatedSpecialist = {
        firstName,
        lastName,
        specialization,
        photo,
        service,
        city,
      };

      const response = await fetch(`http://localhost:3000/specialists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSpecialist),
            credentials:"include"
        });

      // Handle success - specialist updated successfully
      console.log('Specialist updated:', response.data);

      // Close the modal or perform other actions upon successful update
      onClose();
    } catch (err) {
      if (err.response) {
        // Handle known errors (4xx, 5xx)
        setError(err.response.data.message); // Assuming the server sends error messages
      } else {
        // Handle other errors
        setError('An error occurred while updating the specialist.');
      }
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Specialist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="specialization">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="photo">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="service">
            <Form.Label>Service</Form.Label>
            <Form.Control
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Update
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default modalRedaguotiMeistra;
