import LocalStorage from "./localStorage";
import { TState } from "./types";

export const INTERNAL_STATE: string = 'state'
export const initState: TState = {
    playgrounds: [],
}

export const TEXT_PLAYGROUND_NAME: string = 'New playground'
export const TEXT_CSP_SETTING: string = [
    "default-src 'none'",
    "base-uri 'none'",
    "script-src 'unsafe-inline'",
    "style-src 'unsafe-inline'",
    "img-src 'self'",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'"
].join('; ') + ';'

export const URL_PLAYGROUND: string = 'playground'
export const PLAYGROUND_IFRAME_ID: string = 'pg-iframe'