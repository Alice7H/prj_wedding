'use client'
import { PaymentOptions } from "@/components/PaymentOptions";
import { Payment } from "@/types/Order";
import { useState } from "react";


export default function Order(){
  const [paymentOption, setPaymentOption] = useState<string>('');
  const [payment, setPayment] = useState<Payment|null>(null);

  function handleSavePaymentInfo(){
    const order = JSON.parse(localStorage.getItem('order') as string);
    setPayment(({
      paymentType: paymentOption,
      paymentDate: new Date(),
      paymentDetails: '',
      paid: false,
      orderId: '',
      total: order.total,
    }))
  }

  return (
    <>
     <main className="flex flex-col text-main items-center">
        <h1 className="text-title text-center font-bold">Pagamento: </h1>
        <div className="ml-4">
          <PaymentOptions setPaymentOption={setPaymentOption} paymentOption={paymentOption}/>
        </div>
        <div>
          <h2 className="text-lg font-bold">Informações da compra</h2>
          <p>Total</p>
        </div>
      </main>
    </>
  );
}