import { getUser } from "@/lib/getUser";
import HomePage from "@/components/homepage";

export default async function Page() {
  const user = await getUser();

  return <HomePage user={user} />;
}

