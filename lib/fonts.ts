import { Anton, Inter, Dosis } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--anton",
});
export const inter = Inter({ subsets: ["latin"] });
export const dosis = Dosis({
  subsets: ["latin"],
  variable: "--dosis",
});
