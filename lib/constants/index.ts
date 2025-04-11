export const APP_NAME = process.env.NEXT_PUBLIC_NAME || 'Piya Tekstil'; 
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION || 'A modern ecommerce platform built with Next.js'; 
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
    email: '',
    password: '',
}

export const signUpDefaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};


export const shippingAddressDefaultValues = {
    fullName: 'Mehmet Doe',
    streetAddress: '123 Main st',
    city: 'Anytown',
    postalCode: '12345',
    country: 'Turkey'
};