"use client";

import { Suspense } from "react";
import CheckingPaymentInner from "./page";

const PaymentStatusPage = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"loading" | "redirecting">("loading");

  const transactionId = searchParams.get("apptransid");

  useEffect(() => {
    const checkStatus = async () => {
      if (!transactionId) return router.push("/payment-failure");
      try {
        const res = await axios.get(
          `http://localhost:8080/api/payment-zalo/check-payment-status/${transactionId}`
        );
        if (res.data.success && res.data.status === "paid") {
          setStatus("redirecting");
          setTimeout(
            () => router.push("/checking-payment/payment-success"),
            1500
          );
        } else {
          setTimeout(
            () => router.push("/checking-payment/payment-failure"),
            1500
          );
        }
      } catch (err) {
        setTimeout(
          () => router.push("/checking-payment/payment-failure"),
          1500
        );
      }
    };
    checkStatus();
  }, [transactionId]);


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckingPaymentInner />
    </Suspense>
  );
};

export default PaymentStatusPage;