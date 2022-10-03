import { Address } from "./endereco.model";

export interface Student {
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  telephone: string;
  gender: string;
  address: Address;
  id: string;
  registNumber: number;
  course: string;
}
