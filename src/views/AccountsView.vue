<template>
  <div class="container">
    <header class="header">
      <h1>Учётные записи</h1>
      <el-button type="primary" @click="addAccount">Добавить</el-button>
    </header>
    <el-main>
      <AccountForm
        v-for="account in store.accounts"
        :key="account.id"
        :account="account"
        @update="updateAccount"
        @delete="deleteAccount"
      />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/useAccountStore'
import AccountForm from '../components/AccountForm.vue'

const store = useAccountStore();

const addAccount = () => {
  store.addAccount();
};

const updateAccount = (account:any) => {
  store.updateAccount(account);
};

const deleteAccount = (id:any) => {
  store.deleteAccount(id);
};
</script>

<style scoped>

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.container {
  max-width: 1200px;
  margin: auto;
}
</style>
