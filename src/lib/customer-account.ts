export type CustomerAccount = {
  name: string;
  email: string;
};

const ACCOUNT_KEY = "stbn-autos-account";
const SESSION_KEY = "stbn-autos-session";

export function getStoredAccount(): CustomerAccount | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(ACCOUNT_KEY);
    return value ? (JSON.parse(value) as CustomerAccount) : null;
  } catch {
    return null;
  }
}

export function getSignedInAccount(): CustomerAccount | null {
  if (typeof window === "undefined" || !window.localStorage.getItem(SESSION_KEY)) return null;
  return getStoredAccount();
}

export function createAccount(account: CustomerAccount) {
  window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  window.localStorage.setItem(SESSION_KEY, "true");
}

export function signInAccount(email: string) {
  const account = getStoredAccount();
  if (!account || account.email.toLowerCase() !== email.toLowerCase()) return null;
  window.localStorage.setItem(SESSION_KEY, "true");
  return account;
}

export function signOutAccount() {
  window.localStorage.removeItem(SESSION_KEY);
}
