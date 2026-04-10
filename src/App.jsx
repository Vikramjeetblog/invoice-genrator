import React from "react";
import InvoiceGenerator from "./pages/InvoiceGenerator"; // ✅ fix path properly

const App = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "20px",
      }}
    >
      <InvoiceGenerator />
    </div>
  );
};

export default App;