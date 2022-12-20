import { moowars } from "@utils/moowars";
import { MooType } from "types/MooType";
import { PackCollectionToken } from "types/PackCollectionToken";

type OPEN_PACKS_STATUS = "SUCCESS" | "FAILURE";

export default async function openPack(droppedMoo: PackCollectionToken) {
  let openStatus: OPEN_PACKS_STATUS = "FAILURE";

  let moos: MooType[] = [];

  try {
    const tokenId = droppedMoo.id;
    console.log("Opening pack: ", tokenId);

    let { txHash, txComplete } = await moowars.openPack(tokenId);

    console.log("Waiting for transaction to confirm (tx hash " + txHash + ")");

    let txReceipt = await txComplete;

    moos = await moowars.waitForChainlink(txReceipt);
    console.log(moos);

    openStatus = "SUCCESS";
  } catch (e) {
    console.log("Error: " + e.message);
  }

  return { status: openStatus, moos: moos };
}
