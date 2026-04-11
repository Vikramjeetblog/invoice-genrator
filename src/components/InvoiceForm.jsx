import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const InvoiceForm = ({
  form,
  setForm,
  items,
  setItems,
  selectedTemplate,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.customerName?.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "date" && value) {
      updatedValue = formatDate(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0, unit: "Hr" }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) {
      setItems([{ name: "", qty: 1, price: 0, unit: "Hr" }]);
      return;
    }

    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Create Invoice</h2>

      <div style={sectionTitle}>Invoice Details</div>
      <div style={gridStyle}>
        <FormField
          label="Invoice No"
          name="invoiceNo"
          value={form.invoiceNo || ""}
          onChange={handleChange}
          placeholder="Enter invoice number"
        />

        <FormField
          label="Date"
          type="date"
          name="date"
          value={form.date || ""}
          onChange={handleChange}
          error={errors.date}
        />

        <FormField
          label="Customer Name"
          name="customerName"
          value={form.customerName || ""}
          onChange={handleChange}
          placeholder="Enter customer name"
          error={errors.customerName}
        />
      </div>

      {selectedTemplate === "template1" && (
        <>
          <div style={sectionTitle}>Payment Details</div>
          <div style={gridStyle}>
            <FormField
              label="Amount Received"
              name="amountReceived"
              type="number"
              value={form.amountReceived || ""}
              onChange={handleChange}
              placeholder="Enter amount received"
            />

            <FormField
              label="Amount Due"
              name="amountDue"
              type="number"
              value={form.amountDue || ""}
              onChange={handleChange}
              placeholder="Enter amount due"
            />

            <FormField
              label="Payment Method"
              name="paymentMethod"
              value={form.paymentMethod || ""}
              onChange={handleChange}
              placeholder="Cash / UPI / Online / Bank Transfer"
            />

            {/* ✅ NEW GST FIELD */}
            <FormField
              label="GST %"
              name="gstPercent"
              type="number"
              value={form.gstPercent || ""}
              onChange={handleChange}
              placeholder="Leave empty if no GST"
            />
          </div>
        </>
      )}

      {selectedTemplate === "template2" && (
        <>
          <div style={sectionTitle}>Payment Details</div>
          <div style={gridStyle}>
            <FormField
              label="Bank Name"
              name="bankName"
              value={form.bankName || ""}
              onChange={handleChange}
              placeholder="Enter bank name"
            />

            <FormField
              label="Account Name"
              name="accountName"
              value={form.accountName || ""}
              onChange={handleChange}
              placeholder="Enter account holder name"
            />

            <FormField
              label="Account No"
              name="accountNo"
              value={form.accountNo || ""}
              onChange={handleChange}
              placeholder="Enter account number"
            />

            <FormField
              label="IFSC Code"
              name="ifsc"
              value={form.ifsc || ""}
              onChange={handleChange}
              placeholder="Enter IFSC code"
            />

            <FormField
              label="Discount %"
              name="discountPercent"
              type="number"
              value={form.discountPercent || ""}
              onChange={handleChange}
              placeholder="Enter discount percentage"
            />

            {/* ✅ GST ALSO FOR TEMPLATE 2 */}
            <FormField
              label="GST %"
              name="gstPercent"
              type="number"
              value={form.gstPercent || ""}
              onChange={handleChange}
              placeholder="Leave empty if no GST"
            />
          </div>
        </>
      )}

      <div style={sectionTitle}>Items</div>

      <div style={itemsHeader}>
        <span>Item</span>
        <span style={{ textAlign: "center" }}>Qty</span>
        <span style={{ textAlign: "center" }}>Unit</span>
        <span style={{ textAlign: "right" }}>Price</span>
        <span style={{ textAlign: "right" }}>Total</span>
      </div>

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

          <select
            value={item.unit || "Hr"}
            onChange={(e) =>
              handleItemChange(index, "unit", e.target.value)
            }
            style={smallInput}
          >
            <option value="Hr">Hr</option>
            <option value="Min">Min</option>
          </select>

          <input
            type="number"
            min="0"
            value={item.price}
            onChange={(e) =>
              handleItemChange(index, "price", Number(e.target.value))
            }
            style={smallInputRight}
          />

          <div style={totalBox}>
            <span style={totalText}>
              ₹ {((item.qty || 0) * (item.price || 0)).toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              style={iconButton}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        style={{
          ...addButton,
          opacity: items.length >= 5 ? 0.5 : 1,
          cursor: items.length >= 5 ? "not-allowed" : "pointer",
        }}
        disabled={items.length >= 5}
      >
        <FaPlus /> Add Item
      </button>
    </div>
  );
};

export default InvoiceForm;

const FormField = ({
  label,
  error,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div style={fieldWrap}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          borderColor: error ? "#dc2626" : "#d1d5db",
        }}
      />

      {error ? <span style={errorStyle}>{error}</span> : null}
    </div>
  );
};
const containerStyle = {
  background: "#ffffff",
  padding: "28px",
  borderRadius: "14px",
  maxWidth: "950px",
  margin: "20px auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  fontFamily: "'Inter', sans-serif",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "22px",
  color: "#111827",
};

const sectionTitle = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#374151",
  marginBottom: "12px",
  marginTop: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const fieldWrap = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};

const errorStyle = {
  color: "#dc2626",
  fontSize: "12px",
  marginTop: "2px",
};

const smallInput = {
  ...inputStyle,
  textAlign: "center",
};

const smallInputRight = {
  ...inputStyle,
  textAlign: "right",
};

const itemsHeader = {
  display: "grid",
  gridTemplateColumns: "2.2fr 0.8fr 0.9fr 1fr 1fr",
  gap: "12px",
  fontWeight: "700",
  fontSize: "13px",
  color: "#374151",
  marginBottom: "10px",
  padding: "0 4px",
};

const itemRow = {
  display: "grid",
  gridTemplateColumns: "2.2fr 0.8fr 0.9fr 1fr 1fr",
  gap: "12px",
  marginBottom: "12px",
  alignItems: "center",
};

const totalBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  padding: "12px 14px",
  minHeight: "44px",
  boxSizing: "border-box",
};

const totalText = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#111827",
};

const iconButton = {
  background: "transparent",
  border: "none",
  color: "#ef4444",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const addButton = {
  marginTop: "8px",
  background: "#111827",
  color: "#ffffff",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};