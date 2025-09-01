import React from 'react';
import Select from './Select';

const ExpirationPicker = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const expirationOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '1d', label: '1 Day' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: 'permanent', label: 'Permanent' },
  ];

  return (
    <Select
      label="Expiration"
      options={expirationOptions}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
};

export default ExpirationPicker;
