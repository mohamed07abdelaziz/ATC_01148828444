//import React, { useState, useEffect } from 'react';
//import { Card, Button, Row, Col, Navbar, Container, Badge, Modal, Form, Spinner } from 'react-bootstrap';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
//import './EventsList.css';

//// EventCard Component with enhanced UI and dark mode support
//const EventCard = ({ event, isBooked, onBook, onEdit, onDelete, isDarkMode }) => {
//    console.log("Event dataaaaaaaa:", event);
//    return (
//        <Col md={6} lg={4} className="mb-4">
//            <Card className={`event-card h-100 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                <div className="event-image-container">
//                    <Card.Img
//                        variant="top"
//                        src={`https://localhost:7246${event.imageUrl}`}
//                        className="event-image"
//                    />
//                    <Badge
//                        bg="primary"
//                        className="category-badge"
//                    >
//                        {event.category}
//                    </Badge>
//                </div>
//                <Card.Body className="d-flex flex-column">
//                    <Card.Title className="fw-bold mb-3">{event.name}</Card.Title>
//                    <Card.Text className={`mb-4 flex-grow-1 ${isDarkMode ? 'text-light' : 'text-muted'}`}>
//                        {event.description.length > 100
//                            ? `${event.description.substring(0, 100)}...`
//                            : event.description}
//                    </Card.Text>
//                    <div className="d-flex justify-content-between align-items-center mt-auto">
//                        <span className={`fw-bold ${isDarkMode ? 'text-info' : 'text-primary'}`}>${event.price}</span>
//                        {onEdit && onDelete ? (
//                            <div className="admin-actions d-flex ms-2">
//                                <Button
//                                    variant={isDarkMode ? "outline-info" : "outline-primary"}
//                                    size="sm"
//                                    className="me-2"
//                                    onClick={() => onEdit(event.eventId)}
//                                >
//                                    <i className="bi bi-pencil"></i>
//                                </Button>
//                                <Button
//                                    variant="outline-danger"
//                                    size="sm"
//                                    onClick={() => onDelete(event.eventId)}
//                                >
//                                    <i className="bi bi-trash"></i>
//                                </Button>
//                            </div>
//                        ) : (
//                            <Button
//                                variant={isBooked
//                                    ? (isDarkMode ? 'outline-secondary' : 'outline-secondary')
//                                    : (isDarkMode ? 'info' : 'primary')}
//                                className="book-button"
//                                    onClick={() => onBook(event.eventId)}
//                                disabled={isBooked}
//                            >
//                                {isBooked ? 'Booked' : 'Book Now'}
//                            </Button>
//                        )}
//                    </div>
//                </Card.Body>
//            </Card>
//        </Col>
//    );
//};

//// Admin Toolbar Component with dark mode support
//const AdminToolbar = ({ onCreateEvent, onShowMyEvents, isDarkMode }) => {
//    return (
//        <div className={`admin-toolbar mb-4 p-3 rounded ${isDarkMode ? 'bg-dark text-light border border-secondary' : 'bg-light'}`}>
//            <div className="d-flex justify-content-between align-items-center">
//                <h5 className={`m-0 ${isDarkMode ? "text-dark" : "text-dark"}`}>
//                    Admin Controls
//                </h5>
//                <div>
//                    <Button
//                        variant={isDarkMode ? "outline-success" : "success"}
//                        className="me-2"
//                        onClick={onCreateEvent}
//                    >
//                        <i className="bi bi-plus-circle me-2"></i>
//                        Create Event
//                    </Button>
//                    <Button
//                        variant={isDarkMode ? "outline-info" : "info"}
//                        onClick={onShowMyEvents}
//                    >
//                        <i className="bi bi-calendar-event me-2"></i>
//                        My Events
//                    </Button>
//                </div>
//            </div>
//        </div>
//    );
//};

