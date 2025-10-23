import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Immediate update if empty
    if (newValue === '') {
      onChange(newValue);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounce);
  };

  return (
    <Input
      {...props}
      value={localValue}
      onChange={handleChange}
    />
  );
};

export default DebouncedInput;