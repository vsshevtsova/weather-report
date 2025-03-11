import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Стандартные стили для Swiper
import "swiper/css/navigation"; // Стиль для стрелочек
import "swiper/css/pagination"; // Стиль для пагинации
import { Navigation, Pagination } from "swiper/modules";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import "./ForecastSwiper.scss";

interface Day {
  date: string;
  temperature: number;
  description: string;
}

interface ForecastProps {
  days: Day[];
  className?: string;
}

export const ForecastSwiper: FC<ForecastProps> = ({ days }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Расстояние между слайдами
        slidesPerView={3} // Количество слайдов, которые показываются одновременно
        navigation={false}
        pagination={{ clickable: true }}
        loop={false} // Зацикливаем слайды
        className="swiper-item"
      >
        {days.map((day) => (
          <SwiperSlide key={day.date}>
            <WeatherCard {...day} className="weather-card" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
