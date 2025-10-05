import CryptoJS from "crypto-js";

const apiUrl = process.env.IYZICO_API_URL || "https://sandbox-api.iyzipay.com";
const apiKey = process.env.IYZICO_CLIENT_ID || "";
const secretKey = process.env.IYZICO_APP_SECRET || "";

// export const iyzico ={
//   createOrder: async function createOrder(price: number){
//     const accessToken = await generateAuthorizationString();
//   }
// }

// İmza üret
function generateAuthorizationString(): string {
  const randomKey = Date.now().toString();

  // apiKey + randomKey → secretKey ile HMAC
  const textToSign = apiKey + randomKey;
  const hmac = CryptoJS.HmacSHA256(textToSign, secretKey);
  const signature = CryptoJS.enc.Base64.stringify(hmac);

  return `IYZWSv2 apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`;
}

export const iyzico = {
  // Örnek kullanım
  initializePayment: async function initializePayment(body: any) {
  const url = `${apiUrl}/payment/pay-with-iyzico/initialize`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: generateAuthorizationString(),
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
  },
  capturePayment: async function capturePayment(body: any){
  const url = `${apiUrl}/payment/iyzipos/checkoutform/auth/ecom/detail`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: generateAuthorizationString(),
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
 }

}

async function handleResponse(response: Response){
  if(response.ok){
    return response.json();
  } else{
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}


export { generateAuthorizationString };