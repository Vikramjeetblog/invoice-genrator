import React, { useState } from "react";
import html2pdf from "html2pdf.js";

import InvoiceTemplate from "../components/InvoiceTemplate";
import InvoiceTemplate2 from "../components/InvoiceTemplate2";
import InvoiceForm from "../components/InvoiceForm";

const InvoiceGenerator = () => {
  const [form, setForm] = useState({
    invoiceNo: "",
    date: "",
    customerName: "",

    // Template 1 fields
  totalamountrecived: "",
    amountReceived: "",
    amountDue: "",
    paymentMethod: "",

    // Template 2 fields
    fromName: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    discountPercent: "",
    gstPercent: "",
  });

  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.qty || 0) * Number(item.price || 0),
    0
  );

const gstPercent =
  form.gstPercent !== undefined && form.gstPercent !== ""
    ? Number(form.gstPercent)
    : 0;

const gst = (subtotal * gstPercent) / 100;
const total = subtotal + gst;

  const renderTemplate = () => {
    const props = {
      form,
      items,
      subtotal,
      gst,
      total,
    };

    switch (selectedTemplate) {
      case "template2":
        return <InvoiceTemplate2 {...props} />;
      default:
        return <InvoiceTemplate {...props} />;
    }
  };

  const generatePDF = async () => {
    try {
      setLoading(true);

      const element = document.getElementById("pdf-render");
      if (!element) {
        throw new Error("PDF render element not found.");
      }

      await html2pdf()
        .set({
          margin: 0,
          filename: `invoice-${form.invoiceNo || "001"}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            windowWidth: 794,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            compress: true,
          },
          pagebreak: {
            mode: ["avoid-all", "css", "legacy"],
          },
        })
        .from(element)
        .save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={selectorStyle}>
        <label htmlFor="template-select" style={selectorLabel}>
          Choose Template
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          style={selectBox}
        >
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
      </div>

      <div style={previewContainer}>
        <div style={previewWrapper}>
          <div id="invoice-wrapper">{renderTemplate()}</div>
        </div>
      </div>

      <div style={hiddenRenderWrap}>
        <div id="pdf-render">{renderTemplate()}</div>
      </div>

      <div style={formContainer}>
        <InvoiceForm
          form={form}
          setForm={setForm}
          items={items}
          setItems={setItems}
          selectedTemplate={selectedTemplate}
        />

        <button onClick={generatePDF} style={downloadBtn} disabled={loading}>
          {loading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;

// Styles

const pageStyle = {
  background: "#f3f4f6",
  minHeight: "100vh",
  padding: "20px",
};

const selectorStyle = {
  maxWidth: "900px",
  margin: "0 auto 16px auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const selectorLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const selectBox = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  background: "#ffffff",
  outline: "none",
};

const previewContainer = {
  background: "#e5e7eb",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "90vh",
  overflow: "auto",
};

const previewWrapper = {
  zoom: 0.7,
  transformOrigin: "top center",
};

const hiddenRenderWrap = {
  position: "absolute",
  left: "-9999px",
  top: 0,
};

const formContainer = {
  maxWidth: "900px",
  margin: "auto",
};

const downloadBtn = {
  marginTop: "15px",
  width: "100%",
  background: "#111827",
  color: "#ffffff",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
};
