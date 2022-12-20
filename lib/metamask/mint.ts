import { moowars } from "@utils/moowars";
import { useMetamask } from "./useMetamask";

export default async function mint(amount: number) {
  type PurchaseStatuses = "SUCCESS" | "FAILURE" | "";

  let purchaseStatus: PurchaseStatuses = "";

  try {
    let { txHash, txComplete } = await moowars.buyPack(amount);

    const txURL = moowars.txUrl(txHash);
    useMetamask.setState({ currentTxURL: txURL });

    console.log("Waiting for transaction to confirm (tx hash " + txHash + ")");

    let txReceipt = await txComplete;

    console.log("Transaction complete");
    purchaseStatus = "SUCCESS";

    return { status: purchaseStatus, txReceipt };
    // moowars.packCollection.on('add') will emit an event at this point
  } catch (e) {
    console.error(e);
    purchaseStatus = "FAILURE";
    return { status: purchaseStatus };
  }
}
