export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'store_owner';
  password: string;
  storeId?: string;
  avgRating?: number;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  avgRating: number;
  totalRatings: number;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'admin@system.com',
    address: '123 Admin Street, Admin City, AC 12345',
    role: 'admin',
    password: 'Admin123!'
  },
  {
    id: '2',
    name: 'John Smith Regular User',
    email: 'john@example.com',
    address: '456 User Avenue, User City, UC 67890',
    role: 'user',
    password: 'User123!'
  },
  {
    id: '3',
    name: 'Store Owner Johnson Williams',
    email: 'owner@techstore.com',
    address: '789 Store Boulevard, Store City, SC 11111',
    role: 'store_owner',
    password: 'Store123!',
    storeId: '1',
    avgRating: 4.5
  },
  {
    id: '4',
    name: 'Alice Brown Normal User Account',
    email: 'alice@example.com',
    address: '321 Customer Lane, Customer City, CC 22222',
    role: 'user',
    password: 'Alice123!'
  }
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Tech Electronics Store',
    email: 'contact@techstore.com',
    address: '789 Store Boulevard, Store City, SC 11111',
    ownerId: '3',
    avgRating: 4.5,
    totalRatings: 120
  },
  {
    id: '2',
    name: 'Fashion Boutique Central',
    email: 'info@fashionboutique.com',
    address: '456 Fashion Street, Fashion City, FC 33333',
    ownerId: '5',
    avgRating: 4.2,
    totalRatings: 89
  },
  {
    id: '3',
    name: 'Home Goods Market Place',
    email: 'support@homegoods.com',
    address: '123 Home Avenue, Home City, HC 44444',
    ownerId: '6',
    avgRating: 3.8,
    totalRatings: 67
  }
];

export const mockRatings: Rating[] = [
  {
    id: '1',
    userId: '2',
    storeId: '1',
    rating: 5,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: '4',
    storeId: '1',
    rating: 4,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    userId: '2',
    storeId: '2',
    rating: 4,
    createdAt: '2024-02-01'
  }
];