////import React, { useState } from 'react';
////import { Form, Button, Col, Row } from 'react-bootstrap';
////import axios from 'axios';
////import { useHistory } from 'react-router-dom';
////import { useNavigate } from 'react-router-dom';

////const CreateEventPage = () => {
////    const navigate = useNavigate();

////    // Form state variables
////    const [eventData, setEventData] = useState({
////        name: '',
////        description: '',
////        category: '',
////        price: '',
////        image: null,
////    });

////    const handleInputChange = (e) => {
////        const { name, value } = e.target;
////        setEventData((prevData) => ({ ...prevData, [name]: value }));
////    };

////    const handleFileChange = (e) => {
////        const file = e.target.files[0];
////        setEventData((prevData) => ({ ...prevData, image: file }));
////    };

////    const handleSubmit = async (e) => {
////        e.preventDefault();

////        // Create form data to send as multipart/form-data
////        const formData = new FormData();
////        formData.append('name', eventData.name);
////        formData.append('description', eventData.description);
////        formData.append('category', eventData.category);
////        formData.append('price', eventData.price);
////        formData.append('image', eventData.image);

////        try {
////            // Send the form data to the backend
////            const token = localStorage.getItem("accessToken"); // Retrieve the token
////            const response = await axios.post('https://localhost:7246/api/Event', formData, {
////                headers: {
////                    'Content-Type': 'multipart/form-data',
////                    Authorization: `Bearer ${token}`,
////                },
////            });

////            // Redirect to event list or show success message
////            console.log('Event created:', response.data);
////            navigate('/events'); // Redirect to event list page (adjust as needed)
////        } catch (error) {
////            console.error('Error creating event:', error);
////            console.log("snow");
////        }
////    };

////    return (
////        <div>
////            <h2>Create Event</h2>
////            <Form onSubmit={handleSubmit}>
////                <Form.Group controlId="eventName">
////                    <Form.Label>Event Name</Form.Label>
////                    <Form.Control
////                        type="text"
////                        placeholder="Enter event name"
////                        name="name"
////                        value={eventData.name}
////                        onChange={handleInputChange}
////                        required
////                    />
////                </Form.Group>

////                <Form.Group controlId="eventDescription">
////                    <Form.Label>Event Description</Form.Label>
////                    <Form.Control
////                        as="textarea"
////                        rows={3}
////                        placeholder="Enter event description"
////                        name="description"
////                        value={eventData.description}
////                        onChange={handleInputChange}
////                        required
////                    />
////                </Form.Group>

////                <Form.Group controlId="eventCategory">
////                    <Form.Label>Event Category</Form.Label>
////                    <Form.Control
////                        type="text"
////                        placeholder="Enter event category"
////                        name="category"
////                        value={eventData.category}
////                        onChange={handleInputChange}
////                        required
////                    />
////                </Form.Group>

////                <Form.Group controlId="eventPrice">
////                    <Form.Label>Event Price</Form.Label>
////                    <Form.Control
////                        type="number"
////                        placeholder="Enter event price"
////                        name="price"
////                        value={eventData.price}
////                        onChange={handleInputChange}
////                        required
////                    />
////                </Form.Group>

////                <Form.Group controlId="eventImage">
////                    <Form.Label>Event Image</Form.Label>
////                    <Form.Control
////                        type="file"
////                        name="image"
////                        onChange={handleFileChange}
////                        required
////                    />
////                </Form.Group>

////                <Button variant="primary" type="submit">
////                    Create Event
////                </Button>
////            </Form>
////        </div>
////    );
////};

////export default CreateEventPage;


//import React, { useState } from 'react';
//import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

//const CreateEventPage = () => {
//    const navigate = useNavigate();

//    // Form state variables
//    const [eventData, setEventData] = useState({
//        name: '',
//        description: '',
//        category: '',
//        date: '',
//        venue: '',
//        price: 0,
//        image: null,
//    });

//    // Add validation and error handling states
//    const [validated, setValidated] = useState(false);
//    const [errorMessage, setErrorMessage] = useState('');
//    const [isLoading, setIsLoading] = useState(false);

//    const handleInputChange = (e) => {
//        const { name, value } = e.target;
//        setEventData((prevData) => ({ ...prevData, [name]: value }));
//    };

