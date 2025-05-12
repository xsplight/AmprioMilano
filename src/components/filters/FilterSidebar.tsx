
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Mock filter data - would come from Shopify collection data
const mockFilters = [
  {
    id: 'product-type',
    name: 'Product Type',
    options: [
      { value: 'plates', label: 'Plates', count: 24 },
      { value: 'glassware', label: 'Glassware', count: 18 },
      { value: 'cutlery', label: 'Cutlery', count: 12 },
      { value: 'serving', label: 'Serving Pieces', count: 9 }
    ]
  },
  {
    id: 'material',
    name: 'Material',
    options: [
      { value: 'porcelain', label: 'Porcelain', count: 32 },
      { value: 'crystal', label: 'Crystal', count: 16 },
      { value: 'stainless-steel', label: 'Stainless Steel', count: 8 },
      { value: 'bone-china', label: 'Bone China', count: 14 }
    ]
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', count: 20 },
      { value: 'blue', label: 'Blue', count: 15 },
      { value: 'gold', label: 'Gold', count: 12 },
      { value: 'green', label: 'Green', count: 8 },
      { value: 'silver', label: 'Silver', count: 6 }
    ]
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '0-50', label: 'Under AED 50', count: 10 },
      { value: '50-100', label: 'AED 50 - 100', count: 24 },
      { value: '100-200', label: 'AED 100 - 200', count: 18 },
      { value: '200+', label: 'AED 200+', count: 8 }
    ]
  },
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { value: 'in-stock', label: 'In Stock', count: 42 },
      { value: 'out-of-stock', label: 'Out of Stock', count: 8 }
    ]
  }
];

const FilterSidebar = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    mockFilters.reduce((acc, filter) => ({ ...acc, [filter.id]: true }), {})
  );
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[filterId] || [];
      const exists = current.includes(value);
      
      if (exists) {
        // Remove the value
        return {
          ...prev,
          [filterId]: current.filter(v => v !== value)
        };
      } else {
        // Add the value
        return {
          ...prev,
          [filterId]: [...current, value]
        };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  // Count selected filters
  const totalSelectedFilters = Object.values(selectedFilters)
    .reduce((sum, values) => sum + values.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-serif">Filter</h2>
        {totalSelectedFilters > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-xs text-brand-green hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      
      {mockFilters.map((filter) => (
        <div key={filter.id} className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection(filter.id)}
            className="flex justify-between items-center w-full py-2 text-left"
          >
            <span className="font-medium">{filter.name}</span>
            <ChevronDown
              size={16}
              className={`transform transition-transform ${openSections[filter.id] ? 'rotate-180' : ''}`}
            />
          </button>
          
          {openSections[filter.id] && (
            <div className="mt-2 space-y-2">
              {filter.options.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    checked={selectedFilters[filter.id]?.includes(option.value) || false}
                    onChange={() => handleFilterChange(filter.id, option.value)}
                  />
                  <span className="text-sm flex-1">{option.label}</span>
                  <span className="text-xs text-gray-500">({option.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
