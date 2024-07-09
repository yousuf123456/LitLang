import { paymobApiUrl } from "./utils";

export const authenticate = async () => {
  const authTokenRes = await fetch(paymobApiUrl("/api/auth/tokens"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.PAYMOB_API_KEY,
    }),
  });

  const { token: authToken } = await authTokenRes.json();
  return authToken;
};

export const createSubscriptionPlan = async (authToken: string, body: any) => {
  const subscriptionPlanRes = await fetch(
    paymobApiUrl("/api/acceptance/subscription-plans"),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const subscriptionPlan = await subscriptionPlanRes.json();

  return subscriptionPlan;
};

export const createPaymobSubscription = async (body: any) => {
  const secret = `Token ${process.env.PAYMOB_SECRET_KEY}`;

  const subscriptionRes = await fetch(paymobApiUrl("/v1/intention/"), {
    method: "POST",
    headers: {
      Authorization: secret,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const subscription = await subscriptionRes.json();

  return subscription;
};
