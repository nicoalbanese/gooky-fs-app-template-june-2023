import { Button } from "@/components/ui/button";
import { useServerSession } from "@/lib/auth/utils";
import Link from "next/link";

export default async function Home() {
  const { session } = await useServerSession();
  return (
    <main>
      <h1>Hello</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="mt-4">
        {session?.user ? (
          <Link href="api/auth/signout">
            <Button>Sign out</Button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
