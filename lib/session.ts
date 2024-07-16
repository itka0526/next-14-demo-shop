"use client";

import { SessionData } from "./types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const defaultSession: SessionData = {
    userId: null,
    userRole: "USER",
};

async function fetchJson<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    return fetch(input, {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
        ...init,
    }).then((res) => res.json());
}

function doLogout(url: string) {
    return fetchJson<SessionData>(url, {
        method: "DELETE",
    });
}

const sessionApiRoute = "/api/session";

export default function useSession() {
    const { data: session, isLoading } = useSWR(sessionApiRoute, fetchJson<SessionData>, {
        fallbackData: defaultSession,
    });

    const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);

    return { session, logout, isLoading };
}
