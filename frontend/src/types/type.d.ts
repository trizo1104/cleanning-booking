/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
}

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  confirm_password: string;
  title?: string;
}
interface IprocedureSteps {
  step: string;
  stepDescription: string;
}
interface Service {
  _id: string;
  name: string;
  icon: string;
  serviceOptions: IServiceOption[];
  duration: number;
  description: string;
  details: string;
  notes: string;
  warrantyPolicy?: string;
  benefits: string[];
  procedureSteps: IprocedureSteps[];
  safetyStandards: string[];
  technicianInfo: string;
  imageUrls: string[];
  isLoading: boolean;
  error: string | null;
}

interface ServiceFormData {
  name: string;
  icon: string;
  serviceOptions: ServiceOption[];
  duration: number;
  description: string;
  details: string;
  notes?: string;
  warrantyPolicy?: string;
  benefits: string[];
  procedureSteps: ProcedureStep[];
  safetyStandards: string[];
  technicianInfo?: string;
  imageUrls: string[];
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
  _id: Key | null | undefined;
  user: any;
  id: string;
  service: any;
  selectedOptionType: string;
  selectedPrice: string;
  date: string;
  time: string;
  address: string;
  note: string;
  status: string;
}

interface IReivew {
  rating: number;
  comment: string;
}

interface IGetReview extends IReivew {
  _id: string;
  user: { id: string; name: string };
  service: { name: string };
  createdAt: string;
  booking: { selectedOptionType: string };
}

interface IGetBooking {
  _id: string;
  service: {
    name: string;
    icon?: string;
  };
  date: string;
  time: string;
  address: string;
  note?: string;
  status: "pending" | "assigned" | "done" | "cancelled";
  rating?: number;
  review?: string;
  selectedOptionType: string;
  selectedPrice: string;
}

interface IAssignBookings extends IGetBooking {
  user: {
    name: string;
    phone: string;
  };
}
