import React from 'react';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';

const Index = () => {
  return (
    <div className="min-h-screen max-w-full flex flex-col bg-background">
      <Header title="Shopping List" />
      <main className="flex-1">
        <ShoppingList />
      </main>
    </div>
  );
};

export default Index;