import { Anton, Inter, Source_Sans_3, Tajawal } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--anton",
});
export const inter = Inter({ subsets: ["latin"] });
export const tajawal = Tajawal({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--tajawal",
});
export const sourceSans3 = Source_Sans_3({
  variable: "--sourceSans3",
  subsets: ["latin"],
});
