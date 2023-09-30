import { Dispatch, SetStateAction } from "react";

interface IProps {
  paymentOption: string;
  setPaymentOption: Dispatch<SetStateAction<string>>;
}
export function PaymentOptions({paymentOption, setPaymentOption}: IProps){
  return(
    <form autoComplete="off" className="my-4">
      <label htmlFor="paymentOptions">Escolha sua forma de pagamento:
        <select
          id="paymentOptions"
          name="paymentOptions"
          value={paymentOption}
          onChange={(e)=>setPaymentOption(e.target.value)}
          className="ml-2 border p-2 rounded-lg"
        >
          <option value="credit">Crédito</option>
          <option value="debit">Débito</option>
          <option value="payment_invoice">Boleto</option>
          <option value="pix">Pix</option>
        </select>
      </label>
    </form>
  )
}