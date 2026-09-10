// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import { bannerLists } from "../../utils";
import { Link } from 'react-router-dom';

const colors =["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

const HeroBanner =() => {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={2}
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}`}
            >
              <div className="flex items-center justify-center">
                <div className="hidden lg:flex justify-center w-1/2 p-8">
                  <div className="text-center text-white">
                    <h1 className="text-3xl text-white font-bold">
                      {item.title}
                    </h1>
                    <h3 className="text-5xl text-white font-bold mt-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-white font-bold mt-4">
                      {item.description}
                    </p>
                    <Link
                      to="/products"
                      className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
                <div className="w-full flex justify-center lg:w-1/2 p-4">
                  <img src={item?.image} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;