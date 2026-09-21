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
        className="flex-1 border border-border rounded px-3 py-2 text-sm bg-muted text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
      />

      <button
        type="button"
        onClick={handleApply}
        className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary-hover"
      >
        Apply
      </button>
    </div>
  );
}

export default CouponInput;