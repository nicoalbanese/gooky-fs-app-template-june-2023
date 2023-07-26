import { Button } from "@/components/ui/button";
import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main>
      <h1>Hello</h1>
      <div className="mt-4">
        {session?.user ? (
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <Link href="api/auth/signout">
              <Button>Sign out</Button>
            </Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
