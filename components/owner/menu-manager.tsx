"use client";

import { useState } from 'react';
import { Edit, Trash2, Plus, Save, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { foodTrucks } from '@/lib/dummy-data';
import { formatCurrency } from '@/lib/utils';
import { MenuItem } from '@/lib/types';

const MenuManager = () => {
  const initialMenuItems = foodTrucks[0].menu;
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const startEditing = (item: MenuItem) => {
    setEditingItem({ ...item });
    setNewItem(null);
  };
  
  const cancelEditing = () => {
    setEditingItem(null);
  };
  
  const startAddNew = () => {
    setNewItem({
      id: `new-${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      popular: false,
    });
    setEditingItem(null);
  };
  
  const cancelAddNew = () => {
    setNewItem(null);
  };
  
  const updateEditingItem = (field: keyof MenuItem, value: any) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    }
  };
  
  const updateNewItem = (field: keyof MenuItem, value: any) => {
    if (newItem) {
      setNewItem({ ...newItem, [field]: value });
    }
  };
  
  const saveEditedItem = () => {
    if (!editingItem) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMenuItems(prev => 
        prev.map(item => item.id === editingItem.id ? editingItem : item)
      );
      setEditingItem(null);
      setIsLoading(false);
    }, 1000);
  };
  
  const saveNewItem = () => {
    if (!newItem?.name || !newItem.description || !newItem.price) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const completeNewItem = newItem as MenuItem;
      setMenuItems(prev => [...prev, completeNewItem]);
      setNewItem(null);
      setIsLoading(false);
    }, 1000);
  };
  
  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setMenuItems(prev => prev.filter(item => item.id !== id));
        setIsLoading(false);
      }, 1000);
    }
  };
  
  const togglePopular = (id: string) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, popular: !item.popular } : item
      )
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Menu Items</h3>
        <Button onClick={startAddNew} disabled={!!newItem || !!editingItem}>
          <Plus className="mr-1 h-4 w-4" />
          Add Item
        </Button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}
      
      {/* New Item Form */}
      {newItem && (
        <div className="rounded-lg border p-4 shadow-sm">
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Item Name</label>
              <Input
                value={newItem.name || ''}
                onChange={(e) => updateNewItem('name', e.target.value)}
                placeholder="e.g., Classic Burger"
                required
              />
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium">Price (AUD)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={newItem.price || ''}
                onChange={(e) => updateNewItem('price', parseFloat(e.target.value))}
                placeholder="15.95"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              value={newItem.description || ''}
              onChange={(e) => updateNewItem('description', e.target.value)}
              placeholder="Describe your menu item..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              rows={3}
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newItem.popular || false}
                onChange={(e) => updateNewItem('popular', e.target.checked)}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Mark as popular</span>
            </label>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={saveNewItem} disabled={!newItem.name || !newItem.description || !newItem.price}>
              <Save className="mr-1 h-4 w-4" />
              Save Item
            </Button>
            <Button variant="outline" onClick={cancelAddNew}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      {/* Menu Items List */}
      <div className="rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Item</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b">
                  {editingItem && editingItem.id === item.id ? (
                    // Editing row
                    <>
                      <td className="px-4 py-3">
                        <Input
                          value={editingItem.name}
                          onChange={(e) => updateEditingItem('name', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <textarea
                          value={editingItem.description}
                          onChange={(e) => updateEditingItem('description', e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          rows={2}
                        ></textarea>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editingItem.price}
                          onChange={(e) => updateEditingItem('price', parseFloat(e.target.value))}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={editingItem.popular || false}
                            onChange={(e) => updateEditingItem('popular', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm">Popular</span>
                        </label>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" onClick={saveEditedItem}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={cancelEditing}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // Normal row
                    <>
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.description}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-3 text-center">
                        {item.popular ? (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                            Popular
                          </Badge>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => togglePopular(item.id)}
                          >
                            Make Popular
                          </Button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => startEditing(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20" onClick={() => deleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              
              {menuItems.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No menu items found. Click "Add Item" to create your first menu item.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;