//    const handleFileChange = (e) => {
//        const file = e.target.files[0];
//        setEventData((prevData) => ({ ...prevData, image: file }));
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();

//        // Form validation
//        const form = e.currentTarget;
//        if (form.checkValidity() === false) {
//            e.stopPropagation();
//            setValidated(true);
//            return;
//        }

//        setValidated(true);
//        setIsLoading(true);
//        setErrorMessage('');

//        // Create form data to send as multipart/form-data
//        const formData = new FormData();
//        formData.append('name', eventData.name);
//        formData.append('description', eventData.description);
//        formData.append('category', eventData.category);
//        formData.append('date', eventData.date); // New field
//        formData.append('venue', eventData.venue); // New field
//        formData.append('price', parseFloat(eventData.price).toString());
//        if (eventData.image) {
//            formData.append('image', eventData.image);
//        }

//        try {
//            // For debugging - log the data being sent
//            for (let pair of formData.entries()) {
//                console.log(pair[0] + ': ' + pair[1]);
//            }

//            // Send the form data to the backend
//            const token = localStorage.getItem("accessToken");
//            if (!token) {
//                throw new Error("Authentication token not found. Please log in again.");
//            }

//            const response = await axios.post('https://localhost:7246/api/Event', formData, {
//                headers: {
//                    'Content-Type': 'multipart/form-data',
//                    'Authorization': ` Bearer ${token}`,
//                },
//    });

//    // Successful response
//    console.log('Event created successfully:', response.data);
//    navigate('/events');
//} catch (error) {
//    console.error('Error creating event:', error);

//    // Handle different error scenarios
//    if (error.response) {
//        // The server responded with an error status
//        console.error('Server response:', error.response.data);
//        setErrorMessage(`Server error: ${error.response.status} - ${error.response.data.message ||
//            error.response.data.title ||
//            error.response.statusText ||
//            'Unknown error'
//            }`);
//    } else if (error.request) {
//        // The request was made but no response was received
//        setErrorMessage('No response received from server. Please check your network connection.');
//    } else {
//        // Something happened in setting up the request
//        setErrorMessage(`Error: ${ error.message }`);
//    }
//} finally {
//    setIsLoading(false);
//}
//    };

//return (
//    <Container className="py-4">
//        <Card className="shadow-sm">
//            <Card.Body>
//                <h2 className="mb-4">Create New Event</h2>

//                {errorMessage && (
//                    <Alert variant="danger" className="mb-4">
//                        {errorMessage}
//                    </Alert>
//                )}

//                <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                    <Form.Group className="mb-3" controlId="eventName">
//                        <Form.Label>Event Name</Form.Label>
//                        <Form.Control
//                            type="text"
//                            placeholder="Enter event name"
//                            name="name"
//                            value={eventData.name}
//                            onChange={handleInputChange}
//                            required
//                        />
//                        <Form.Control.Feedback type="invalid">
//                            Please provide an event name.
//                        </Form.Control.Feedback>
//                    </Form.Group>

//                    <Form.Group className="mb-3" controlId="eventDescription">
//                        <Form.Label>Event Description</Form.Label>
//                        <Form.Control
//                            as="textarea"
//                            rows={3}
//                            placeholder="Enter event description"
//                            name="description"
//                            value={eventData.description}
//                            onChange={handleInputChange}
//                            required
//                        />
//                        <Form.Control.Feedback type="invalid">
//                            Please provide an event description.
//                        </Form.Control.Feedback>
//                    </Form.Group>

//                    <Form.Group className="mb-3" controlId="eventCategory">
//                        <Form.Label>Event Category</Form.Label>
//                        <Form.Control
//                            type="text"
//                            placeholder="Enter event category"
//                            name="category"
//                            value={eventData.category}
//                            onChange={handleInputChange}
//                            required
//                        />
//                        <Form.Control.Feedback type="invalid">
//                            Please provide an event category.
//                        </Form.Control.Feedback>
//                    </Form.Group>

//                    <Form.Group className="mb-3" controlId="eventDate">
//                        <Form.Label>Event Date</Form.Label>
//                        <Form.Control
//                            type="datetime-local"
//                            name="date"
//                            value={eventData.date}
//                            onChange={handleInputChange}
//                            required
//                        />
//                        <Form.Control.Feedback type="invalid">
//                            Please provide a valid event date.
//                        </Form.Control.Feedback>
//                    </Form.Group>

