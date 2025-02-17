import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const FilterComponent: React.FC = () => {
  const [price, setPrice] = useState<string>('low');
  const [distance, setDistance] = useState<string>('1-3km');
  const [time, setTime] = useState<string>('30-45min');
  const [rating, setRating] = useState<number>(3);
  return (
    <Container className=" filter-container bg-white shadow rounded-4 p-4 ">
      <h2>Filters</h2>

      {/* Price Filter */}
      <div className="mb-3">
        <h5>Price</h5>
        <Form>
          <Form.Check
            type="radio"
            label="Low"
            name="price"
            value="low"
            checked={price === 'low'}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Medium"
            name="price"
            value="medium"
            checked={price === 'medium'}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="High"
            name="price"
            value="high"
            checked={price === 'high'}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form>
      </div>

      {/* Distance Filter */}
      <div className="mb-3">
        <h5>Distance</h5>
        <Form>
          <Form.Check
            type="radio"
            label="1-3 km"
            name="distance"
            value="1-3km"
            checked={distance === '1-3km'}
            onChange={(e) => setDistance(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="4-7 km"
            name="distance"
            value="4-7km"
            checked={distance === '4-7km'}
            onChange={(e) => setDistance(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="8-10 km"
            name="distance"
            value="8-10km"
            checked={distance === '8-10km'}
            onChange={(e) => setDistance(e.target.value)}
          />
        </Form>
      </div>

      {/* Time Filter */}
      <div className="mb-3">
        <h5>Time</h5>
        <Form>
          <Form.Check
            type="radio"
            label="Less than 30 min"
            name="time"
            value="30min"
            checked={time === '30min'}
            onChange={(e) => setTime(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="30-45 min"
            name="time"
            value="30-45min"
            checked={time === '30-45min'}
            onChange={(e) => setTime(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="45-60 min"
            name="time"
            value="45-60min"
            checked={time === '45-60min'}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form>
      </div>

      {/* Rating Filter */}
      <div className="mb-3">
        <h5>Rating</h5>
        <Form>
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <Form.Check
              key={ratingValue}
              type="radio"
              label={`★ ${ratingValue}`}
              name="rating"
              value={ratingValue}
              checked={rating === ratingValue}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          ))}
        </Form>
      </div>

      {/* Apply Filters Button */}
      <Button variant="primary" className="w-75 shadow rounded-2" onClick={() => alert('Filters Applied')}>
        Apply Filters
      </Button>
    </Container>
  );
};

export default FilterComponent;