//// Delete Confirmation Modal with dark mode support
//const DeleteConfirmationModal = ({ show, eventId, onClose, onConfirm, isDarkMode }) => {
//    return (
//        <Modal
//            show={show}
//            onHide={onClose}
//            centered
//            contentClassName={isDarkMode ? 'bg-dark text-light' : ''}
//        >
//            <Modal.Header
//                closeButton
//                className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//            >
//                <Modal.Title>Confirm Delete</Modal.Title>
//            </Modal.Header>
//            <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
//                Are you sure you want to delete this event? This action cannot be undone.
//            </Modal.Body>
//            <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
//                <Button variant={isDarkMode ? "outline-secondary" : "secondary"} onClick={onClose}>
//                    Cancel
//                </Button>
//                <Button variant="danger" onClick={() => onConfirm(eventId)}>
//                    Delete
//                </Button>
//            </Modal.Footer>
//        </Modal>
//    );
//};

//// Update Event Modal with dark mode support
//const UpdateEventModal = ({ show, event, onClose, onSave, isDarkMode }) => {
//    const [formData, setFormData] = useState({
//        name: '',
//        description: '',
//        category: '',
//        price: 0,
//        image: null,
//        date: '',
//        venue: ''

//    });

//    useEffect(() => {
//        if (event) {
//            console.log("Event datamody:", event);
//            setFormData({
//                name: event.name || '',
//                description: event.description || '',
//                category: event.category || '',
//                price: event.price || 0,
//                image: event.imageUrl || null,
//                date: event.date || '',
//                venue: event.venue || ''

