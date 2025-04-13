import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types";
import ShippingAddressForm from './shipping-address-form';
import CheckoutStep from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
    title: 'Shipping Address',
};

const ShippingAddressPage = async () => {
    const cart = await getMyCart();
    
    if(!cart || cart.items.length === 0) redirect('/cart');

    const session = await auth();
    console.log('This is your session', session);
    //console.log('This is your user', user);
    const userId = session?.user?.id;
    console.log('This will be your userIddddd' , userId);
    if(!userId) throw new Error('No user ID');


    const user = await getUserById(userId);


    return ( <>
    <CheckoutStep current={1}  />
    <ShippingAddressForm address={user.address as ShippingAddress}/> 
    </> );
}
 
export default ShippingAddressPage;