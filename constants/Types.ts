export type DonationList = {
  id: number;
  name: string;
  status: string;
  city: string;
  complete_address: string;
  image: string;
};

export type DonationTransactinList = {
  id: number;
  amount: number;
  created_at: string;
  name: string;
  city: string;
  complete_address: string;
  donation_type: string;
};

export type GenderListType = {
  id: number;
  text: string;
  isChecked: boolean;
};
