import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'



const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const StripeContainer = ({state, discountPrice, couponId }) => {
  return (
    <div>
      <Elements stripe={stripeTestPromise}>
			<PaymentForm state={state} couponId={couponId} discountPrice={discountPrice} />
		</Elements>
    </div>
  )
}

export default StripeContainer
