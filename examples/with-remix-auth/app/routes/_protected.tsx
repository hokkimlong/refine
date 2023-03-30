import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Layout } from "@refinedev/antd";
import { authenticator } from "~/utils/auth.server";

export default function AuthenticatedLayout() {
    // `<Layout>` is only applied if the user is authenticated
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export const loader = async ({ request }: LoaderArgs) => {
    const session = await authenticator.isAuthenticated(request);
    const pathname = new URL(request.url).pathname;

    let to = ``;
    // ignore only `/` routes
    if (pathname !== "/") {
        to = `?to=${pathname}`;
    }

    if (!session) {
        return redirect(`/login${to}`);
    }

    return {};
};