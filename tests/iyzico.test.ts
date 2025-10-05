import { generateAuthorizationString, iyzico } from "../lib/iyzico";

test('generate token from iyzico', async () => {
    const tokenResponse = await generateAuthorizationString();
    console.log(tokenResponse);
    expect(typeof tokenResponse).toBe('string');
    expect(tokenResponse.length).toBeGreaterThan(0);
});

//Test to create a iyzico order
test('creates an iyzico order', async () => {
    const token = await generateAuthorizationString();
    const price = 10.0;

    const orderResponse = await iyzico.initializePayment(price);
    console.log(orderResponse);

    expect(orderResponse).toHaveProperty('id');
    expect(orderResponse).toHaveProperty('status');
    expect(orderResponse.status).toBe('CREATED');
})