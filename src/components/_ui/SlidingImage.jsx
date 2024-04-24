import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const images = [
  "https://citinewsroom.com/wp-content/uploads/2021/11/CYBERTEQ1.jpeg",
  "https://www.myjoyonline.com/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-25-at-10.07.58-AM1.jpeg",
  "https://citinewsroom.com/wp-content/uploads/2021/12/Cyberteq-1.jpeg",
];

export default function SlidingImage() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        speed={2000}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        navigation={true}
        // navigation={{
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-navigation-size": "25px",
        }}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image} alt={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
