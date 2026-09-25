import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import toast from 'react-hot-toast';
import { createStripePaymentSecret } from '../../store/actions';
import CustomSkeleton from '../shared/CustomSkeleton';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
    const dispatch = useDispatch();
    const clientSecret = useSelector((state) => state.auth.clientSecret);
    const totalPrice = useSelector((state) => state.carts.totalPrice);
    const {isLoading, errormessage } = useSelector((state)=> state.errors);
    useEffect(()=> {
      if(!clientSecret){
        dispatch(createStripePaymentSecret(totalPrice, toast));
      }
    }, [clientSecret, dispatch, totalPrice]);
    if(isLoading){
      return (
        <div className='max-w-lg mx-auto'>
          <CustomSkeleton/>
        </div>
      )
    }
    return (
      <>
        {clientSecret && 
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice}/>
          </Elements>
        }
      </>
    )
}

export default StripePayment