import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UpdateEvent = ({ show, event, onClose, onSave, isDarkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: 0
    });

    const imageInputRef = useRef(null);

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name || '',
                description: event.description || '',
                category: event.category || '',
                price: event.price || 0
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const imageFile = imageInputRef.current?.files[0] || null;
        onSave(event.id, formData, imageFile); // pass image file to handler
    };

    return (
        <Modal show={show} onHide={onClose} centered contentClassName={isDarkMode ? 'bg-dark text-light' : ''}>
            <Modal.Header closeButton className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}>
                <Modal.Title>Update Event</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            ref={imageInputRef}
                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
                    <Button variant={isDarkMode ? "outline-secondary" : "secondary"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={isDarkMode ? "info" : "primary"} type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateEvent;
