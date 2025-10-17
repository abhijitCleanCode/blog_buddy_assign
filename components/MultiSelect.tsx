import Select, { MultiValue, StylesConfig } from 'react-select';

type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: OptionType[];
  selectedOptions: OptionType[];
  setSelectedOptions: (options: MultiValue<OptionType>) => void;
  disabled?: boolean;
  infiniteScroll?: boolean;
  setPageOption?: React.Dispatch<React.SetStateAction<number>>;
  setSearchQueryOption?: (query: string) => void;
  totalPageOptions?: number;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label = 'Change Label',
  placeholder,
  options,
  selectedOptions,
  setSelectedOptions,
  disabled = false,
  infiniteScroll = false,
  setPageOption,
  setSearchQueryOption,
  totalPageOptions = 1,
}) => {
  const loadMoreOptions = () => {
    if (options && setPageOption) {
      setPageOption((prevPage) =>
        prevPage >= totalPageOptions ? prevPage : prevPage + 1
      );
    }
  };

  const loadPrevOptions = () => {
    if (options && setPageOption) {
      setPageOption((prevPage) => (prevPage <= 1 ? prevPage : prevPage - 1));
    }
  };

  const handleSearchChange = (newValue: string) => {
    if (setPageOption && setSearchQueryOption) {
      setPageOption(1);
      setSearchQueryOption(newValue);
    }
  };

  const isCloseMenu = selectedOptions?.length + 1 === options?.length;

  const customStylesSelect: StylesConfig<OptionType, true> = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '12px',
      boxShadow: 'inset 3px 3px 5px rgba(0, 0, 0, 0.15)',
      backgroundColor: disabled
        ? 'rgb(156 163 175 / 0.7)'
        : 'rgb(209 213 219 / 0.5)',
      padding: '6px 3px',
      '&:hover': {
        border: '1px solid #aaa',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: disabled ? 'rgb(156 163 175 / 0.7)' : 'white',
      padding: '1px 5px',
    }),
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="nameList" className="text-gray-500 text-sm">
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={isCloseMenu}
        name="nameList"
        options={options}
        styles={customStylesSelect}
        value={selectedOptions}
        onChange={setSelectedOptions}
        placeholder={placeholder}
        isDisabled={disabled}
        onMenuScrollToBottom={infiniteScroll ? loadMoreOptions : undefined}
        onMenuScrollToTop={infiniteScroll ? loadPrevOptions : undefined}
        onInputChange={infiniteScroll ? handleSearchChange : undefined}
      />
    </div>
  );
};

export default MultiSelect;
