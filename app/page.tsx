import { redirect } from "next/navigation";

// Home routes to the garden directory — choose a plant first.
export default function Home() {
  redirect("/garden");
}
