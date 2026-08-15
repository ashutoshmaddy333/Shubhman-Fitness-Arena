/** Central debug gate — opt-in only via NEXT_PUBLIC_FORGE_DEBUG=true */
export function isForgeDebugEnabled(): boolean {
  return process.env.NEXT_PUBLIC_FORGE_DEBUG === "true";
}
