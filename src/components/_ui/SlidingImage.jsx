import { useEffect, useState } from "react";

const images = [
  "https://citinewsroom.com/wp-content/uploads/2021/11/CYBERTEQ1.jpeg",
  "https://www.myjoyonline.com/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-25-at-10.07.58-AM1.jpeg",
  "https://citinewsroom.com/wp-content/uploads/2021/12/Cyberteq-1.jpeg",
];

export default function SlidingImage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  let interval;

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    clearInterval(interval);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex transition-transform duration-800 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="min-w-full min-h-full object-cover hover:scale-110 transition-all"
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