//            });
//        }
//    }, [event]);

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData(prev => ({
//            ...prev,
//            [name]: name === 'price' ? parseFloat(value) : value
//        }));
//    };

//    const handleSubmit = (e) => {
//        e.preventDefault();
//        onSave(event.eventId, formData);
//        //apply getallevents





//    };

//    return (
//        <Modal
//            show={show}
//            onHide={onClose}
//            centered
//            contentClassName={isDarkMode ? 'bg-dark text-light' : ''}
//        >
//            <Modal.Header
//                closeButton
//                className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//            >
//                <Modal.Title>Update Event</Modal.Title>
//            </Modal.Header>
//            <Form onSubmit={handleSubmit}>
//                <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
//                    <Form.Group className="mb-3">
//                        <Form.Label>Name</Form.Label>
//                        <Form.Control
//                            type="text"
//                            name="name"
//                            value={formData.name}
//                            onChange={handleChange}
//                            required
//                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//                        />
//                    </Form.Group>
//                    <Form.Group className="mb-3">
//                        <Form.Label>Description</Form.Label>
//                        <Form.Control
//                            as="textarea"
//                            rows={3}
//                            name="description"
//                            value={formData.description}
//                            onChange={handleChange}
//                            required
//                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//                        />
//                    </Form.Group>
//                    <Form.Group className="mb-3">
//                        <Form.Label>Category</Form.Label>
//                        <Form.Control
//                            type="text"
//                            name="category"
//                            value={formData.category}
//                            onChange={handleChange}
//                            required
//                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//                        />
//                    </Form.Group>
//                    <Form.Group className="mb-3">
//                        <Form.Label>Price ($)</Form.Label>
//                        <Form.Control
//                            type="number"
//                            step="0.01"
//                            name="price"
//                            value={formData.price}
//                            onChange={handleChange}
//                            required
//                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//                        />
//                    </Form.Group>
//                    <Form.Group className="mb-3">
//                        <Form.Label>Date</Form.Label>
//                        <Form.Control
//                            type="date"
//                            name="date"
//                            value={formData.date ? formData.date.split('T')[0] : ''}
//                            onChange={handleChange}
//                            required
//                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//                        />
//                    </Form.Group>
//                    <Form.Group className="mb-3">
//                        <Form.Label>Venue</Form.Label>
//                        <Form.Control
//                            type="text"
//                            name="venue"
//                            value={formData.venue || ''}
//                            onChange={handleChange}
//                            required
//                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//                        />
//                    </Form.Group>
//                    <Form.Group className="mb-3">
//                        <Form.Label>Image</Form.Label>
//                        <Form.Control
//                            type="file"
//                            accept="image/*"
//                            name="image"
//                            onChange={(e) => setFormData(prev => ({
//                                ...prev,
//                                image: e.target.files[0]
//                            }))}
//                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
//                        />
//                    </Form.Group>
//                    {formData.image && (
//                        <div className="mb-3">
//                            <img
//                                src={
//                                    typeof formData.image === 'string'
//                                        ? `https://localhost:7246${formData.image}`
//                                        : URL.createObjectURL(formData.image)
//                                }
//                                alt="Preview"
//                                className="img-fluid"
//                                style={{ maxHeight: '200px', objectFit: 'cover' }}
//                            />
//                        </div>
//                    )}

//                </Modal.Body>
//                <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
//                    <Button variant={isDarkMode ? "outline-secondary" : "secondary"} onClick={onClose}>
//                        Cancel
//                    </Button>
//                    <Button variant={isDarkMode ? "info" : "primary"} type="submit">
//                        Save Changes
//                    </Button>
//                </Modal.Footer>
//            </Form>
//        </Modal>
//    );
//};

//// Events List Component
//const EventsList = () => {
//    const [events, setEvents] = useState([]);
//    const [userBookedEvents, setUserBookedEvents] = useState([]);
//    const [filteredEvents, setFilteredEvents] = useState([]);
//    const [searchTerm, setSearchTerm] = useState('');
//    const [categoryFilter, setCategoryFilter] = useState('All');
//    const [categories, setCategories] = useState(['All']);
//    const [showDeleteModal, setShowDeleteModal] = useState(false);
//    const [showUpdateModal, setShowUpdateModal] = useState(false);
//    const [eventToDelete, setEventToDelete] = useState(null);
//    const [eventToUpdate, setEventToUpdate] = useState(null);
//    const [isLoading, setIsLoading] = useState(true);
//    const [isDarkMode, setIsDarkMode] = useState(false);

//    const navigate = useNavigate();

//    // Get user role from local storage
//    const userRole = localStorage.getItem("userRole") || 'User';
//    const isAdmin = userRole === 'Admin';
//    // Check dark mode preference on mount
//    useEffect(() => {
//        const darkModePref = localStorage.getItem("darkMode") === "true";
//        setIsDarkMode(darkModePref);

//        if (darkModePref) {
//            document.body.classList.add("dark-mode");
//        } else {
//            document.body.classList.remove("dark-mode");
//        }
//    }, []);

//    // Toggle dark mode function
//    const toggleDarkMode = () => {
//        const newDarkModeState = !isDarkMode;
//        setIsDarkMode(newDarkModeState);
//        localStorage.setItem("darkMode", newDarkModeState);

//        if (newDarkModeState) {
//            document.body.classList.add("dark-mode");
//        } else {
//            document.body.classList.remove("dark-mode");
//        }
//    };

//    // Fetch events when the component mounts
//    useEffect(() => {
//        const fetchEvents = async () => {
//            try {
//                console.log("Fetching events...");
//                setIsLoading(true);
//                const token = localStorage.getItem("accessToken");
//                const response = await axios.get('https://localhost:7246/api/event/getallevents', {
//                    headers: {
//                        Authorization: `Bearer ${token}`,
//                    },
//                });

//                setEvents(response.data);
//                setFilteredEvents(response.data);

//                // Extract unique categories
//                const uniqueCategories = [...new Set(response.data.map(event => event.category))];
//                setCategories(['All', ...uniqueCategories]);

//                setIsLoading(false);
//            } catch (error) {
//                console.error("Error fetching events:", error);
//                setIsLoading(false);
//            }
//        };

//        fetchEvents();
//    }, []);

//    // Fetch the user's booked events
//    useEffect(() => {
//        const fetchUserBookedEvents = async () => {
//            try {
//                const token = localStorage.getItem("accessToken");

//                const response = await axios.get('https://localhost:7246/api/user/booked-events', {
//                    headers: {
//                        Authorization: `Bearer ${token}`,
//                    },
//                });
//                setUserBookedEvents(response.data);
//            } catch (error) {
//                console.error("Error fetching user's booked events:", error);
//            }
//        };

//        fetchUserBookedEvents();
//    }, []);

//    // Filter events when search term or category changes
//    useEffect(() => {
//        const filtered = events.filter(event => {
//            const name = event.name || '';
//            const description = event.description || '';
//            const matchesSearch =
//                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                description.toLowerCase().includes(searchTerm.toLowerCase());
//            const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;

//            return matchesSearch && matchesCategory;
//        });

//        setFilteredEvents(filtered);
//    }, [searchTerm, categoryFilter, events]);

//    // Handle booking an event
//    const handleBookEvent = async (eventId) => {
//        try {
//            const token = localStorage.getItem("accessToken");
//            await axios.post(`https://localhost:7246/api/user/book-event/${eventId}`, {}, {
//                headers: {
//                    Authorization: `Bearer ${token}`,
//                },
//            });

//            // Update the booked events state
//            setUserBookedEvents(prev => [...prev, eventId]);

//            // Show success notification
//            alert("Event booked successfully!");
//        } catch (error) {
//            console.error("Error booking event:", error);
//            alert("Failed to book event. Please try again.");
//        }
//    };

//    // Handle event creation for Admin
//    const handleCreateEvent = () => {
//        navigate('/create-event');
//    };

//    // Handle editing an event
//    const handleEditEvent = (eventId) => {
//        //console.log("Editing event:", JSON.stringify(events[0]));
//        console.log("eventId", eventId)
//        const eventToEdit = events.find(event => event.eventId === eventId);
//        console.log(eventId);
//        if (eventToEdit) {
//            setEventToUpdate(eventToEdit);
//            setShowUpdateModal(true);
//        }
//    };

//    // Handle updating an event
//    //const handleUpdateEvent = async (eventId, updatedData) => {
//    //    try {
//    //        const token = localStorage.getItem("accessToken");
//    //        console.log("Updating event with ID:", eventId);

//    //        await axios.put(`https://localhost:7246/api/Event/${eventId}`, updatedData, {
//    //            headers: {
//    //                Authorization: `Bearer ${token}`,
//    //            },
//    //        });



//    //        // Update the events state with the updated event
//    //        setEvents(prev => prev.map(event =>
//    //            event.eventId === eventId ? { ...event, ...updatedData } : event
//    //        ));

//    //        setShowUpdateModal(false);

//    //        // Show success notification
//    //        alert("Event updated successfully!");
//    //    } catch (error) {
//    //        console.error("Error updating event:", error);
//    //        alert("Failed to update event. Please try again.");
//    //    }
//    //};

//    const handleUpdateEvent = async (eventId, formData) => {
//        try {
//            const token = localStorage.getItem("accessToken");
//            console.log("Updating event with ID:", eventId);

//            // Send multipart/form-data request
//            const response = await axios.put(
//                `https://localhost:7246/api/Event/${eventId}`,
//                formData,
//                {
//                    headers: {
//                        Authorization: `Bearer ${token}`,
//                        'Content-Type': 'multipart/form-data'
//                    },
//                }
//            );

//            // Get the updated event from the response
//            const updatedEvent = response.data;

//            // Update the events state with the updated event
//            setEvents(prev => prev.map(event =>
//                event.eventId === eventId ? updatedEvent : event
//            ));
//            setFilteredEvents(prev => prev.map(event =>
//                event.eventId === eventId ? updatedEvent : event
//            ));

//            setShowUpdateModal(false);

//            // Show success notification
//            alert("Event updated successfully!");
//        } catch (error) {
//            console.error("Error updating event:", error);
//            alert(`Failed to update event: ${error.response?.data?.message || 'Please try again.'}`);
//        }
//    };

//    // Handle showing delete confirmation modal
//    const handleShowDeleteModal = (eventId) => {
//        console.log("Showing delete modal for event ID:", eventId);
//        console.log("welcoe", JSON.stringify(events[0]));
//        setEventToDelete(eventId);
//        setShowDeleteModal(true);
//    };

//    // Handle confirming event deletion
//    const handleDeleteEvent = async (eventId) => {
//        console.log("Deleting event with ID:", eventId);
//        try {
//            const token = localStorage.getItem("accessToken");
//            await axios.delete(`https://localhost:7246/api/Event/${eventId}`, {
//                headers: {
//                    Authorization: `Bearer ${token}`,
//                },
//            });

//            // Remove the deleted event from the state
//            setEvents(prev => prev.filter(event => event.eventId !== eventId));
//            setShowDeleteModal(false);

//            // Show success notification
//            alert("Event deleted successfully!");
//        } catch (error) {
//            console.error("Error deleting event:", error);
//            alert("Failed to delete event. Please try again.");
//        }
//    };

//    // Handle showing user's events (for Admin)
//    const handleShowMyEvents = () => {
//        navigate('/my-events');
//    };

//    // Handle user logout
//    const handleLogout = () => {
//        localStorage.removeItem("accessToken");
//        localStorage.removeItem("refreshToken");
//        localStorage.removeItem("userId");
//        localStorage.removeItem("userRole");
//        navigate('/login');
//    };

//    return (
//        <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
//            {/* Top navbar with search and filters */}
//            <Navbar bg={isDarkMode ? "dark" : "dark"} variant="dark" expand="lg" className="mb-4">
//                <Container>
//                    <Navbar.Brand href="#home">
//                        <i className="bi bi-calendar-event me-2"></i>
//                        Event Management
//                    </Navbar.Brand>
//                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                    <Navbar.Collapse id="basic-navbar-nav">
//                        <Form className="d-flex ms-auto">
//                            <div className="search-container me-3">
//                                <i className="bi bi-search search-icon"></i>
//                                <Form.Control
//                                    type="search"
//                                    placeholder="Search events..."
//                                    className={`search-input ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                                    value={searchTerm}
//                                    onChange={(e) => setSearchTerm(e.target.value)}
//                                />
//                            </div>
//                            <Form.Select
//                                className={`me-2 category-select ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                                value={categoryFilter}
//                                onChange={(e) => setCategoryFilter(e.target.value)}
//                            >
//                                {categories.map((category, index) => (
//                                    <option key={index} value={category}>{category}</option>
//                                ))}
//                            </Form.Select>

//                            <div className="d-flex">
//                                <Button
//                                    variant={isDarkMode ? "outline-light" : "outline-light"}
//                                    size="sm"
//                                    className="ms-2"
//                                    onClick={toggleDarkMode}
//                                >
//                                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
//                                </Button>

//                                <Button
//                                    variant="outline-danger"
//                                    size="sm"
//                                    className="ms-2"
//                                    onClick={handleLogout}
//                                >
//                                    <i className="bi bi-box-arrow-right"></i>
//                                </Button>
//                            </div>
//                        </Form>
//                    </Navbar.Collapse>
//                </Container>
//            </Navbar>

//            <Container className={`events-container ${isDarkMode ? 'text-light' : ''}`}>
//                <div className="fade-in-up">
//                    <div className="header-section mb-4">
//                        <h1 className="events-title">Upcoming Events</h1>
//                    </div>

//                    {isAdmin && <AdminToolbar
//                        onCreateEvent={handleCreateEvent}
//                        onShowMyEvents={handleShowMyEvents}
//                        isDarkMode={isDarkMode}
//                    />}

//                    {isLoading ? (
//                        <div className="text-center py-5">
//                            <Spinner animation="border" variant={isDarkMode ? "info" : "primary"} />
//                            <p className="mt-3">Loading events...</p>
//                        </div>
//                    ) : filteredEvents.length === 0 ? (
//                        <div className={`text-center py-5 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
//                            <i className="bi bi-grid-3x3-gap fs-1 mb-3"></i>
//                            <h4>No events found</h4>
//                            <p className={isDarkMode ? 'text-light' : 'text-muted'}>Try adjusting your search or filter criteria</p>
//                        </div>
//                    ) : (
//                        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                            {filteredEvents.map((event, index) => (
//                                <div key={event.eventId} className={`fade-in-up delay-${index % 5}`}>
//                                    <EventCard
//                                        event={event}
//                                        isBooked={userBookedEvents.includes(event.id)}
//                                        onBook={handleBookEvent}
//                                        onEdit={isAdmin ? handleEditEvent : undefined}
//                                        onDelete={isAdmin ? handleShowDeleteModal : undefined}
//                                        isDarkMode={isDarkMode}
//                                    />
//                                </div>
//                            ))}
//                        </Row>
//                    )}
//                </div>
//            </Container>

//            {/* Delete Confirmation Modal */}
//            <DeleteConfirmationModal
//                show={showDeleteModal}
//                eventId={eventToDelete}
//                onClose={() => setShowDeleteModal(false)}
//                onConfirm={handleDeleteEvent}
//                isDarkMode={isDarkMode}
//            />

//            {/* Update Event Modal */}
//            <UpdateEventModal
//                show={showUpdateModal}
//                event={eventToUpdate}
//                onClose={() => setShowUpdateModal(false)}
//                onSave={handleUpdateEvent}
//                isDarkMode={isDarkMode}
//            />
//        </div>
//    );
//};

//export default EventsList;


import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Navbar, Container, Badge, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventsList.css';
import { toast } from 'react-toastify';

// EventCard Component with enhanced UI and dark mode support
const EventCard = ({ event, isBooked, onBook, onEdit, onDelete, isDarkMode }) => {
    console.log("Event dataaaaaaaa:", event);
    return (
        <Col md={6} lg={4} className="mb-4">
            <Card className={`event-card h-100 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <div className="event-image-container">
                    <Card.Img
                        variant="top"
                        src={`https://localhost:7246${event.imageUrl}`}
                        className="event-image"
                    />
                    <Badge
                        bg="primary"
                        className="category-badge"
                    >
                        {event.category}
                    </Badge>
                </div>
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold mb-3">{event.name}</Card.Title>
                    <Card.Text className={`mb-4 flex-grow-1 ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                        {event.description.length > 100
                            ? `${event.description.substring(0, 100)}...`
                            : event.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className={`fw-bold ${isDarkMode ? 'text-info' : 'text-primary'}`}>${event.price}</span>
                        {onEdit && onDelete ? (
                            <div className="admin-actions d-flex ms-2">
                                <Button
                                    variant={isDarkMode ? "outline-info" : "outline-primary"}
                                    size="sm"
                                    className="me-2"
                                    onClick={() => onEdit(event.eventId)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDelete(event.eventId)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant={isBooked
                                    ? (isDarkMode ? 'outline-secondary' : 'outline-secondary')
                                    : (isDarkMode ? 'info' : 'primary')}
                                className="book-button"
                                onClick={() => onBook(event.eventId)}
                                disabled={isBooked}
                            >
                                {isBooked ? 'Booked' : 'Book Now'}
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

// Admin Toolbar Component with dark mode support
const AdminToolbar = ({ onCreateEvent, onShowMyEvents, isDarkMode }) => {
    return (
        <div className={`admin-toolbar mb-4 p-3 rounded ${isDarkMode ? 'bg-dark text-light border border-secondary' : 'bg-light'}`}>
            <div className="d-flex justify-content-between align-items-center">
                <h5 className={`m-0 ${isDarkMode ? "text-dark" : "text-dark"}`}>
                    Admin Controls
                </h5>
                <div>
                    <Button
                        variant={isDarkMode ? "outline-success" : "success"}
                        className="me-2"
                        onClick={onCreateEvent}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Event
                    </Button>
                    {/*<Button*/}
                    {/*    variant={isDarkMode ? "outline-info" : "info"}*/}
                    {/*    onClick={onShowMyEvents}*/}
                    {/*>*/}
                    {/*    <i className="bi bi-calendar-event me-2"></i>*/}
                    {/*    My Events*/}
                    {/*</Button>*/}
                </div>
            </div>
        </div>
    );
};

// Delete Confirmation Modal with dark mode support
const DeleteConfirmationModal = ({ show, eventId, onClose, onConfirm, isDarkMode }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            contentClassName={isDarkMode ? 'bg-dark text-light' : ''}
        >
            <Modal.Header
                closeButton
                className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
            >
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
                Are you sure you want to delete this event? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
                <Button variant={isDarkMode ? "outline-secondary" : "secondary"} onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => onConfirm(eventId)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// Update Event Modal with dark mode support
const UpdateEventModal = ({ show, event, onClose, onSave, isDarkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        image: null,
        date: '',
        venue: ''

    });

    useEffect(() => {
        if (event) {
            console.log("Event datamody:", event);
            setFormData({
                name: event.name || '',
                description: event.description || '',
                category: event.category || '',
                price: event.price || 0,
                image: event.imageUrl || null,
                date: event.date || '',
                venue: event.venue || ''

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
        onSave(event.eventId, formData);
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            contentClassName={isDarkMode ? 'bg-dark text-light' : ''}
        >
            <Modal.Header
                closeButton
                className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
            >
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
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date ? formData.date.split('T')[0] : ''}
                            onChange={handleChange}
                            required
                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Venue</Form.Label>
                        <Form.Control
                            type="text"
                            name="venue"
                            value={formData.venue || ''}
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
                            name="image"
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                image: e.target.files[0]
                            }))}
                            className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
                        />
                    </Form.Group>
                    {formData.image && (
                        <div className="mb-3">
                            <img
                                src={
                                    typeof formData.image === 'string'
                                        ? `https://localhost:7246${formData.image}`
                                        : URL.createObjectURL(formData.image)
                                }
                                alt="Preview"
                                className="img-fluid"
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                        </div>
                    )}

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

// Events List Component
const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [userBookedEvents, setUserBookedEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [eventToUpdate, setEventToUpdate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const navigate = useNavigate();

    // Get user role from local storage
    const userRole = localStorage.getItem("userRole") || 'User';
    const isAdmin = userRole === 'Admin';

    // Check dark mode preference on mount
    useEffect(() => {
        const darkModePref = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(darkModePref);

        if (darkModePref) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, []);

    // Toggle dark mode function
    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);
        localStorage.setItem("darkMode", newDarkModeState);

        if (newDarkModeState) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    };

    // Create a reusable function to fetch events
    const fetchEvents = async () => {
        try {
            console.log("Fetching events...");
            setIsLoading(true);
            const token = localStorage.getItem("accessToken");
            const response = await axios.get('https://localhost:7246/api/event/getallevents', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEvents(response.data);
            setFilteredEvents(response.data);

            // Extract unique categories
            const uniqueCategories = [...new Set(response.data.map(event => event.category))];
            setCategories(['All', ...uniqueCategories]);

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching events:", error);
            setIsLoading(false);
        }
    };

    // Fetch events when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    // Fetch the user's booked events
    useEffect(() => {
        const fetchUserBookedEvents = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const response = await axios.get('https://localhost:7246/api/user/booked-events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserBookedEvents(response.data);
            } catch (error) {
                console.error("Error fetching user's booked events:", error);
            }
        };

        fetchUserBookedEvents();
    }, []);

    // Filter events when search term or category changes
    useEffect(() => {
        const filtered = events.filter(event => {
            const name = event.name || '';
            const description = event.description || '';
            const matchesSearch =
                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        setFilteredEvents(filtered);
    }, [searchTerm, categoryFilter, events]);

    // Handle booking an event
    const handleBookEvent = async (eventId) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.post(`https://localhost:7246/api/user/book-event/${eventId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the booked events state
            setUserBookedEvents(prev => [...prev, eventId]);

            // Show success notification
            toast.success("Event booked successfully!");
         


        } catch (error) {
            console.error("Error booking event:", error);
            toast.error("Failed to book event. Please try again.");
        }
    };

    // Handle event creation for Admin
    const handleCreateEvent = () => {
        navigate('/create-event');
    };

    // Handle editing an event
    const handleEditEvent = (eventId) => {
        console.log("eventId", eventId)
        const eventToEdit = events.find(event => event.eventId === eventId);
        console.log(eventId);
        if (eventToEdit) {
            setEventToUpdate(eventToEdit);
            setShowUpdateModal(true);
        }
    };

    // Handle updating an event with fresh data fetch
    const handleUpdateEvent = async (eventId, formData) => {
        try {
            const token = localStorage.getItem("accessToken");
            console.log("Updating event with ID:", eventId);

            // Send multipart/form-data request
            await axios.put(
                `https://localhost:7246/api/Event/${eventId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            // Fetch all events again instead of just updating the local state
            await fetchEvents();

            setShowUpdateModal(false);

            // Show success notification
            //alert("Event updated successfully!");
            toast.success("Event updated successfully!");
        } catch (error) {
            console.error("Error updating event:", error);
            //alert(`Failed to update event: ${error.response?.data?.message || 'Please try again.'}`);
            toast.error("Failed to update event. Please try again.");
        }
    };

    // Handle showing delete confirmation modal
    const handleShowDeleteModal = (eventId) => {
        console.log("Showing delete modal for event ID:", eventId);
        console.log("welcoe", JSON.stringify(events[0]));
        setEventToDelete(eventId);
        setShowDeleteModal(true);
    };

    // Handle confirming event deletion
    const handleDeleteEvent = async (eventId) => {
        console.log("Deleting event with ID:", eventId);
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`https://localhost:7246/api/Event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the deleted event from the state
            setEvents(prev => prev.filter(event => event.eventId !== eventId));
            setShowDeleteModal(false);

            // Show success notification
            //alert("Event deleted successfully!");
            toast.success("Event deleted successfully!");
        } catch (error) {
            console.error("Error deleting event:", error);
            //    alert("Failed to delete event. Please try again.");
            toast.error("Failed to delete event. Please try again.");
        }
    };

    // Handle showing user's events (for Admin)
    const handleShowMyEvents = () => {
        navigate('/my-events');
    };

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        navigate('/login');
    };

    return (
        <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
            {/* Top navbar with search and filters */}
            <Navbar bg={isDarkMode ? "dark" : "dark"} variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="#home">
                        <i className="bi bi-calendar-event me-2"></i>
                        Event Management
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form className="d-flex ms-auto">
                            <div className="search-container me-3">
                                <i className="bi bi-search search-icon"></i>
                                <Form.Control
                                    type="search"
                                    placeholder="Search events..."
                                    className={`search-input ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Form.Select
                                className={`me-2 category-select ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Select>

                            <div className="d-flex">
                                <Button
                                    variant={isDarkMode ? "outline-light" : "outline-light"}
                                    size="sm"
                                    className="ms-2"
                                    onClick={toggleDarkMode}
                                >
                                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                </Button>
                            </div>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className={`events-container ${isDarkMode ? 'text-light' : ''}`}>
                <div className="fade-in-up">
                    <div className="header-section mb-4">
                        <h1 className="events-title">Upcoming Events</h1>
                    </div>

                    {isAdmin && <AdminToolbar
                        onCreateEvent={handleCreateEvent}
                        //onShowMyEvents={handleShowMyEvents}
                        isDarkMode={isDarkMode}
                    />}

                    {isLoading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant={isDarkMode ? "info" : "primary"} />
                            <p className="mt-3">Loading events...</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className={`text-center py-5 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                            <i className="bi bi-grid-3x3-gap fs-1 mb-3"></i>
                            <h4>No events found</h4>
                            <p className={isDarkMode ? 'text-light' : 'text-muted'}>Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {filteredEvents.map((event, index) => (
                                <div key={event.eventId} className={`fade-in-up delay-${index % 5}`}>
                                    <EventCard
                                        event={event}
                                        isBooked={userBookedEvents.includes(event.id)}
                                        onBook={handleBookEvent}
                                        onEdit={isAdmin ? handleEditEvent : undefined}
                                        onDelete={isAdmin ? handleShowDeleteModal : undefined}
                                        isDarkMode={isDarkMode}
                                    />
                                </div>
                            ))}
                        </Row>
                    )}
                </div>
            </Container>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                show={showDeleteModal}
                eventId={eventToDelete}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteEvent}
                isDarkMode={isDarkMode}
            />

            {/* Update Event Modal */}
            <UpdateEventModal
                show={showUpdateModal}
                event={eventToUpdate}
                onClose={() => setShowUpdateModal(false)}
                onSave={handleUpdateEvent}
                isDarkMode={isDarkMode}
            />
        </div>
    );
};

export default EventsList;

