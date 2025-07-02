'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Package, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}

export function ProductTable({ products, onEditProduct, onDeleteProduct }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'low-stock':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'out-of-stock':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Product Inventory ({filteredProducts.length} items)
        </CardTitle>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Product</th>
                <th className="text-left p-3 font-semibold">SKU</th>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-right p-3 font-semibold">Quantity</th>
                <th className="text-right p-3 font-semibold">Price</th>
                <th className="text-right p-3 font-semibold">Value</th>
                <th className="text-left p-3 font-semibold">Status</th>
                <th className="text-left p-3 font-semibold">Location</th>
                <th className="text-center p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Min: {product.minStockLevel}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-sm">{product.sku}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3 text-right">
                    <span className={`font-semibold ${
                      product.quantity <= product.minStockLevel 
                        ? 'text-red-600' 
                        : product.quantity <= product.minStockLevel * 2 
                        ? 'text-yellow-600' 
                        : 'text-green-600'
                    }`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="p-3 text-right">{formatCurrency(product.price)}</td>
                  <td className="p-3 text-right font-semibold">
                    {formatCurrency(product.price * product.quantity)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(product.status)}
                      <span className="text-sm capitalize">
                        {product.status.replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{product.location}</td>
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditProduct?.(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDeleteProduct?.(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found matching your search criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}