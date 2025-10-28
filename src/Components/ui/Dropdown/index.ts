import DropDownTrigger from './Trigger';
import DropdownWrapper from './Dropdown';
import DropdownContent from './Content';
import DropdownItem from './Item';

const Dropdown = Object.assign(DropdownWrapper, {
  Content: DropdownContent,
  Item: DropdownItem,
  Trigger: DropDownTrigger,
});

export default Dropdown;
