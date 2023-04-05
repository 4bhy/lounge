import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'
import { REACT_APP_STRIPE_PUBLIC_KEY } from '../../config'



const stripeTestPromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY)

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
