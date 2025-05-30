import Pusher from 'pusher-js';
import * as PusherPushNotifications from "@pusher/push-notifications-web";

// Initialize Pusher for real-time updates
export const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  encrypted: true
});

// Initialize Push Notifications
export const beamsClient = new PusherPushNotifications.Client({
  instanceId: import.meta.env.VITE_PUSHER_INSTANCE_ID,
});

// Subscribe to push notifications
export const subscribeToNotifications = async (userId: string) => {
  try {
    await beamsClient.start();
    await beamsClient.addDeviceInterest(`order_${userId}`);
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
  }
};