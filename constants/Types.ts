export type DonationList = {
  id: number;
  name: string;
  status: string;
  city: string;
  complete_address: string;
  image: string;
  mobile_number: string;
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

// {
//   "id": "782976db-a567-428a-ac00-f49cda1a7800",
//   "created_at": "2024-08-07T13:17:30.087991Z",
//   "updated_at": "2024-08-07T13:17:30.088004Z",
//   "mobile_number": "03013852348",
//   "name": "Abdul Qadeer",
//   "province": null,
//   "city": "Mianwali",
//   "area": null,
//   "complete_address": "Thati shareef mianwali",
//   "gender": null,
//   "donation_type": "BOX",
//   "amount": 460,
//   "user": "7df65a94-a303-446f-a03c-8f0b648ae3af",
//   "box": "f978a86f-3b3b-4adf-a1ba-e0f1abede99e"
// },

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
