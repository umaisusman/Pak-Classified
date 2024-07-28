import React from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import usePostAdvertisement from './usePostAdvertisement';
import styles from './PostAdvertisement.module.css';

const PostAdvertisement = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleLocation,
    countries,
    provinces,
    cities,
    cityAreas,
    categories,
    adStatus
  } = usePostAdvertisement();

  return (
    <Container>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Post New Advertisement</h2>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            name="country"
            value={formData.country}
            onChange={handleLocation}
            required
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formProvince">
          <Form.Label>Province</Form.Label>
          <Form.Control
            as="select"
            name="province"
            value={formData.province}
            onChange={handleLocation}
            required
          >
            <option value="">Select a province</option>
            {provinces.map((province) => (
              <option key={province._id} value={province._id}>
                {province.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            name="city"
            value={formData.city}
            onChange={handleLocation}
            required
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCityArea">
          <Form.Label>City Area</Form.Label>
          <Form.Control
            as="select"
            name="cityAreaId"
            value={formData.cityAreaId}
            onChange={handleLocation}
            required
          >
            <option value="">Select a city area</option>
            {cityAreas.map((cityArea) => (
              <option key={cityArea._id} value={cityArea._id}>
                {cityArea.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCategoryId">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </Form.Group>
        {adStatus === 'loading' && <Spinner animation="border"/>}
        <Button type="submit" className={styles.submitButton}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostAdvertisement;
