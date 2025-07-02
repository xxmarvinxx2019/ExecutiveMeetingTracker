'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  ShoppingCart,
  BarChart3
} from 'lucide-react';

interface DashboardProps {
  products: Product[];
}

export function Dashboard({ products }: DashboardProps) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const lowStockItems = products.filter(p => p.quantity <= p.minStockLevel).length;
  const outOfStockItems = products.filter(p => p.quantity === 0).length;
  const averagePrice = totalProducts > 0 ? totalValue / products.reduce((sum, p) => sum + p.quantity, 0) : 0;

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      icon: Package,
      description: 'Products in inventory',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Value',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      description: 'Current inventory value',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      description: 'Items below minimum level',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Out of Stock',
      value: outOfStockItems.toString(),
      icon: ShoppingCart,
      description: 'Items requiring restock',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const categoryStats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.quantity;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Inventory by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map(([category, quantity]) => {
                const percentage = totalProducts > 0 ? (quantity / products.reduce((sum, p) => sum + p.quantity, 0)) * 100 : 0;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">
                          {quantity} items ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Stock Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">In Stock</p>
                    <p className="text-sm text-green-700">Items available</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-green-600">
                  {products.filter(p => p.status === 'in-stock').length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-900">Low Stock</p>
                    <p className="text-sm text-yellow-700">Needs attention</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-yellow-600">
                  {products.filter(p => p.status === 'low-stock').length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">Out of Stock</p>
                    <p className="text-sm text-red-700">Requires restock</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-red-600">
                  {products.filter(p => p.status === 'out-of-stock').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}