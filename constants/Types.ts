export type DonationList = {
  id: number;
  name: string;
  status: string;
  city: string;
  complete_address: string;
  image: string;
  mobile_number: string;
  province: string;
  gender: string;
  area: string;
};

export type DonationTransactinList = {
  id: number;
  amount: number;
  created_at: string;
  name: string;
  city: string;
  complete_address: string;
  donation_type: string;
  mobile_number: string;
};

export type GenderListType = {
  id: number;
  text: string;
  isChecked: boolean;
};

export type TransactionListType = {
  id: string;
  created_at: string;
  updated_at: string;
  mobile_number: string;
  name: string;
  province: string;
  city: string;
  area: string;
  complete_address: string;
  gender: string;
  donation_type: string;
  amount: number;
  user: string;
  box: string;
};

export type MenuItemType = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export type MonthlyReportListType = {
  sr_no: number;
  created_at: string;
  name: string;
  mobile_number: string;
  city: string;
  donation_type: string;
  amount: number;
};

//box Edit Props Type
// mobile_number: string;
// name: string;
// province: string;
// city: string;
// area: string;
// complete_address: string;
// gender: GenderListType[];
// image: string | null;

export type BoxEditPropsType = {
  id: string;
  mobile_number: string;
  name: string;
  province: string;
  city: string;
  area: string;
  complete_address: string;
  gender: string;
  image: string;
};
