import { createRouter, createWebHistory } from "vue-router"
import AccountsView from "../views/AccountsView.vue"

const routes = [
    { path: "/", component: AccountsView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
