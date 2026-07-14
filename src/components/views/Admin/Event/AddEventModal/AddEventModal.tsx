import { Button, Label, Modal, TextField, Input, FieldError, TextArea, Spinner, Autocomplete, SearchField, ListBox, EmptyState, useFilter, Calendar, DateField, DatePicker, Select, TimeField, } from "@heroui/react";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { Key, useEffect, useState } from "react";
import { ICategory } from "@/types/Category";
import { IEvent, IRegency } from "@/types/Event";
import { now, getLocalTimeZone } from "@internationalized/date";
import { DateValue, TimeValue } from "@heroui/react";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchEvents: () => void;
}

const AddEventModal = ({ isOpen, onOpenChange, refetchEvents }: PropTypes) => {
    const {
        control,
        errors,
        isPendingAddEvent,
        isPendingUploadFile,
        preview,
        isSuccessAddEvent,
        handleUploadBanner,
        handleAddEvent,
        handleSubmitForm,
        handleDeleteBanner,
        isPendingDeleteFile,
        handleOnClose,

        handleSearchRegion,
        searchRegency,
        dataRegion,
        regionInput,

        dataCategory
    } = useAddEventModal(() => onOpenChange(false));

    const disabledSubmit =
        isPendingAddEvent ||
        isPendingUploadFile ||
        isPendingDeleteFile

    useEffect(() => {
        if (isSuccessAddEvent) {
            refetchEvents();
        }
    }, [isSuccessAddEvent])

    const { contains } = useFilter({ sensitivity: "base" });

    const [timeValue, setTimeValue] = useState<TimeValue | null>(now(getLocalTimeZone()));

    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger onPress={() => handleOnClose()} />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Add Event</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <form id="add-event-form" onSubmit={handleSubmitForm(handleAddEvent)}>
                                <div className="flex flex-col gap-4 m-2">
                                    <p className="text-sm font-bold text-black">Information</p>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errors.name !== undefined}
                                            >
                                                <Label>Name</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Name Event"
                                                    type="text"
                                                />
                                                <FieldError>{errors.name?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="slug"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="slug"
                                                isInvalid={errors.slug !== undefined}
                                            >
                                                <Label>Slug</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Slug Event"
                                                    type="text"
                                                />
                                                <FieldError>{errors.slug?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field: { onChange, ...field } }) => (
                                            <div className="flex flex-col gap-1">
                                                <TextField
                                                    className="w-full"
                                                    name="slug"
                                                    isInvalid={errors.category !== undefined}
                                                >
                                                    <Label>Category</Label>
                                                    <Autocomplete
                                                        {...field}
                                                        className="focus-visible:border-primary"
                                                        placeholder="Search category Event"
                                                        value={field.value}
                                                        // onChange={field.onChange}
                                                        isInvalid={errors.category !== undefined}
                                                        fullWidth
                                                        onChange={(value) => onChange(value ?? "")}
                                                    >
                                                        <Autocomplete.Trigger>
                                                            <Autocomplete.Value />
                                                            {/* <Autocomplete.ClearButton /> */}
                                                            <Autocomplete.Indicator />
                                                        </Autocomplete.Trigger>
                                                        <Autocomplete.Popover>
                                                            <Autocomplete.Filter filter={contains}>
                                                                <SearchField name="search" variant="secondary">
                                                                    <SearchField.Group>
                                                                        <SearchField.SearchIcon />
                                                                        <SearchField.Input placeholder="Search states..." />
                                                                        <SearchField.ClearButton />
                                                                    </SearchField.Group>
                                                                </SearchField>
                                                                <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                                                                    {dataCategory.map((category: ICategory) => (
                                                                        <ListBox.Item key={category._id} id={category._id} textValue={category.name}>
                                                                            {category.name}
                                                                            <ListBox.ItemIndicator />
                                                                        </ListBox.Item>
                                                                    ))}
                                                                </ListBox>
                                                            </Autocomplete.Filter>
                                                        </Autocomplete.Popover>
                                                    </Autocomplete>
                                                    <FieldError>{errors.category?.message}</FieldError>
                                                </TextField>
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                
                                            <TextField
                                                className="w-full"
                                                name="startDate"
                                                isInvalid={errors.startDate !== undefined}
                                            >
                                                <DatePicker
                                                    {...field}
                                                    className="w-full"
                                                    name="startDate"
                                                    hideTimeZone
                                                        onChange={(val) => {
                                                            field.onChange(val ?? "");
                                                        }}
                                                    isInvalid={errors.startDate !== undefined}
                                                >
                                                    <Label>Start Date</Label>
                                                    <DateField.Group fullWidth>
                                                        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                                        <DateField.Suffix>
                                                            <DatePicker.Trigger>
                                                                <DatePicker.TriggerIndicator />
                                                            </DatePicker.Trigger>
                                                        </DateField.Suffix>
                                                    </DateField.Group>
                                                    <DatePicker.Popover>
                                                        <Calendar aria-label="Event start date">
                                                            <Calendar.Header>
                                                                <Calendar.YearPickerTrigger>
                                                                    <Calendar.YearPickerTriggerHeading />
                                                                    <Calendar.YearPickerTriggerIndicator />
                                                                </Calendar.YearPickerTrigger>
                                                                <Calendar.NavButton slot="previous" />
                                                                <Calendar.NavButton slot="next" />
                                                            </Calendar.Header>
                                                            <Calendar.Grid>
                                                                <Calendar.GridHeader>
                                                                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                                </Calendar.GridHeader>
                                                                <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                                            </Calendar.Grid>
                                                            <Calendar.YearPickerGrid>
                                                                <Calendar.YearPickerGridBody>
                                                                    {({ year }) => <Calendar.YearPickerCell year={year} />}
                                                                </Calendar.YearPickerGridBody>
                                                            </Calendar.YearPickerGrid>
                                                        </Calendar>
                                                        <div className="flex items-center justify-between">
                                                            <Label>Time</Label>
                                                            <TimeField
                                                                aria-label="Time"
                                                                granularity="minute"
                                                                hideTimeZone
                                                                hourCycle={12}
                                                                name="time"
                                                                value={timeValue}
                                                                onChange={(v) => {
                                                                    setTimeValue(v as TimeValue);
                                                                    if (field.value && "set" in field.value) {
                                                                        const combined = field.value.set({
                                                                            hour: v?.hour ?? 0,
                                                                            minute: v?.minute ?? 0,
                                                                            second: 0,
                                                                        });
                                                                        field.onChange(combined ?? "");
                                                                    }
                                                                }}
                                                            >
                                                                <TimeField.Group variant="secondary">
                                                                    <TimeField.Input>
                                                                        {(segment) => <TimeField.Segment segment={segment} />}
                                                                    </TimeField.Input>
                                                                </TimeField.Group>
                                                            </TimeField>
                                                        </div>
                                                    </DatePicker.Popover>
                                                </DatePicker>
                                                <FieldError>{errors.startDate?.message}</FieldError>
                                            </TextField>
                                            )
                                        }}
                                    />
                                    <Controller
                                        name="endDate"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                
                                            <TextField
                                                className="w-full"
                                                name="endDate"
                                                isInvalid={errors.endDate !== undefined}
                                            >
                                                <DatePicker
                                                    {...field}
                                                    className="w-full"
                                                    name="endDate"
                                                    hideTimeZone
                                                        onChange={(val) => {
                                                            field.onChange(val ?? "");
                                                        }}
                                                    isInvalid={errors.endDate !== undefined}
                                                >
                                                    <Label>End Date</Label>
                                                    <DateField.Group fullWidth>
                                                        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                                        <DateField.Suffix>
                                                            <DatePicker.Trigger>
                                                                <DatePicker.TriggerIndicator />
                                                            </DatePicker.Trigger>
                                                        </DateField.Suffix>
                                                    </DateField.Group>
                                                    <DatePicker.Popover>
                                                        <Calendar aria-label="Event end date">
                                                            <Calendar.Header>
                                                                <Calendar.YearPickerTrigger>
                                                                    <Calendar.YearPickerTriggerHeading />
                                                                    <Calendar.YearPickerTriggerIndicator />
                                                                </Calendar.YearPickerTrigger>
                                                                <Calendar.NavButton slot="previous" />
                                                                <Calendar.NavButton slot="next" />
                                                            </Calendar.Header>
                                                            <Calendar.Grid>
                                                                <Calendar.GridHeader>
                                                                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                                </Calendar.GridHeader>
                                                                <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                                            </Calendar.Grid>
                                                            <Calendar.YearPickerGrid>
                                                                <Calendar.YearPickerGridBody>
                                                                    {({ year }) => <Calendar.YearPickerCell year={year} />}
                                                                </Calendar.YearPickerGridBody>
                                                            </Calendar.YearPickerGrid>
                                                        </Calendar>
                                                        <div className="flex items-center justify-between">
                                                            <Label>Time</Label>
                                                            <TimeField
                                                                aria-label="Time"
                                                                granularity="minute"
                                                                hideTimeZone
                                                                hourCycle={12}
                                                                name="time"
                                                                value={timeValue}
                                                                onChange={(v) => {
                                                                    setTimeValue(v as TimeValue);
                                                                    if (field.value && "set" in field.value) {
                                                                        const combined = field.value.set({
                                                                            hour: v?.hour ?? 0,
                                                                            minute: v?.minute ?? 0,
                                                                            second: 0,
                                                                        });
                                                                        field.onChange(combined ?? "");
                                                                    }
                                                                }}
                                                            >
                                                                <TimeField.Group variant="secondary">
                                                                    <TimeField.Input>
                                                                        {(segment) => <TimeField.Segment segment={segment} />}
                                                                    </TimeField.Input>
                                                                </TimeField.Group>
                                                            </TimeField>
                                                        </div>
                                                    </DatePicker.Popover>
                                                </DatePicker>
                                                <FieldError>{errors.endDate?.message}</FieldError>
                                            </TextField>
                                            )
                                        }}
                                    />
                                   
                                    <Controller
                                        name="isPublished"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isPublished"
                                                isInvalid={errors.isPublished !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isPublished"
                                                    isInvalid={errors.isPublished !== undefined}
                                                >
                                                    <Label>Status</Label>
                                                    <Select.Trigger>
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="true" textValue="true">
                                                                Publish
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="false" textValue="false">
                                                                Draft
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>
                                                <FieldError>{errors.isPublished?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="isFeatured"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isFeatured"
                                                isInvalid={errors.isFeatured !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isFeatured"
                                                    isInvalid={errors.isFeatured !== undefined}
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
                                                <FieldError>{errors.isFeatured?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="isOnline"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isOnline"
                                                isInvalid={errors.isOnline !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isOnline"
                                                    isInvalid={errors.isOnline !== undefined}
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
                                                <FieldError>{errors.isOnline?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="description"
                                                isInvalid={errors.description !== undefined}
                                            >
                                                <Label>Description</Label>
                                                <TextArea
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Description"
                                                />
                                                <FieldError>{errors.description?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />

                                    <p className="text-sm font-bold">Location</p>
                                    <div className="mb-4 flex flex-col gap-4">

                                    <Controller
                                        name="region"
                                        control={control}
                                        render={({ field: { onChange, ...field } }) => (
                                            <div className="flex flex-col gap-1">
                                                <TextField
                                                    className="w-full"
                                                    name="region"
                                                    isInvalid={errors.region !== undefined}
                                                    >
                                                    <Label>City</Label>
                                                    <Autocomplete
                                                        {...field}
                                                        value={field.value}
                                                        onChange={(val) => onChange(val ?? "")}
                                                        fullWidth
                                                        placeholder="Search city"
                                                        allowsEmptyCollection
                                                        isInvalid={errors.region !== undefined}
                                                    >
                                                        <Autocomplete.Trigger>
                                                            <Autocomplete.Value />
                                                            {/* <Autocomplete.ClearButton /> */}
                                                            <Autocomplete.Indicator />
                                                        </Autocomplete.Trigger>
                                                        <Autocomplete.Popover>
                                                            <Autocomplete.Filter
                                                                filter={contains}
                                                                inputValue={regionInput}
                                                                onInputChange={(search) => {
                                                                    handleSearchRegion(search);
                                                                }}
                                                            >
                                                                <SearchField name="search" variant="secondary">
                                                                    <SearchField.Group>
                                                                        <SearchField.SearchIcon />
                                                                        <SearchField.Input placeholder="Search..." />
                                                                    </SearchField.Group>
                                                                </SearchField>
                                                                <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                                                                    {dataRegion && searchRegency !== "" ? 
                                                                        dataRegion?.map((region: IRegency) => (
                                                                            <ListBox.Item
                                                                                key={region.id}
                                                                                id={region.id}
                                                                                textValue={region.name}
                                                                            >
                                                                                {region.name}
                                                                                <ListBox.ItemIndicator />
                                                                            </ListBox.Item>
                                                                        ))
                                                                     :[]}
                                                                </ListBox>
                                                            </Autocomplete.Filter>
                                                        </Autocomplete.Popover>
                                                    </Autocomplete>
                                                    <FieldError>{errors.region?.message}</FieldError>
                                                </TextField>
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="address"
                                                isInvalid={errors.address !== undefined}
                                            >
                                                <Label>Address</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Name Address"
                                                    type="text"
                                                />
                                                <FieldError>{errors.address?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="latitude"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="latitude"
                                                isInvalid={errors.latitude !== undefined}
                                            >
                                                <Label>Latitude</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Name Event"
                                                    type="text"
                                                />
                                                <FieldError>{errors.latitude?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="longitude"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="longitude"
                                                isInvalid={errors.longitude !== undefined}
                                            >
                                                <Label>Longitude</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Name Event"
                                                    type="text"
                                                />
                                                <FieldError>{errors.longitude?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    </div>

                                    <p className="text-sm font-bold">Cover</p>
                                    <Controller
                                        name="banner"
                                        control={control}
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <InputFile
                                                isDropable
                                                {...field}
                                                onDelete={() => handleDeleteBanner(onChange)}
                                                onUpload={(files) => handleUploadBanner(files, onChange)}
                                                isUploading={isPendingUploadFile}
                                                isDeleting={isPendingDeleteFile}
                                                isInvalid={errors.banner !== undefined}
                                                errorMessage={errors.banner?.message}
                                                preview={typeof preview === 'string' ? preview : ""}

                                            />
                                        )}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={() => handleOnClose()}
                                isDisabled={disabledSubmit}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="add-event-form"
                                isDisabled={disabledSubmit}
                                className="font-semibold"
                            >
                                {isPendingAddEvent ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Create Event"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default AddEventModal;