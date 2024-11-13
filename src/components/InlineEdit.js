// src/components/InlineEdit.js

import React, { useState } from 'react';

const InlineEdit = ({ value, onSave, type = 'text' }) => {
  const [editingValue, setEditingValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editingValue);
    setIsEditing(false);
  };

  return (
    <div className="inline-edit">
      {isEditing ? (
        <input
          type={type}
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{value}</span>
      )}
    </div>
  );
};

export default InlineEdit;