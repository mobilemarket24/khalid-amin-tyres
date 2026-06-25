// Triggers a Netlify build via a private Build Hook.
// The hook URL is kept server-side (NETLIFY_BUILD_HOOK_URL env var) so it is
// never exposed in the client bundle. Only a logged-in Supabase user can call
// it: we verify the access token the admin page sends.

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL;
  if (!hookUrl) {
    return { statusCode: 500, body: "Build hook not configured (NETLIFY_BUILD_HOOK_URL)." };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return { statusCode: 401, body: "Missing session token." };
  }

  // Verify the token belongs to a real, logged-in Supabase user.
  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return { statusCode: 500, body: "Supabase env vars not configured." };
  }

  try {
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${token}` },
    });
    if (!userRes.ok) {
      return { statusCode: 401, body: "Invalid or expired session." };
    }
  } catch {
    return { statusCode: 502, body: "Could not verify session." };
  }

  // Trigger the build.
  try {
    const res = await fetch(hookUrl, { method: "POST" });
    if (!res.ok) {
      return { statusCode: 502, body: "Failed to trigger build." };
    }
  } catch {
    return { statusCode: 502, body: "Failed to reach build hook." };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
}
