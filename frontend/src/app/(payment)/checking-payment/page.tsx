"use client";

import { Suspense } from "react";
import CheckingPaymentInner from "./page";

const PaymentStatusPage = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckingPaymentInner />
    </Suspense>
  );
};

export default PaymentStatusPage;