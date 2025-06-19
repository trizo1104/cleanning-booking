interface FAQItem {
  question: string;
  answer: string;
}
interface IServiceOption {
  _id: string;
  optionType: string;
  priceFrom: number;
  description: string;
}
interface IprocedureSteps {
  step: string;
  stepDescription: string;
}
interface Service {
  _id: string;
  name: string;
  icon: string;
  category: string;
  serviceOptions: IServiceOption[];
  duration: number;
  description: string;
  details: string;
  notes: string;
  warrantyPolicy: string;
  benefits: string[];
  procedureSteps: IprocedureSteps[];
  safetyStandards: string[];
  technicianInfo: string;
  imageUrls: string[];
  isLoading: boolean;
  error: string | null;
}
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  service: {
    _id: string;
    name: string;
  };
}

interface IBooking {
  id: string;
  service: string;
  selectedOptionType: string;
  selectedPrice: string;
  date: string;
  time: string;
  address: string;
  note: string;
}

interface IReivew {
  rating: number;
  comment: string;
}

interface IGetReview extends IReivew {
  _id: string;
  user: { id: string; name: string };
}
