import { useMetamask } from "./useMetamask";

export default async function listUnopenedPacks() {
  let unopenedPacks = [];

  const wait = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  await wait(5000);

  unopenedPacks = useMetamask.getState().unopenedPacks;

  return;
}
