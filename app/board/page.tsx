import { redirect } from "next/navigation";

export default function BoardRedirectPage() {
  redirect("/app/tasks");
}
