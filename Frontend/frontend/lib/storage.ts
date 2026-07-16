export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Repair {
  id: string;
  title: string;
  detail: string;
  location: string;
  status: string;
  createdAt: string;
}

const USERS_KEY = "users";
const REPAIRS_KEY = "repairs";
const CURRENT_USER_KEY = "currentUser";
const TOKEN_KEY = "token";

let usersCache: User[] | null = null;
let repairsCache: Repair[] | null = null;

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  if (!usersCache) {
    const data = localStorage.getItem(USERS_KEY);
    usersCache = data ? JSON.parse(data) : [];
  }
  return usersCache as User[];
}

export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  usersCache = null;
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email === email);
}

export function getRepairs(): Repair[] {
  if (typeof window === "undefined") return [];
  if (!repairsCache) {
    const data = localStorage.getItem(REPAIRS_KEY);
    repairsCache = data ? JSON.parse(data) : [];
  }
  return repairsCache as Repair[];
}

export function saveRepair(repair: Repair): void {
  const repairs = getRepairs();
  repairs.push(repair);
  localStorage.setItem(REPAIRS_KEY, JSON.stringify(repairs));
  repairsCache = null;
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
}
