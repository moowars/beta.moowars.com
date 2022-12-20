import { useMetamask } from "./useMetamask";

export default async function loadNotifications() {
  const loggedIn = useMetamask.getState().accountId !== null;

  const wait = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  await wait(5000);

  let notifications: {
    message: string;
    time: string;
    url: string;
  }[] = loggedIn
    ? [
        {
          message: "x09...48j4 bid on your card #8185",
          time: "32M",
          url: "/test",
        },
        {
          message: "Your card #1059 is now in battle",
          time: "6H",
          url: "/test",
        },
        {
          message: "Smoof’s battle has been decided",
          time: "1D",
          url: "/test",
        },
      ]
    : [];

  return {
    status: "SUCCESS",
    notifications: notifications,
  };
}
