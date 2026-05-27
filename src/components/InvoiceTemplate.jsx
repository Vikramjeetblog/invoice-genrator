import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaPhoneVolume } from "react-icons/fa6";

// 🔥 FONTS
const fonts = {
  anton: "'Anton', sans-serif",
  inter: "'Inter', sans-serif",
  spartan: "'League Spartan', sans-serif",
  tahoma: "Tahoma, sans-serif",
};

const circleStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const InvoiceTemplate = ({
  form = {},
  items = [],
  subtotal = 0,
  gst = 0,
  total = 0,
}) => {
  const maxRows = 10;
  const displayItems = items.slice(0, maxRows);
  const emptyRows = maxRows - displayItems.length;

  return (
    <div
      id="invoice"
      style={{
        width: "210mm",
        minHeight: "296mm",
        height: "auto",
        margin: "0",
        boxSizing: "border-box",
        backgroundImage: "url('/background-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        padding: "15mm",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: fonts.inter,
        display: "flex",
      }}
    >
      {/* WHITE CARD */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "6px",
          border: "5px solid #f0e81b",
          padding: "30px",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          width: "100%",

        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            
            {/* LEFT LOGO */}
            <div style={{
              width: "90px",
              height: "90px",
              background: "#000",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <img src="/tcs.png" style={{ width: "75%", height: "75%", objectFit: "contain" }} />
            </div>

            {/* CENTER TEXT */}
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: fonts.anton,
                margin: 0,
                fontSize: "24px",
                letterSpacing: "1px",
              }}>
                POWERED BY
              </p>
              <p style={{ fontFamily: fonts.tahoma, fontSize: "18px", margin: 0 }}>
                The Fastest Growing Creator's <br /> Hub
              </p>
            </div>

            {/* RIGHT LOGO */}
            <img src="/logo.png" style={{ width: "90px",height:"90px", objectFit: "contain" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#f0e81b" }}>INVOICE</h1>
              <p><strong>GST No:</strong>19AAKCC6447Q1ZR</p>
              <p><strong>CIN:</strong>U74999WB2022PTC257688</p>
              <p><strong>Invoice No:</strong> {form?.invoiceNo}</p>
            </div>

            <div style={{ textAlign: "right",marginTop:"70px" }}>
              <p><strong>Billed to:</strong> <span style={{ fontWeight: "700" }}>{form?.customerName}</span></p>
              <p><strong>Date Issued:</strong> {form?.date}</p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div style={{ height: "370px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{
            background: "#f5ee4d",
            padding: "12px 10px",
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr 1fr",
            fontWeight: "700",
            fontSize: "13px",
          }}>
            <span>ITEM</span>
            <span style={{ textAlign: "center" }}>QTY</span>
            <span style={{ textAlign: "right" }}>PRICE</span>
            <span style={{ textAlign: "right" }}>TOTAL</span>
          </div>

          <div style={{ flex: 1 }}>
            {displayItems.map((item, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr 1fr 1fr",
                padding: "10px 0",
                borderBottom: "1px solid #e5e5e5",
                fontSize: "13px",
              }}>
                <span style={{ fontWeight: "700" }}>{item.name || "—"}</span>
                <span style={{ textAlign: "center" }}>{item.qty}</span>
                <span style={{ textAlign: "right" }}>₹ {item.price}</span>
                <span style={{ textAlign: "right", fontWeight: "600" }}>₹ {item.qty * item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 FULL WIDTH LINE */}
        <div style={{ height: "2px", background: "#f0e81b", margin: "10px -30px" }} />

        {/* TOTAL */}
       <div style={{ display: "flex", alignItems: "stretch" }}>
  

  

   {/* LEFT SIDE */}
  <div style={{ flex: 1, fontSize: "16px" }}>

    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
  <span><strong>Total Amount Received :</strong></span>
  <span>₹ {form?.totalamountrecived || 0}</span>
</div>

    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <span><strong>Amount Received :</strong></span>
      <span>₹ {form?.amountReceived || 0}</span>
    </div>

    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <span><strong>Amount Due :</strong></span>
      <span>₹ {form?.amountDue || 0}</span>
    </div>

    <div style={{ display: "flex", gap: "10px" }}>
      <span><strong>Payment Mode :</strong></span>
      <span>{form?.paymentMethod}</span>
    </div>

  </div>

  {/* CENTER DIVIDER */}
  <div style={{ width: "2px", background: "#f0e81b", margin: "0 20px" }} />

  {/* RIGHT SIDE */}
  <div style={{ flex: 1, fontSize: "16px" }}>
    
    {Number(form?.gstPercent) > 0 && (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
    <span>GST {form.gstPercent}%:</span>
    <span style={{ fontWeight: "600" }}>₹ {gst.toFixed(2)}</span>
  </div>
)}

    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>
  Sum-total <br />
  ({Number(form?.gstPercent) > 0 ? "inclusive of Taxes" : "without GST"}):
</span>
      <span style={{ fontWeight: "700" }}>
        ₹ {total.toFixed(2)}
      </span>
    </div>

  </div>

</div>

        {/* 🔥 FULL WIDTH LINE */}
        <div style={{ height: "2px", background: "#f0e81b", margin: "20px -30px" }} />

        {/* FOOTER */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p
  style={{
    fontFamily: fonts.spartan,
    fontWeight: "700",
    margin: "0 0 10px 0",
  }}
>
  Contact us:
</p>

<div style={{ display: "flex",  gap: "10px", alignItems: "flex-start" }}>
  <div style={circleStyle}>
    <FaPhoneVolume size={16} color="#fff"/>
  </div>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      fontWeight: "700",
      lineHeight: 1.5,
    }}
  >
    <span>+917811092672</span>
    
  
</div>
              
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <div style={circleStyle}><FaInstagram size={20} color="#f0e81b" /></div>
              <div style={circleStyle}><FaXTwitter size={20} color="#fff" /></div>
              <div style={circleStyle}><FaLinkedin size={20} color="#f0e81b" /></div>
            </div>

            <div style={{ marginTop: "7px", fontSize: "16px", fontWeight: "700" }}>
               <p style={{ margin: 0 }}>@thechordifiers.studio</p>
              <p style={{ margin: 0 }}>www.thechordifiers.studio</p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