//                    <Form.Group className="mb-3" controlId="eventVenue">
//                        <Form.Label>Event Venue</Form.Label>
//                        <Form.Control
//                            type="text"
//                            placeholder="Enter event venue"
//                            name="venue"
//                            value={eventData.venue}
//                            onChange={handleInputChange}
//                            required
//                        />
//                        <Form.Control.Feedback type="invalid">
//                            Please provide an event venue.
//                        </Form.Control.Feedback>
//                    </Form.Group>

//                    <Form.Group className="mb-3" controlId="eventPrice">
//                        <Form.Label>Event Price</Form.Label>
//                        <Form.Control
//                            type="number"
//                            step="0.01"
//                            min="0"
//                            placeholder="Enter event price"
//                            name="price"
//                            value={eventData.price}
//                            onChange={handleInputChange}
//                            required
//                        />
//                        <Form.Control.Feedback type="invalid">
//                            Please provide a valid event price.
//                        </Form.Control.Feedback>
//                    </Form.Group>

//                    <Form.Group className="mb-4" controlId="eventImage">
//                        <Form.Label>Event Image</Form.Label>
//                        <Form.Control
//                            type="file"
//                            name="image"
//                            onChange={handleFileChange}
//                            accept="image/*"
//                            required
//                        />
//                        <Form.Control.Feedback type="invalid">
//                            Please select an image for the event.
//                        </Form.Control.Feedback>
//                        <Form.Text className="text-muted">
//                            Supported formats: JPG, PNG, GIF (max 5MB)
//                        </Form.Text>
//                    </Form.Group>

//                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                        <Button
//                            variant="secondary"
//                            onClick={() => navigate('/events')}
//                            disabled={isLoading}
//                            className="me-md-2"
//                        >
//                            Cancel
//                        </Button>
//                        <Button
//                            variant="primary"
//                            type="submit"
//                            disabled={isLoading}
//                        >
//                            {isLoading ? 'Creating...' : 'Create Event'}
//                        </Button>
//                    </div>
//                </Form>
//            </Card.Body>
//        </Card>
//    </Container>
//);
//};
//export default CreateEventPage;





