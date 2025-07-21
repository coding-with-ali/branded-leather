

'use client';

import React, { useState, useRef } from 'react';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleTrack = async () => {
    if (!orderId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/trackOrder?id=${orderId}`);
      const data = await res.json();

      if (res.ok) {
        setOrder(data.order);
      } else {
        setOrder(null);
        alert(data.message);
      }
    } catch (err) {
      console.error('Track error:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // reload to bring back page UI
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Order Number (e.g. ORD-12345)"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <button
        onClick={handleTrack}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        {loading ? 'Tracking...' : 'Track Order'}
      </button>

      {order && (
        <>
          <div ref={printRef} className="border p-4 rounded bg-gray-100">
            <p><strong>Order #:</strong> {order.orderNumber}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.address}, {order.city}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Ordered On:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <hr className="my-2" />
            {order.products?.map((item: any, index: number) => (
              <div key={index} className="mb-2">
                <p><strong>Product:</strong> {item.name}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Size:</strong> {item.size}</p>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print Order
          </button>
        </>
      )}
    </div>
  );
};

export default OrderTracking;
