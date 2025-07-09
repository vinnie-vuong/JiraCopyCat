import React from "react";
import companies from "@/data/companies";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";

const CompanyCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {companies.map(({ name, path, id }) => {
          return (
            <CarouselItem key={id}>
              <Image
                src={path}
                alt={name}
                width={200}
                height={56}
                className="h-9 sm:h-14 w-auto object-contain"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default CompanyCarousel;
