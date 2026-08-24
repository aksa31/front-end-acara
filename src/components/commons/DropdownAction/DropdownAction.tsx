import { Dropdown } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
    onPressButtonDetail: () => void;
    onPressButtonDelete?: () => void;
    hideButtonDelete?: boolean;
}

const DropdownAction = ({ onPressButtonDetail, onPressButtonDelete, hideButtonDelete = false }: PropTypes) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div className="cursor-pointer p-1">
                    <CiMenuKebab className="text-default-700" />
                </div>
            </Dropdown.Trigger>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Item onPress={onPressButtonDetail} >
                        Detail
                    </Dropdown.Item>
                    {!hideButtonDelete ?
                        <Dropdown.Item className="text-danger" onPress={onPressButtonDelete}>
                            Delete
                        </Dropdown.Item>
                        : null}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default DropdownAction;