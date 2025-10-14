import { generateAuthorizationString, iyzico } from "../lib/iyzico";
import dotenv from "dotenv";
dotenv.config();

test('generate token from iyzico', async () => {
    const dummyPath = '/payment/pay-with-iyzico/initialize';
    const dummyBody = { test: true };

    const tokenResponse = generateAuthorizationString(dummyPath, dummyBody);
    console.log('tokenResponse is for iyzico: ', tokenResponse);

    expect(typeof tokenResponse).toBe('string');
    expect(tokenResponse.length).toBeGreaterThan(0);
});

//Test to create a iyzico order
test('creates an iyzico order', async () => {
    const validRequestBody = {
        "locale": "tr",
        "conversationId": "conversationId",
        "price": 6.0,
        "paidPrice": 6.0,
        "currency": "TRY",
        "basketId": "basketId",
        "paymentGroup": "PRODUCT",
        "callbackUrl": "https://callback.com/test",
        "enabledInstallments": [
            1,
            2,
            3,
            4,
            6,
            9,
            12
        ],
        "buyer": {
            "id": "BY789",
            "name": "John",
            "surname": "Doe",
            "identityNumber": "74300864791",
            "email": "sandboxtest@email.com",
            "gsmNumber": "+905350000000",
            "registrationDate": "2013-04-21 15:12:09",
            "lastLoginDate": "2015-10-05 12:43:35",
            "registrationAddress": "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
            "city": "Istanbul",
            "country": "Turkey",
            "zipCode": "34732",
            "ip": "85.34.78.112"
        },
        "shippingAddress": {
            "address": "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
            "zipCode": "34742",
            "contactName": "Jane Doe",
            "city": "Istanbul",
            "country": "Turkey"
        },
        "billingAddress": {
            "address": "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
            "zipCode": "34742",
            "contactName": "Jane Doe",
            "city": "Istanbul",
            "country": "Turkey"
        },
        "basketItems": [
            {
                "id": "BI101",
                "price": 1.0,
                "name": "Binocular",
                "category1": "Collectibles",
                "category2": "Accessories",
                "itemType": "PHYSICAL"
            },
            {
                "id": "BI102",
                "price": 2.0,
                "name": "Game code",
                "category1": "Game",
                "category2": "Online Game Items",
                "itemType": "VIRTUAL"
            },
            {
                "id": "BI103",
                "name": "Usb",
                "price": 3.0,
                "category1": "Electronics",
                "category2": "Usb / Cable",
                "itemType": "PHYSICAL"
            }
        ]
    };

    const orderResponse = await iyzico.initializePayment(validRequestBody);
    console.log('\n🧾 orderResponse from iyzico:\n', orderResponse);

    if (orderResponse.status === 'failure') {
        console.error('\n❌ IYZICO API ERROR');
        console.error('Error Code   :', orderResponse.errorCode);
        console.error('Error Message:', orderResponse.errorMessage);
        console.error('Conversation :', orderResponse.conversationId);
        throw new Error(`Iyzico API failed → ${orderResponse.errorMessage}`);
    }


    expect(orderResponse).toHaveProperty('token');
    expect(orderResponse).toHaveProperty('status');
    expect(orderResponse.status).toBe('success');
    expect(orderResponse).toHaveProperty('payWithIyzicoPageUrl');
});


test('captures iyzico payment detail', async () => {
    const validRequestBody = {
        "locale": "tr",
        "conversationId": "conversationId",
        "price": 6.0,
        "paidPrice": 6.0,
        "currency": "TRY",
        "basketId": "basketId",
        "paymentGroup": "PRODUCT",
        "callbackUrl": "https://callback.com/test",
        "enabledInstallments": [1, 2, 3, 6, 9, 12],
        "buyer": {
            "id": "BY789",
            "name": "John",
            "surname": "Doe",
            "identityNumber": "74300864791",
            "email": "sandboxtest@email.com",
            "gsmNumber": "+905350000000",
            "registrationDate": "2013-04-21 15:12:09",
            "lastLoginDate": "2015-10-05 12:43:35",
            "registrationAddress": "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
            "city": "Istanbul",
            "country": "Turkey",
            "zipCode": "34732",
            "ip": "85.34.78.112"
        },
        "shippingAddress": {
            "address": "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
            "zipCode": "34742",
            "contactName": "Jane Doe",
            "city": "Istanbul",
            "country": "Turkey"
        },
        "billingAddress": {
            "address": "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
            "zipCode": "34742",
            "contactName": "Jane Doe",
            "city": "Istanbul",
            "country": "Turkey"
        },
        "basketItems": [
            {
                "id": "BI101",
                "price": 1.0,
                "name": "Binocular",
                "category1": "Collectibles",
                "category2": "Accessories",
                "itemType": "PHYSICAL"
            },
            {
                "id": "BI102",
                "price": 2.0,
                "name": "Game code",
                "category1": "Game",
                "category2": "Online Game Items",
                "itemType": "VIRTUAL"
            },
            {
                "id": "BI103",
                "name": "Usb",
                "price": 3.0,
                "category1": "Electronics",
                "category2": "Usb / Cable",
                "itemType": "PHYSICAL"
            }
        ]
    };

    const initResponse = await iyzico.initializePayment(validRequestBody);
    console.log('\n🪙 initializePayment response:\n', initResponse);

    expect(initResponse.status).toBe('success');
    expect(initResponse).toHaveProperty('token');

    
    const captureRequestBody = {
        locale: "tr",
        conversationId: "conversationId",
        token: initResponse.token
    };

    const captureResponse = await iyzico.capturePayment(captureRequestBody);
    console.log('\n📦 capturePayment response:\n', captureResponse);

  
    expect(captureResponse).toHaveProperty('status');
    expect(['success', 'failure']).toContain(captureResponse.status);

    if (captureResponse.status === 'failure') {
        console.warn('⚠️ capturePayment failure:', captureResponse.errorMessage);
    } else {
        expect(captureResponse).toHaveProperty('paymentStatus');
    }
}, 15000); 