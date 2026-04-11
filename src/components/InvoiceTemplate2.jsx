import React from "react";

// CELL STYLES
const cellStyle = {
  borderBottom: "1px solid #000",
  borderRight: "1px solid #000",
  padding: "20px",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
};

const rightCell = {
  ...cellStyle,
  borderRight: "none",
};

const InvoiceTemplate2 = ({
  form = {},
  items = [],
  subtotal = 0,
}) => {
  const discountPercent = Number(form?.discountPercent);
  const discount = subtotal * (discountPercent / 100);
  const finalTotal = subtotal - discount;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "296mm",
        height: "auto",
        margin: "0",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#000",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src="/tcs.png"
            alt="Logo"
            style={{
              width: "70%",
              height: "70%",
              objectFit: "contain",
            }}
          />
        </div>

        <div
          style={{
            textAlign: "right",
            fontSize: "18px",
            lineHeight: "1.6",
            marginLeft: "20px",
          }}
        >
          <p style={{ margin: 0,  }}>Shaktigarh Road No 8 Siliguri</p>
          <p style={{ margin: 0 }}>Darjeeling 734005</p>
          <p style={{ margin: 0 }}>West Bengal India</p>
          <p style={{ margin: 0 }}>www.thechordifiers.studio</p>
          <p style={{ margin: 0 }}>+917811092672</p>
          <p style={{ marginTop: "20px" }}> <strong>CIN-</strong> U74999WB2022PTC257688</p>
          <p style={{ marginRight:"50px",  }}> <strong>GSTIN-</strong>19AAKCC6447Q1ZR</p>
        </div>
      </div>

      {/* CUSTOMER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        <div>
          <p style={{ margin: "0 0 4px 0" }}>
            <strong>Bill To:</strong>
          </p>
          <p style={{ margin: 0, fontWeight: "700", fontSize: "16px" }}>
            {form?.customerName || "Customer Name"}
          </p>
        </div>

        <div
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            Date: {form?.date || "-"}
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "0.5px",
            }}
          >
            INVOICE {form?.invoiceNo || "-"}
          </h1>

          
        </div>
      </div>

      {/* TABLE HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1.4fr 0.8fr 1fr",
          borderBottom: "2px solid #000",
          paddingBottom: "10px",
          fontWeight: "700",
          fontSize: "18px",
        }}
      >
        <span>Services</span>
        <span style={{ textAlign: "right" }}>Rate</span>
        <span style={{ textAlign: "center" }}>Qty</span>
        <span style={{ textAlign: "right" }}>Total</span>
      </div>

      {/* TABLE BODY */}
      <div style={{ flex: 1 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1.4fr 0.8fr 1fr",
              padding: "10px 0",
              borderBottom: "1px solid #ddd",
              fontSize: "16px",
              fontWeight: "700",
              alignItems: "center",
            }}
          >
            <span>{item.name || "Service Name"}</span>

            <span style={{ textAlign: "right" }}>
              {item.unit && item.unit !== "Hr" ? (
  <>₹ {Number(item.price || 0).toFixed(2)} / {item.unit}</>
) : (
  <>₹ {Number(item.price || 0).toFixed(2)}</>
)}
            </span>

            <span style={{ textAlign: "center" }}>{item.qty || 0}</span>

            <span style={{ textAlign: "right" }}>
              ₹ {(Number(item.qty || 0) * Number(item.price || 0)).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* DIVIDER */}
      <div style={{ height: "3px", background: "#000", margin: "25px 0",width:"50%"}} />

      {/* BOTTOM */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "30px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "42px", margin: "0 0 20px 0", lineHeight: 1.1 }}>
            THANK YOU!
          </h1>

          <p style={{ margin: "0 0 8px 0", fontWeight: "800", fontSize: "18px" }}>
            Payment Details:
          </p>
          <p style={{ margin: "0 0 6px 0" }}>
            Bank Name: {form?.bankName || "ICICI Bank"}
          </p>
          <p style={{ margin: "0 0 6px 0" }}>
            Account Name: {form?.accountName || "The Chordifiers"}
          </p>
          <p style={{ margin: "0 0 6px 0" }}>
            A/C No: {form?.accountNo || "1234567890"}
          </p>
          <p style={{ margin: 0 }}>
            IFSC: {form?.ifsc || "ICIC0001234"}
          </p>
        </div>

        <div
          style={{
            width: "320px",
            border: "2px solid #000",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            boxSizing: "border-box",
            flexShrink: 0,
            marginTop :"-50px"
          }}
        >
          <div style={{ ...cellStyle, fontWeight: "700" }}>Subtotal</div>
          <div style={rightCell}>₹ {subtotal.toFixed(2)}</div>

          <div style={{ ...cellStyle, fontWeight: "700" }}>
            Discount <br /> {discountPercent}%
          </div>
          <div style={rightCell}>₹ {discount.toFixed(2)}</div>

          <div
            style={{
              ...cellStyle,
              borderBottom: "none",
              fontWeight: "700",
            }}
          >
            Total
          </div>
          <div
            style={{
              ...rightCell,
              borderBottom: "none",
              fontWeight: "700",
            }}
          >
            ₹ {finalTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate2;