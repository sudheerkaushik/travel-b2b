import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import TripItem from "./../../app/components/common/trip-item";

// Mock Data for trips
const tripsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  location: "Thailand",
  duration: "3 days",
  persons: "2",
  title: `Discover amazing places of the world #${i + 1}`,
  price: `$${350 + i * 10}`,
  rating: "4.5",
  reviews: 250,
  image: "../img/package-1.jpg",
}));

const TripList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTrips, setFilteredTrips] = useState(tripsData);

  const tripsPerPage = 10;
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const handleFilter = (e) => {
    e.preventDefault();
    // Dummy filter logic (extend this as needed)
    const minPrice = parseInt(e.target.minPrice.value) || 0;
    const maxPrice = parseInt(e.target.maxPrice.value) || Infinity;

    const updatedTrips = tripsData.filter((trip) => {
      const price = parseInt(trip.price.slice(1)); // Remove "$" and convert to number
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredTrips(updatedTrips);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Row>
        {/* Filters Section */}
        <Col md={3}>
          <Form onSubmit={handleFilter} className="mb-4">
            <h4>Filters</h4>
            <Form.Group>
              <Form.Label>Min Price</Form.Label>
              <Form.Control type="number" name="minPrice" placeholder="e.g. 100" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Max Price</Form.Label>
              <Form.Control type="number" name="maxPrice" placeholder="e.g. 1000" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Apply Filters
            </Button>
          </Form>
        </Col>

        {/* Trips List Section */}
        <Col md={9}>
          <h1>Trips</h1>
          {currentTrips.map((trip) => (
            <TripItem key={trip.id} {...trip} />
          ))}

          {/* Pagination */}
          <Pagination className="mt-4 justify-content-center">
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default TripList;
