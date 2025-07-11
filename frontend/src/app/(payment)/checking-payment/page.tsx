"use client";
import { Suspense } from "react";
import CheckingPaymentInner from "./CheckingPaymentInner";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20">Đang tải trang thanh toán...</div>
      }
    >
      <CheckingPaymentInner />;
    </Suspense>
  );
}
