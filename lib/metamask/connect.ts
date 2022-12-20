import { useMetamask } from "./useMetamask";
import { moowars } from "@utils/moowars";

export default async function connect() {
  if (!moowars.account) {
    await moowars.connectWallet();
  }

  const account = moowars.account;

  if (account === null) {
    useMetamask.setState({ accountId: null });
    console.error("Account is null.");

    return { status: "FAILED" };
  } else {
    useMetamask.setState({ accountId: account });
    console.log("Account: ", account, " is signed in.");

    return { status: "SUCCESS" };
  }
}
