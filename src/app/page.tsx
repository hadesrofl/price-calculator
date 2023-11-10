import { Metadata } from "next";
import ServiceBoard from "./components/serviceBoard/ServiceBoard";

export const metadata: Metadata = {
  title: "Price Calculator",
  description: "A simple calculator to help with pricing",
};

export default function Dashboard() {
  return <ServiceBoard />;
}
