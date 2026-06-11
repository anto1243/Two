import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COMPANY = {
  name: "Evariste Travaux Publics",
  shortName: "ETP",
  address: "10 Rue Charles Nungesser, 94290 Villeneuve-le-Roi",
  phone: "01 45 97 75 47",
  mobile: "06 59 85 64 29",
  email: "evaristetp@yahoo.fr",
  zone: "Val-de-Marne (94), Île-de-France",
  hours: "Lun – Ven : 7h00 – 18h00 / Sam : 7h00 – 12h00",
  siret: "",
  founded: "2005",
}

export const COLORS = {
  red: "#c41e3a",
  redDark: "#9b1528",
  navy: "#1e2d5a",
  navyDark: "#141e3d",
}
