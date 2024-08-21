import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/j43Q4Fj/deadpool-backdrop.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Marvel Studios Deadpool & Wolverine</h3>
          <p>Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool. They team up to defeat a common enemy.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <img
          className="d-block w-100"
          src="https://i.ibb.co/WP3Y59N/beauty-backdorp.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Beauty and the Beast</h3>
          <p>A young woman discovers she has magical powers and must protect her kingdom from a dark force threatening to destroy it.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <img
          className="d-block w-100"
          src="https://i.ibb.co/hd8Pbqk/johnwick-backdrop.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>John Wick: Chapter 4</h3>
          <p>
          A retired assassin is pulled back into the world of violence when an old enemy resurfaces with a deadly agenda.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}