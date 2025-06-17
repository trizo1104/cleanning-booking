import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

export const settingsHero = {
  dots: false,
  speed: 800,
  autoplay: true,
  autoplaySpeed: 3500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
};

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-[-35px] top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-300 hover:text-gray-500 transition-colors"
    >
      <ArrowRightCircle size={32} />
    </div>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-[-35px] top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-300 hover:text-gray-500 transition-colors"
    >
      <ArrowLeftCircle size={32} />
    </div>
  );
}

export const settings = {
  dots: true,
  infinite: false,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};
