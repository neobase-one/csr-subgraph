import {
  Assign as AssignEvent,
  DistributeFees as DistributeFeesEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Register as RegisterEvent,
  Transfer as TransferEvent,
} from "../../generated/Turnstile/Turnstile";
import { NFT } from "../../generated/schema";

export function handleAssign(event: AssignEvent): void {
  let entity = NFT.load(event.params.tokenId.toString());
  let contractArray = entity!.contracts;
  if (contractArray !== null) {
    contractArray = contractArray.concat([event.params.smartContract]);
  } else {
    contractArray = [event.params.smartContract];
  }
  entity!.contracts = contractArray;
  entity!.save();
}

export function handleRegister(event: RegisterEvent): void {
  let entity = new NFT(event.params.tokenId.toString());
  entity.owner = event.params.recipient;
  entity.contracts = [event.params.smartContract];
  entity.tokenId = event.params.tokenId;
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = NFT.load(event.params.tokenId.toString());
  if (!entity) {
    entity = new NFT(event.params.tokenId.toString());
  }
  entity.owner = event.params.to;
  entity.save();
}
