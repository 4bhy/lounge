import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51MgPNUSGJWduBmwsipwpGdodNDToVW3dynb2wJ1WodeBiNCTmOpTzuTD9350zWhEH4p4mRPCNnomI1b7uFCGJzt70016bD7AeD"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

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
