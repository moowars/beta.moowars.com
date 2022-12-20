import { useMetamask } from "./useMetamask";
import { moowars } from "@utils/moowars";

export default async function loadAccountPower() {
  let accountPower = moowars.heardPower;

  useMetamask.setState({
    accountPower: accountPower ?? 0,
  });

  return { status: "SUCCESS" };
}
