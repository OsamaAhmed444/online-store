import React, { useState } from "react";

function CouponInput(props) {
  const onApply = props.onApply;
  const [code, setCode] = useState("");

  function handleApply() {
    if (code.trim() === "") {
      return;
    }
    onApply(code.trim());
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter coupon code"
        className="flex-1 border rounded px-3 py-2 text-sm"
      />

      <button
        type="button"
        onClick={handleApply}
        className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
      >
        Apply
      </button>
    </div>
  );
}

export default CouponInput;