export type DonationList = {
  id: number;
  name: string;
  collectedAmount: number;
  status: string;
  district: string;
  address: string;
  img: string;
};

export type DonationTransactinList = {
  transactionId: number;
  collectedAmount: number;
  collectedDate: string;
  collectedTime: string;
  custodianName: string;
  custodianImg: string;
  district: string;
  address: string;
};

export type GenderListType = {
  id: number;
  text: string;
  isChecked: boolean;
};
