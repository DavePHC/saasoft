import { defineStore } from 'pinia'

export interface Account {
  id: number;
  labels: { text: string }[];
  type: "Локальная" | "LDAP";
  login: string;
  password: string | null;
}

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem("accounts") || "[]") as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        labels: [],
        type: "Локальная",
        login: "",
        password: null,
      });
      this.saveToLocalStorage();
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(acc => acc.id === updatedAccount.id);
      if (index !== -1) {
        this.accounts[index] = updatedAccount;
        this.saveToLocalStorage();
      }
    },
    deleteAccount(id: number) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("accounts", JSON.stringify(this.accounts));
    },
  },
});
