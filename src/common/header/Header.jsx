import React from "react";

export default function Header({ title, loading }) {
  if (loading) return <>Loading...</>;
  return (
    <div className="bg-white shadow p-4 text-center font-semibold text-gray-800">
      {title ? title : "tidak ada"}
    </div>
  );
}
