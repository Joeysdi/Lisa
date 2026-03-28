import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin: HTTP Basic Auth
  if (pathname.startsWith("/admin")) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const auth = request.headers.get("authorization");

    if (adminPassword) {
      if (!auth || !isValidBasicAuth(auth, adminPassword)) {
        return new NextResponse("Unauthorized", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Lisa Admin"' },
        });
      }
    }
    return NextResponse.next();
  }

  // Dashboard: Supabase session check
  if (pathname.startsWith("/dashboard")) {
    const response = NextResponse.next();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return response;
  }

  return NextResponse.next();
}

function isValidBasicAuth(auth: string, password: string): boolean {
  try {
    const base64 = auth.replace("Basic ", "");
    const decoded = Buffer.from(base64, "base64").toString();
    const colonIndex = decoded.indexOf(":");
    const pass = decoded.slice(colonIndex + 1);
    return pass === password;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
