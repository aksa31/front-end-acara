import { ICategory } from "@/types/Category";
import { EmptyState, FieldError, Label, ListBox, SearchField, TextField, Autocomplete, useFilter, ComboBox, Input, Skeleton, Select } from "@heroui/react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";

const EventFilter = () => {
    const { control, dataCategory, isSuccessGetCategory, setValue } = useEventFilter();
    const { currentCategory, currentIsOnline, currentIsFeatured, handleChangeCategory, handleChangeIsOnline, handleChangeIsFeatured } = useChangeUrl();

    useEffect(() => {
        if (currentCategory !== "") {
            setValue('category', `${currentCategory}`)
        }
        if (currentIsOnline !== "") {
            setValue('isOnline', `${currentIsOnline}`)
        }
        if (currentIsFeatured !== "") {
            setValue('isFeatured', `${currentIsFeatured}`)
        }
    }, [isSuccessGetCategory])
    return (
        <div className="lg:sticky lg:top-20 h-fit w-full rounded-xl border p-4 lg:w-80">
            <h4 className="text-xl font-semibold">Filter</h4>
            <div className="mt-4 flex flex-col gap-4">
                {!isSuccessGetCategory ? (
                    <>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-16 rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-16 rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-16 rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    </>
                ) : (<>
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
                                        defaultSelectedKey={`${currentCategory}`}
                                        className="focus-visible:border-primary"
                                        value={field.value}
                                        fullWidth
                                        onSelectionChange={(value) => {
                                            onChange(value ?? "")
                                            handleChangeCategory(value !== null ? `${value}` : "");
                                        }}
                                    >
                                        <ComboBox.InputGroup>
                                            <Input placeholder="Search category here..." />
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
                    <Controller
                        name="isOnline"
                        control={control}
                        render={({ field: { onChange, ...field } }) => (
                            <TextField
                                className="w-full"
                                name="isOnline"
                            >
                                <Select
                                    {...field}
                                    placeholder="Select online or offline"
                                    name="isOnline"
                                    defaultSelectedKey={`${currentIsOnline}`}
                                    onChange={(value: any) => {
                                        onChange(value)
                                        handleChangeIsOnline(value !== null ? `${value}` : "");
                                    }}
                                >
                                    <Label>Event Type</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="true" textValue="true">
                                                Online
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="false" textValue="false">
                                                Offline
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </TextField>
                        )}
                    />
                    <Controller
                        name="isFeatured"
                        control={control}
                        render={({ field: { onChange, ...field } }) => (
                            <TextField
                                className="w-full"
                                name="isFeatured"
                            >
                                <Select
                                    {...field}
                                    placeholder="Select one"
                                    name="isFeatured"
                                    defaultSelectedKey={`${currentIsFeatured}`}
                                    onChange={(value: any) => {
                                        onChange(value)
                                        handleChangeIsFeatured(value !== null ? `${value}` : "");
                                    }}
                                >
                                    <Label>Featured</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="true" textValue="true">
                                                Yes
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="false" textValue="false">
                                                No
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </TextField>
                        )}
                    />
                </>
                )}
            </div>
        </div>
    )
};

export default EventFilter;