export interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
  removedIngredients?: string[];
}

export interface Order {
  id: string;
  restaurantId: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  estimatedReadyTime?: string;
}

export interface RestaurantDashboard {
  id: string;
  name: string;
  activeOrders: Order[];
  completedOrders: Order[];
  isOnline: boolean;
  averagePreparationTime: number;
}