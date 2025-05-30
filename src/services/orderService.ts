import { supabase } from '../lib/supabase';
import { pusher } from '../lib/pusher';
import type { Order, OrderItem } from '../types/order';

export const orderService = {
  // Create a new order
  async createOrder(restaurantId: string, items: OrderItem[], userId: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        restaurant_id: restaurantId,
        user_id: userId,
        items,
        status: 'pending',
        total_amount: calculateTotal(items)
      })
      .select()
      .single();

    if (error) throw error;

    // Notify restaurant about new order
    pusher.trigger(`restaurant_${restaurantId}`, 'new_order', {
      order: data
    });

    return data;
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error, data: order } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // Notify customer about status update
    pusher.trigger(`order_${order.user_id}`, 'status_update', {
      orderId,
      status
    });
  },

  // Subscribe to order updates
  subscribeToOrder(orderId: string, callback: (data: any) => void): () => void {
    const channel = pusher.subscribe(`order_${orderId}`);
    channel.bind('status_update', callback);
    return () => {
      channel.unbind('status_update', callback);
      pusher.unsubscribe(`order_${orderId}`);
    };
  },

  // Subscribe to restaurant orders
  subscribeToRestaurantOrders(restaurantId: string, callback: (data: any) => void): () => void {
    const channel = pusher.subscribe(`restaurant_${restaurantId}`);
    channel.bind('new_order', callback);
    return () => {
      channel.unbind('new_order', callback);
      pusher.unsubscribe(`restaurant_${restaurantId}`);
    };
  }
};

function calculateTotal(items: OrderItem[]): number {
  // Implementation would depend on your menu items and pricing structure
  return 0; // Placeholder
}