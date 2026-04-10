import React, { useState } from "react";
import html2pdf from "html2pdf.js";

import InvoiceTemplate from "../components/InvoiceTemplate";
import InvoiceForm from "../components/InvoiceForm";

const InvoiceGenerator = () => {
  const [form, setForm] = useState({
    invoiceNo: "",
    date: "",
    customerName: "",
  });

  const [items, setItems] = useState([
    { name: "", qty: 1, price: 0 },
  ]);

  const [loading, setLoading] = useState(false);

  // 🔥 CALCULATIONS
  const subtotal = items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  // 🔥 FINAL PDF FIX
  const generatePDF = async () => {
    setLoading(true);

    const element = document.getElementById("invoice-wrapper");

    await html2pdf()
      .set({
        margin: 0,
        filename: `invoice-${form.invoiceNo || "001"}.pdf`,

        html2canvas: {
          scale: 2,
          useCORS: true,
        },

        jsPDF: {
          unit: "px",
          format: [794, 1123],
          orientation: "portrait",
        },

        pagebreak: { mode: ["avoid-all"] },
      })
      .from(element)
      .save();

    setLoading(false);
  };

  return (
    <div style={pageStyle}>

      {/* 🔥 PREVIEW */}
      <div style={previewContainer}>
        <div style={previewWrapper}>
          
          {/* 🔥 IMPORTANT WRAPPER */}
          <div id="invoice-wrapper">
            <InvoiceTemplate
              form={form}
              items={items}
              subtotal={subtotal}
              gst={gst}
              total={total}
            />
          </div>

        </div>
      </div>

      {/* 🔥 FORM */}
      <div style={formContainer}>
        <InvoiceForm
          form={form}
          setForm={setForm}
          items={items}
          setItems={setItems}
        />

        <button
          onClick={generatePDF}
          style={downloadBtn}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

    </div>
  );
};

export default InvoiceGenerator;



// 🎨 STYLES

const pageStyle = {
  background: "#f3f4f6",
  minHeight: "100vh",
  padding: "20px",
};



// 🔥 PERFECT CENTER FIX
const previewContainer = {
  background: "#e5e7eb",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  minHeight: "90vh",   // ✅ balanced spacing
  overflow: "auto",
};



// 🔥 SCALE ONLY FOR UI (NOT PDF)
const previewWrapper = {
  transform: "scale(0.7)",
  transformOrigin: "top center",
};



// FORM
const formContainer = {
  maxWidth: "900px",
  margin: "auto",
};



// BUTTON
const downloadBtn = {
  marginTop: "15px",
  width: "100%",
  background: "#000",
  color: "#fff",
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
};