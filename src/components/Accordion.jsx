import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const Accordion = ({
  children,
  type = 'single', // 'single' or 'multiple'
  className
}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (value) => {
    if (type === 'single') {
      setOpenItems(openItems.has(value) ? new Set() : new Set([value]));
    } else {
      const newItems = new Set(openItems);
      if (newItems.has(value)) {
        newItems.delete(value);
      } else {
        newItems.add(value);
      }
      setOpenItems(newItems);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen: openItems.has(child.props.value),
          onToggle: () => toggleItem(child.props.value)
        })
      )}
    </div>
  );
};

const AccordionItem = ({
  value,
  title,
  children,
  isOpen = false,
  onToggle,
  className
}) => {
  return (
    <div className={cn('border border-zinc-800 rounded-xl overflow-hidden', className)}>
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-900/40 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
      >
        <span className="font-medium text-zinc-300">{title}</span>
        {isOpen ? (
          <ChevronDown size={16} className="text-zinc-500 transition-transform" />
        ) : (
          <ChevronRight size={16} className="text-zinc-500 transition-transform" />
        )}
      </button>
      {isOpen && (
        <div id={`accordion-content-${value}`} className="p-4 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;
