import CryptoJS from "crypto-js";

const apiUrl = process.env.IYZICO_API_URL;
const apiKey = process.env.IYZICO_CLIENT_ID || "";
const secretKey = process.env.IYZICO_APP_SECRET || "";

// export const iyzico ={
//   createOrder: async function createOrder(price: number){
//     const accessToken = await generateAuthorizationString();
//   }
// }

// İmza üret
function getUriPath(fullUrl: string): string {
  const url = new URL(fullUrl);
  return url.pathname; // sadece path kısmını alır
}

function generateAuthorizationString(uriPath: string, body: any): string {
  const randomVar = "123456789";
  const randomKey = Date.now().toString() + randomVar;

  const payload = uriPath + (body ? JSON.stringify(body) : "");

  const dataToEncrypt = randomKey + payload;
  const encryptedData = CryptoJS.HmacSHA256(dataToEncrypt, secretKey);
  const signature = CryptoJS.enc.Hex.stringify(encryptedData);

  const authorizationString =
    `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`;
  const base64EncodedAuthorization = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(authorizationString)
  );

  return `IYZWSv2 ${base64EncodedAuthorization}`;
}

export const iyzico = {
  initializePayment: async function initializePayment(body: any) {
    const url = `${apiUrl}/payment/pay-with-iyzico/initialize`;

    const bodyString = JSON.stringify(body);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: generateAuthorizationString(getUriPath(url), body),
      },
      body: bodyString,
    });


    return handleResponse(response);
  },
  capturePayment: async function capturePayment(body: any) {
    const url = `${apiUrl}/payment/iyzipos/checkoutform/auth/ecom/detail`;


    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: generateAuthorizationString(getUriPath(url), body),
      },
      body: JSON.stringify(body),
    });

    return handleResponse(response);
  },
};
async function handleResponse(response: Response){
  if(response.ok){
    return response.json();
  } else{
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export { generateAuthorizationString };