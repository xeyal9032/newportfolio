import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|ru|tr|de|az)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
