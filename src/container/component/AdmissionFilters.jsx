import React from 'react';
import Select from 'react-select';

const AdmissionFilters = ({ filters, onFilterChange, onSearch, evaluationMethods, majors, examGroups, years }) => {
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: '42px',
      borderRadius: '0.375rem',
      borderColor: '#E5E7EB',
      '&:hover': {
        borderColor: '#CBD5E1'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#BFDBFE' : 'white',
      color: state.isSelected ? 'white' : '#1F2937',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3B82F6' : '#BFDBFE'
      }
    })
  };

  const handleSelectChange = (value, name) => {
    onFilterChange({
      target: {
        name,
        value: value?.value || ''
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phương thức xét tuyển
          </label>
          <Select
            styles={customSelectStyles}
            isClearable
            placeholder="Chọn phương thức"
            options={evaluationMethods?.map(method => ({
              value: method.id,
              label: method.name
            }))}
            value={filters.evaluation_method ? {
              value: filters.evaluation_method,
              label: evaluationMethods?.find(m => m.id === filters.evaluation_method)?.name
            } : null}
            onChange={(value) => handleSelectChange(value, 'evaluation_method')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngành học
          </label>
          <Select
            styles={customSelectStyles}
            isClearable
            placeholder="Chọn ngành"
            options={majors?.map(major => ({
              value: major.id,
              label: major.name
            }))}
            value={filters.major ? {
              value: filters.major,
              label: majors?.find(m => m.id === filters.major)?.name
            } : null}
            onChange={(value) => handleSelectChange(value, 'major')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Khối thi
          </label>
          <Select
            styles={customSelectStyles}
            isClearable
            placeholder="Chọn khối thi"
            options={examGroups?.map(group => ({
              value: group.id,
              label: `${group.name} (${group.code})`
            }))}
            value={filters.college_exam_group ? {
              value: filters.college_exam_group,
              label: examGroups?.find(g => g.id === filters.college_exam_group)?.name + ' (' + examGroups?.find(g => g.id === filters.college_exam_group)?.code + ')'
            } : null}
            onChange={(value) => handleSelectChange(value, 'college_exam_group')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm
          </label>
          <Select
            styles={customSelectStyles}
            isClearable
            placeholder="Chọn năm"
            options={years?.map(year => ({
              value: year,
              label: year.toString()
            }))}
            value={filters.year ? {
              value: filters.year,
              label: filters.year.toString()
            } : null}
            onChange={(value) => handleSelectChange(value, 'year')}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default AdmissionFilters; 