import { business } from "../data/business";

type BranchKey = "dubai" | "sharjah";

export function getWhatsAppUrl(branch: BranchKey, message?: string) {
  const defaultMessage =
    "Hi, I need tyres or rims. Please send price and availability.";

  const text = encodeURIComponent(message || defaultMessage);
  const number = business.branches[branch].whatsappNumber;

  return "https://wa.me/" + number + "?text=" + text;
}

export function getBranchByValue(value: string): BranchKey {
  return value === "dubai" ? "dubai" : "sharjah";
}