import React from "react";

const InvoiceTemplate = ({ form, items, subtotal, gst, total }) => {
  return (
    <div
      id="invoice"
      style={{
        width: "794px",
        minHeight: "1123px",
        margin: "auto",
        backgroundImage: "url('/bg.jpg')", // 🔁 your background
        backgroundSize: "cover",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      {/* WHITE CARD */}
      <div
        style={{
          background: "#fff",
          border: "4px solid #facc15",
          padding: "20px",
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* LEFT LOGO */}
          <img src="/logo.png" alt="logo" style={{ width: "80px" }} />

          {/* CENTER TEXT */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: "bold" }}>POWERED BY</p>
            <p style={{ fontSize: "12px" }}>
              The Fastest Growing Creator's Hub
            </p>
          </div>

          {/* RIGHT BADGE */}
          <img src="/badge.png" alt="badge" style={{ width: "80px" }} />
        </div>

        {/* TITLE */}
        <h1 style={{ color: "#facc15", marginTop: "20px" }}>
          INVOICE
        </h1>

        {/* INFO ROW */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p>Invoice No: {form.invoiceNo}</p>
            <p>CIN: U74999WB2022PTC257688</p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p>Billed to: {form.customerName}</p>
            <p>Date Issued: {form.date}</p>
          </div>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            marginTop: "20px",
            background: "#facc15",
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            fontWeight: "bold",
          }}
        >
          <span>ITEM</span>
          <span>QTY</span>
          <span>PRICE</span>
          <span>TOTAL</span>
        </div>

        {/* ITEMS */}
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{item.name}</span>
            <span>{item.qty}</span>
            <span>{item.price}</span>
            <span>{item.qty * item.price}</span>
          </div>
        ))}

        {/* BOTTOM SECTION */}
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            borderTop: "2px solid #facc15",
            paddingTop: "10px",
          }}
        >
          {/* LEFT */}
          <div style={{ flex: 1 }}>
            <p>Amount Received: ₹0.00</p>
            <p>Amount Due: ₹{total.toFixed(2)}</p>
            <p>Payment Mode: Online</p>
          </div>

          {/* RIGHT */}
          <div style={{ flex: 1, textAlign: "right" }}>
            <p>GST 18%: ₹{gst.toFixed(2)}</p>
            <p>Sum-total: ₹{total.toFixed(2)}</p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "20px", fontSize: "12px" }}>
          <p>Contact us:</p>
          <p>+91 74777-85280</p>
          <p>+91 78110-92672</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;