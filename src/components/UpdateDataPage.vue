<template>
    <div class="h-screen w-screen p-4 flex flex-col gap-8 overflow-hidden">
        <div class="navbar bg-base-200 rounded-md shadow-sm">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <div class="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        v3.1.2
                        <hr/>
                        copyright © 2024 CGLT
                    </div>
                </div>
            </div>
            <div class="navbar-center">
                <h1 class="text-2xl font-semibold">State Standards Editor</h1>
            </div>
            <div class="navbar-end">
                <button class="btn btn-ghost btn-circle" @click="handleNotificationsClick">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                        <span class="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <dialog class="modal" :class="{ 'modal-open': showingNotifications }">
                    <form method="dialog" class="modal-box">
                        <h3 class="font-bold text-lg">Notifications</h3>
                        <ul class="list-disc list-inside mt-4 space-y-2">
                            <div v-for="(note, index) in notifications" :key="index" role="alert" class="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{{ note }}</span>
                            </div>
                        </ul>
                        <div class="modal-action">
                            <button class="btn" @click="handleNotificationsClick">
                                Close
                            </button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
        <div class="flex-grow flex gap-8 overflow-hidden">
            <UpdateDataInputCard @itemSelected="handleItemSelected"/>
            <UpdateDataPreview :activeItem="activeItem"/>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import UpdateDataInputCard from './UpdateDataInputCard.vue';
import UpdateDataPreview from './UpdateDataPreview.vue';

export default defineComponent({
    name: 'UpdateDataPage',
    data() {
        return {
            activeItem: null,
            showingNotifications: false,
            notifications: []
        };
    },
    components: {
        UpdateDataInputCard,
        UpdateDataPreview
    },
    methods: {
        handleItemSelected(item) {
            this.activeItem = item;
        },
        handleNotificationsClick() {
            this.showingNotifications = !this.showingNotifications;
        }
    },
    mounted() {
        for (let i = 1; i <= 5; i++) {
            const keyWordBank = ["Update", "New", "Alert", "Notification", "Message", "Info", "Reminder", "Task", "Event", "Notice"];
            const randomWordBank = ["System", "User", "Admin", "Server", "Client", "Database", "Network", "Application", "Service", "Module"];
            const randomIndex1 = Math.floor(Math.random() * keyWordBank.length);
            const randomIndex2 = Math.floor(Math.random() * randomWordBank.length);
            const title = `${keyWordBank[randomIndex1]} from ${randomWordBank[randomIndex2]}`;
            this.notifications.push(title);
        }
    },
});
</script>