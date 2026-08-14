import { ICategory } from "@/types/Category";
import { EmptyState, FieldError, Label, ListBox, SearchField, TextField, Autocomplete, useFilter, ComboBox, Input } from "@heroui/react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import useChangeUrl from "@/hooks/useChangeUrl";

const EventFilter = () => {
    const { control, dataCategory } = useEventFilter();
    const { handleChangeCategory } = useChangeUrl();
    return (
        <div className="lg:sticky lg:top-20 h-fit w-full rounded-xl border p-4 lg:w-80">
            <h4 className="text-xl font-semibold">Filter</h4>
            <div className="mt-4 flex flex-col gap-4">
                <Controller
                    name="category"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                        <div className="flex flex-col gap-1">
                            <TextField
                                className="w-full"
                                name="slug"
                            >
                                <Label>Category</Label>
                                <ComboBox
                                    {...field}
                                    className="focus-visible:border-primary"
                                    value={field.value}
                                    fullWidth
                                    onSelectionChange={(value) => {
                                        onChange(value ?? "")
                                        handleChangeCategory(value !== null ? `${value}` : "");
                                    }}
                                >
                                    <ComboBox.InputGroup>
                                        <Input placeholder="Search categories..." />
                                        <ComboBox.Trigger />
                                    </ComboBox.InputGroup>
                                    <ComboBox.Popover>
                                        <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                                                {dataCategory?.map((category: ICategory) => (
                                                    <ListBox.Item key={category._id} id={category._id} textValue={category.name}>
                                                        {category.name}
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                    </ComboBox.Popover>
                                   
                                </ComboBox>
                            </TextField>
                        </div>
                    )}
                />
            </div>
        </div>
    )
};

export default EventFilter;