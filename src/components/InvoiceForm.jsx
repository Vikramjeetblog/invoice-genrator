import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const InvoiceForm = ({ form, setForm, items, setItems }) => {
  const [errors, setErrors] = useState({});

  // 🔥 Auto Invoice No
  useEffect(() => {
    if (!form.invoiceNo) {
      setForm((prev) => ({
        ...prev,
        invoiceNo: "INV-" + Date.now().toString().slice(-5),
      }));
    }
  }, []);

  // 🔥 Validation
  const validate = () => {
    const newErrors = {};
    if (!form.customerName) newErrors.customerName = "Required";
    if (!form.date) newErrors.date = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Create Invoice</h2>

      {/* 🔥 FORM */}
      <div style={gridStyle}>
        <FloatingInput
          label="Invoice No"
          name="invoiceNo"
          value={form.invoiceNo}
          onChange={handleChange}
        />

        <FloatingInput
          label="Date"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          error={errors.date}
        />

        <FloatingInput
          label="Customer Name"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          error={errors.customerName}
        />

        {/* ✅ NEW FIELDS */}
        <FloatingInput
          label="Amount Received"
          name="amountReceived"
          value={form.amountReceived}
          onChange={handleChange}
        />

        <FloatingInput
          label="Amount Due"
          name="amountDue"
          value={form.amountDue}
          onChange={handleChange}
        />

        <FloatingInput
          label="Payment Method"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        />
      </div>

      {/* ITEMS HEADER */}
      <div style={itemsHeader}>
        <span>Item</span>
        <span style={{ textAlign: "center" }}>Qty</span>
        <span style={{ textAlign: "right" }}>Price</span>
        <span style={{ textAlign: "right" }}>Total</span>
      </div>

      {/* ITEMS */}
      {items.map((item, index) => (
        <div key={index} style={itemRow}>
          <input
            placeholder="Item name"
            value={item.name}
            onChange={(e) =>
              handleItemChange(index, "name", e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              handleItemChange(index, "qty", Number(e.target.value))
            }
            style={smallInput}
          />

          <input
            type="number"
            min="0"
            value={item.price}
            onChange={(e) =>
              handleItemChange(index, "price", Number(e.target.value))
            }
            style={smallInput}
          />

          <div style={totalBox}>
            <span>₹ {item.qty * item.price}</span>
            <FaTrash style={deleteIcon} onClick={() => removeItem(index)} />
          </div>
        </div>
      ))}

      {/* ACTION */}
      <button onClick={addItem} style={addButton}>
        <FaPlus /> Add Item
      </button>
    </div>
  );
};

export default InvoiceForm;


// 🔥 FLOATING INPUT COMPONENT
const FloatingInput = ({ label, error, ...props }) => {
  return (
    <div style={{ position: "relative" }}>
      <input {...props} style={inputStyle} />

      <label style={floatingLabel(props.value)}>
        {label}
      </label>

      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};


// 🎨 STYLES

const containerStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  maxWidth: "900px",
  margin: "20px auto",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  fontFamily: "'Poppins', sans-serif",
};

const titleStyle = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr", // same layout
  gap: "12px",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "14px 10px 6px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "13px",
  outline: "none",
};

const floatingLabel = (value) => ({
  position: "absolute",
  left: "10px",
  top: value ? "4px" : "12px",
  fontSize: value ? "10px" : "13px",
  color: "#777",
  transition: "0.2s",
  background: "#fff",
  padding: "0 4px",
});

const errorStyle = {
  color: "red",
  fontSize: "10px",
};

const smallInput = {
  ...inputStyle,
  textAlign: "center",
};

const itemsHeader = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  fontWeight: "600",
  fontSize: "13px",
  marginBottom: "8px",
};

const itemRow = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: "10px",
  marginBottom: "10px",
};

const totalBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const deleteIcon = {
  cursor: "pointer",
  color: "#ef4444",
};

const addButton = {
  marginTop: "10px",
  background: "#000",
  color: "#fff",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};