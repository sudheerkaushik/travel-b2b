import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const FilterComponent: React.FC = () => {
  const [price, setPrice] = useState<string>('low');
  const [distance, setDistance] = useState<string>('1-3km');
  const [time, setTime] = useState<string>('30-45min');
  const [rating, setRating] = useState<number>(3);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    switch(type) {
      case 'price':
        setPrice(e.target.value);
        break;
      case 'distance':
        setDistance(e.target.value);
        break;
      case 'time':
        setTime(e.target.value);
        break;
      case 'rating':
        setRating(Number(e.target.value));
        break;
      default:
        break;
    }
  };

  return (
    <Container className="filter-container ms-4 bg-white p-4">
      <h2>Filters</h2>

      {/* Filter by Price */}
      <section id="filter-price">
        <h4>By Price</h4>
        <Form>
          <Form.Check 
            type="radio" 
            label="Low" 
            name="price" 
            value="low"
            checked={price === 'low'}
            onChange={(e) => handleFilterChange(e, 'price')} 
          />
          <Form.Check 
            type="radio" 
            label="Medium" 
            name="price" 
            value="medium"
            checked={price === 'medium'}
            onChange={(e) => handleFilterChange(e, 'price')} 
          />
          <Form.Check 
            type="radio" 
            label="High" 
            name="price" 
            value="high"
            checked={price === 'high'}
            onChange={(e) => handleFilterChange(e, 'price')} 
          />
        </Form>
      </section>

      {/* Filter by Distance */}
      <section id="filter-distance">
        <h4>By Distance</h4>
        <Form>
          <Form.Check 
            type="radio" 
            label="1-3 km" 
            name="distance" 
            value="1-3km"
            checked={distance === '1-3km'}
            onChange={(e) => handleFilterChange(e, 'distance')}
          />
          <Form.Check 
            type="radio" 
            label="4-7 km" 
            name="distance" 
            value="4-7km"
            checked={distance === '4-7km'}
            onChange={(e) => handleFilterChange(e, 'distance')}
          />
          <Form.Check 
            type="radio" 
            label="8-10 km" 
            name="distance" 
            value="8-10km"
            checked={distance === '8-10km'}
            onChange={(e) => handleFilterChange(e, 'distance')}
          />
        </Form>
      </section>

      {/* Filter by Time */}
      <section id="filter-time">
        <h4>By Time</h4>
        <Form>
          <Form.Check 
            type="radio" 
            label="Less than 30 min" 
            name="time" 
            value="30min"
            checked={time === '30-45min'}
            onChange={(e) => handleFilterChange(e, 'time')}
          />
          <Form.Check 
            type="radio" 
            label="30-45 min" 
            name="time" 
            value="30-45min"
            checked={time === '30-45min'}
            onChange={(e) => handleFilterChange(e, 'time')}
          />
          <Form.Check 
            type="radio" 
            label="45-60 min" 
            name="time" 
            value="45-60min"
            checked={time === '45-60min'}
            onChange={(e) => handleFilterChange(e, 'time')}
          />
        </Form>
      </section>

      {/* Filter by Rating */}
      <section id="filter-rating">
        <h4>By Rating</h4>
        <Form>
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <Form.Check 
              key={ratingValue} 
              type="radio" 
              label={`★ ${ratingValue}`} 
              name="rating" 
              value={ratingValue}
              checked={rating === ratingValue}
              onChange={(e) => handleFilterChange(e, 'rating')}
            />
          ))}
        </Form>
      </section>

      {/* Apply Filters Button */}
      <Button variant="primary" onClick={() => alert('Filters Applied')}>Apply Filters</Button>
    </Container>
  );
};

export default FilterComponent;
