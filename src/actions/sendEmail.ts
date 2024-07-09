"use server";

const url = "https://api.brevo.com/v3/smtp/email";
const apiKey = process.env.BREVO_API_KEY!;

const headers = {
  Accept: "application/json",
  "api-key": apiKey,
  "Content-Type": "application/json",
};

export const sendEmail = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const data = {
      sender: {
        name: "Contact Form Query",
        email: "litlang58@gmail.com",
      },
      to: [
        {
          email: "litlang58@gmail.com",
          name: "Syed Yaseen",
        },
      ],
      subject: "Litlang Contact Form User Query",
      textContent: `${name}, ${email} has sent Litlang a message. (${message})`,
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    await fetch(url, requestOptions);

    return { success: true };
  } catch (e) {
    return { success: false };
  }
};
