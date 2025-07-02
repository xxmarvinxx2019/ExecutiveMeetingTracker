'use client';

import React, { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { ProductTable } from '@/components/ProductTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/mockData';
import { Product } from '@/lib/types';
import { 
  Package, 
  Plus, 
  BarChart3, 
  Users, 
  Settings,
  Home
} from 'lucide-react';

export default function InventoryManagementSystem() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'suppliers' | 'reports'>('dashboard');

  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product);
    // This would open a modal or navigate to edit page
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleAddProduct = () => {
    console.log('Add new product');
    // This would open a modal or navigate to add page
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'suppliers', label: 'Suppliers', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Manager</h1>
                <p className="text-sm text-gray-600">Professional inventory tracking system</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleAddProduct} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-600 mt-1">Overview of your inventory status</p>
              </div>
              <Dashboard products={products} />
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Products</h2>
                <p className="text-gray-600 mt-1">Manage your product inventory</p>
              </div>
              <ProductTable 
                products={products}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Suppliers</h2>
                <p className="text-gray-600 mt-1">Manage supplier relationships</p>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Supplier Management Coming Soon</p>
                    <p className="text-sm">Track and manage your supplier relationships</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
                <p className="text-gray-600 mt-1">Analyze your inventory data</p>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Advanced Reports Coming Soon</p>
                    <p className="text-sm">Generate detailed inventory and sales reports</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}