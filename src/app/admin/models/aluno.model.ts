import { Address } from "./endereco.model";

export interface Student {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  gender: string;
  address: Address;
}
