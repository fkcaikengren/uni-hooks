declare global {
  const uni: {
    request?: (options: unknown) => void
    getSystemInfoSync?: () => Record<string, unknown>
    onNetworkStatusChange?: (cb: (res: unknown) => void) => void
  }
}

export {}