import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Card, Row, Col, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from 'react-bootstrap';
// Import Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreateEventPage = () => {
    const navigate = useNavigate();

    // Form state variables
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        category: '',
        date: '',
        venue: '',
        price: 0,
        image: null,
    });

    // Add validation and error handling states
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Add UI enhancement states
    const [imagePreview, setImagePreview] = useState('');
    const [formStep, setFormStep] = useState(1);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Predefined categories
    const categories = ['Conference', 'Workshop', 'Concert', 'Exhibition', 'Sport', 'Networking', 'Other'];

    // Custom style for the form with transitions
    useEffect(() => {
        // Add custom CSS for animations and transitions
        const style = document.createElement('style');
        style.innerHTML = `
            .fade-in {
                animation: fadeIn 0.5s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .card-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                transition: all 0.3s ease;
            }
            .form-control:focus, .form-select:focus {
                border-color: #86b7fe;
                box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }
            .btn {
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
            }
            .category-badge {
                cursor: pointer;
                transition: all 0.2s ease;
                margin-right: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .category-badge:hover {
                background-color: #0d6efd !important;
                color: white;
            }
            .category-selected {
                background-color: #0d6efd !important;
                color: white;
            }
            .step-indicator {
                position: relative;
                padding-bottom: 30px;
            }
            .step-indicator::after {
                content: '';
                position: absolute;
                top: 35px;
                left: 17px;
                height: calc(100% - 35px);
                width: 2px;
                background-color: #dee2e6;
            }
            .step-indicator.active::after {
                background-color: #0d6efd;
            }
            .step-icon {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background-color: #dee2e6;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
                transition: all 0.3s ease;
            }
            .step-icon.active {
                background-color: #0d6efd;
                color: white;
            }
            .step-description {
                font-size: 14px;
                color: #6c757d;
                transition: all 0.3s ease;
            }
            .step-description.active {
                color: #0d6efd;
                font-weight: 500;
            }
            .image-preview-container {
                width: 100%;
                height: 200px;
                overflow: hidden;
                border-radius: 8px;
                position: relative;
                background-color: #f8f9fa;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .image-preview {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            .remove-image {
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            .remove-image:hover {
                background-color: rgba(255, 255, 255, 1);
            }
            .input-group-text {
                background-color: #f8f9fa;
            }
            .success-animation {
                animation: successPulse 1.5s ease-out;
            }
            @keyframes successPulse {
                0% { transform: scale(0.8); opacity: 0; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCategorySelect = (category) => {
        setEventData((prevData) => ({ ...prevData, category }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setEventData((prevData) => ({ ...prevData, image: file }));
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setEventData((prevData) => ({ ...prevData, image: null }));
        setImagePreview('');
    };

    const handleNextStep = (e) => {
        e.preventDefault();

        // Form validation for step 1
        if (formStep === 1) {
            if (!eventData.name || !eventData.description || !eventData.category) {
                setValidated(true);
                return;
            }
        }

        setValidated(false);
        setFormStep(2);
        window.scrollTo(0, 0);
    };

    const handlePrevStep = () => {
        setFormStep(1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setIsLoading(true);
        setErrorMessage('');

        // Create form data to send as multipart/form-data
        const formData = new FormData();
        formData.append('name', eventData.name);
        formData.append('description', eventData.description);
        formData.append('category', eventData.category);
        formData.append('date', eventData.date);
        formData.append('venue', eventData.venue);
        formData.append('price', parseFloat(eventData.price).toString());
        if (eventData.image) {
            formData.append('image', eventData.image);
        }

        try {
            // For debugging - log the data being sent
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Send the form data to the backend
            const token = localStorage.getItem("accessToken");
            if (!token) {
                throw new Error("Authentication token not found. Please log in again.");
            }

            const response = await axios.post('https://localhost:7246/api/Event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Successful response
            console.log('Event created successfully:', response.data);
            setSubmitSuccess(true);

            // Show success message for 2 seconds before redirecting
            setTimeout(() => {
                navigate('/events');
            }, 2000);

        } catch (error) {
            console.error('Error creating event:', error);

            // Handle different error scenarios
            if (error.response) {
                // The server responded with an error status
                console.error('Server response:', error.response.data);
                setErrorMessage(`Server error: ${error.response.status} - ${error.response.data.message ||
                    error.response.data.title ||
                    error.response.statusText ||
                    'Unknown error'
                    }`);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('No response received from server. Please check your network connection.');
            } else {
                // Something happened in setting up the request
                setErrorMessage(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Success message component
    const SuccessMessage = () => (
        <div className="text-center py-5 success-animation">
            <div className="display-1 text-success mb-4">
                <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3>Event Created Successfully!</h3>
            <p className="text-muted">Redirecting to events page...</p>
        </div>
    );

    return (
        <Container className="py-4 fade-in">
            <Row>
                <Col md={3} className="mb-4">
                    <Card className="sticky-top" style={{ top: '1rem' }}>
                        <Card.Body>
                            <h5 className="mb-4">Create Event</h5>

                            <div className="step-indicator active">
                                <div className={`step-icon ${formStep === 1 ? 'active' : ''}`}>
                                    <i className="bi bi-1-circle"></i>
                                </div>
                                <div className={`step-description ${formStep === 1 ? 'active' : ''}`}>
                                    Basic Information
                                </div>
                            </div>

                            <div className="step-indicator">
                                <div className={`step-icon ${formStep === 2 ? 'active' : ''}`}>
                                    <i className="bi bi-2-circle"></i>
                                </div>
                                <div className={`step-description ${formStep === 2 ? 'active' : ''}`}>
                                    Details & Image
                                </div>
                            </div>

                            <div className="mt-4 pt-2">
                                <p className="small text-muted">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Fill out all required fields to create your event
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={9}>
                    <Card className="shadow-sm card-hover">
                        <Card.Body>
                            {errorMessage && (
                                <Alert variant="danger" className="mb-4 fade-in">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    {errorMessage}
                                </Alert>
                            )}

                            {submitSuccess ? (
                                <SuccessMessage />
                            ) : (
                                <div className="fade-in">
                                    <h2 className="mb-4">
                                        <i className="bi bi-calendar-plus me-2 text-primary"></i>
                                        {formStep === 1 ? 'Basic Information' : 'Event Details & Image'}
                                    </h2>

                                    <Form noValidate validated={validated} onSubmit={formStep === 1 ? handleNextStep : handleSubmit}>
                                        {/* Step 1: Basic Information */}
                                        {formStep === 1 && (
                                            <>
                                                <Form.Group className="mb-4" controlId="eventName">
                                                    <Form.Label>
                                                        <i className="bi bi-type me-2"></i>
                                                        Event Name
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter a catchy name for your event"
                                                        name="name"
                                                        value={eventData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="form-control-lg"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide an event name.
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-4" controlId="eventDescription">
                                                    <Form.Label>
                                                        <i className="bi bi-card-text me-2"></i>
                                                        Event Description
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={5}
                                                        placeholder="Describe your event in detail. What can attendees expect?"
                                                        name="description"
                                                        value={eventData.description}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide an event description.
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-4" controlId="eventCategory">
                                                    <Form.Label>
                                                        <i className="bi bi-tag me-2"></i>
                                                        Event Category
                                                    </Form.Label >
                                                        <div>
                                                        {categories.map((category) => (
                                                            <Badge 
                                                                key={category}
                                                                bg="light"
                                                                text="dark"
                                                                className={`py-2 px-3 category-badge ${eventData.category === category ? 'category-selected' : ''}`}
                                                                onClick={() => handleCategorySelect(category)}
                                                            >
                                                                {category}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    {validated && !eventData.category && (
                                                        <div className="text-danger small mt-2">
                                                            Please select a category.
                                                        </div>
                                                    )}
                                                </Form.Group>

                                                <div className="d-flex justify-content-end mt-4">
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        size="lg"
                                                        className="px-4"
                                                    >
                                                        Next Step
                                                        <i className="bi bi-arrow-right ms-2"></i>
                                                    </Button>
                                                </div>
                                            </>
                                        )}

                                        {/* Step 2: Event Details & Image */}
                                        {formStep === 2 && (
                                            <>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-4" controlId="eventDate">
                                                            <Form.Label>
                                                                <i className="bi bi-calendar-event me-2"></i>
                                                                Event Date
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="datetime-local"
                                                                name="date"
                                                                value={eventData.date}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid event date.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Group className="mb-4" controlId="eventPrice">
                                                            <Form.Label>
                                                                <i className="bi bi-currency-dollar me-2"></i>
                                                                Event Price
                                                            </Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text>$</InputGroup.Text>
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    placeholder="0.00"
                                                                    name="price"
                                                                    value={eventData.price}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide a valid price.
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Form.Group className="mb-4" controlId="eventVenue">
                                                    <Form.Label>
                                                        <i className="bi bi-geo-alt me-2"></i>
                                                        Event Venue
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter the location of your event"
                                                        name="venue"
                                                        value={eventData.venue}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide an event venue.
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-4" controlId="eventImage">
                                                    <Form.Label>
                                                        <i className="bi bi-image me-2"></i>
                                                        Event Image
                                                    </Form.Label>

                                                    {!imagePreview ? (
                                                        <div className="border rounded p-3">
                                                            <Form.Control
                                                                type="file"
                                                                name="image"
                                                                onChange={handleFileChange}
                                                                accept="image/*"
                                                                required
                                                                className="form-control-lg"
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please select an image for the event.
                                                            </Form.Control.Feedback>
                                                            <Form.Text className="text-muted">
                                                                <i className="bi bi-info-circle me-1"></i>
                                                                Supported formats: JPG, PNG, GIF (max 5MB)
                                                            </Form.Text>
                                                        </div>
                                                    ) : (
                                                        <div className="image-preview-container mb-2">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Event preview"
                                                                className="image-preview"
                                                            />
                                                            <div className="remove-image" onClick={removeImage}>
                                                                <i className="bi bi-x-circle"></i>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Form.Group>

                                                <div className="d-flex justify-content-between mt-4">
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={handlePrevStep}
                                                        className="px-4"
                                                    >
                                                        <i className="bi bi-arrow-left me-2"></i>
                                                        Back
                                                    </Button>

                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        disabled={isLoading}
                                                        className="px-4"
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <Spinner
                                                                    as="span"
                                                                    animation="border"
                                                                    size="sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                    className="me-2"
                                                                />
                                                                Creating...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Create Event
                                                                <i className="bi bi-check2-circle ms-2"></i>
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            )}
                        </Card.Body>
                    </Card>


                </Col>
            </Row>
        </Container>
    );
};

export default CreateEventPage;