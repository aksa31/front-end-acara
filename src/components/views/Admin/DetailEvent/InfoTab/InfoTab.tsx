import { IEventForm } from "@/types/Event";
import { ICategory } from "@/types/Category";
import { Button, Card, Input, Select, Skeleton, Label, TextField, FieldError, TextArea, Spinner, Autocomplete, SearchField, ListBox, useFilter, EmptyState, DatePicker, DateField, Calendar, TimeField } from "@heroui/react"
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import useInfoTab from "./useInfoTab";
import { now, getLocalTimeZone } from "@internationalized/date";
import { DateValue, TimeValue } from "@heroui/react";
import { toInputDate } from "@/utils/date";

interface PropTypes {
    dataEvent?: IEventForm;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = ({ dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,

        dataCategory,
    } = useInfoTab();

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateInfo('name', `${dataEvent?.name}`)
            setValueUpdateInfo('description', `${dataEvent?.description}`)
            setValueUpdateInfo('slug', `${dataEvent?.slug}`)
            setValueUpdateInfo('category', `${dataEvent?.category}`)
            const startDate = toInputDate(`${dataEvent?.startDate}`);
        const endDate = toInputDate(`${dataEvent?.endDate}`);
        
        if (startDate) setValueUpdateInfo('startDate', startDate); 
        if (endDate) setValueUpdateInfo('endDate', endDate); 
            setValueUpdateInfo('isPublished', `${dataEvent?.isPublished}`)
            setValueUpdateInfo('isFeatured', `${dataEvent?.isFeatured}`)
        }
    }, [dataEvent, dataCategory])

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate])


    const { contains } = useFilter({ sensitivity: "base" });

    const [timeValue, setTimeValue] = useState<TimeValue | null>(now(getLocalTimeZone()));

    return (
        <Card className="w-full p-4 lg:w-1/2 border">
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Event Information</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage information of this event</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        {dataEvent?.name ? (
                            <div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="name"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errorsUpdateInfo.name !== undefined}
                                            >
                                                <Label>Name</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input Name Event"
                                                    type="text"
                                                />
                                                <FieldError>{errorsUpdateInfo.name?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="slug"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="slug"
                                                isInvalid={errorsUpdateInfo.slug !== undefined}
                                            >
                                                <Label>Slug</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input Slug Event"
                                                    type="text"
                                                />
                                                <FieldError>{errorsUpdateInfo.slug?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="category"
                                        control={controlUpdateInfo}
                                        render={({ field: { onChange, value, onBlur, ...field } }) => (
                                            <div className="flex flex-col gap-1">
                                                <TextField
                                                    className="w-full"
                                                    isInvalid={errorsUpdateInfo.category !== undefined}
                                                >
                                                    <Label>Category</Label>
                                                    <Autocomplete
                                                        value={value ?? null}
                                                        onBlur={onBlur}
                                                        isInvalid={errorsUpdateInfo.category !== undefined}
                                                        fullWidth
                                                        onChange={(val) => onChange(val ?? "")}
                                                        placeholder="Search category Event"
                                                        className="focus-visible:border-primary"
                                                    >
                                                        <Autocomplete.Trigger>
                                                            <Autocomplete.Value />
                                                            {/* <Autocomplete.ClearButton /> */}
                                                            <Autocomplete.Indicator />
                                                        </Autocomplete.Trigger>
                                                        <Autocomplete.Popover>
                                                            <Autocomplete.Filter filter={contains}>
                                                                <SearchField autoFocus name="search" variant="secondary">
                                                                    <SearchField.Group>
                                                                        <SearchField.SearchIcon />
                                                                        <SearchField.Input placeholder="Search states..." />
                                                                        <SearchField.ClearButton />
                                                                    </SearchField.Group>
                                                                </SearchField>
                                                                <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                                                                    {(dataCategory ?? []).map((category: ICategory) => (
                                                                        <ListBox.Item key={category._id} id={category._id} textValue={category.name}>
                                                                            {category.name}
                                                                            <ListBox.ItemIndicator />
                                                                        </ListBox.Item>
                                                                    ))}
                                                                </ListBox>
                                                            </Autocomplete.Filter>
                                                        </Autocomplete.Popover>
                                                    </Autocomplete>
                                                    <FieldError>{errorsUpdateInfo.category?.message}</FieldError>
                                                </TextField>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="startDate"
                                        control={controlUpdateInfo}
                                        render={({ field }) => {
                                            return (

                                                <TextField
                                                    className="w-full"
                                                    name="startDate"
                                                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                                                >
                                                    <DatePicker
                                                        {...field}
                                                        className="w-full"
                                                        name="startDate"
                                                        hideTimeZone
                                                        onChange={(val) => {
                                                            field.onChange(val ?? "");
                                                        }}
                                                        isInvalid={errorsUpdateInfo.startDate !== undefined}
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
                                                    <FieldError>{errorsUpdateInfo.startDate?.message}</FieldError>
                                                </TextField>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="endDate"
                                        control={controlUpdateInfo}
                                        render={({ field }) => {
                                            return (

                                                <TextField
                                                    className="w-full"
                                                    name="endDate"
                                                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                                                >
                                                    <DatePicker
                                                        {...field}
                                                        className="w-full"
                                                        name="endDate"
                                                        hideTimeZone
                                                        onChange={(val) => {
                                                            field.onChange(val ?? "");
                                                        }}
                                                        isInvalid={errorsUpdateInfo.endDate !== undefined}
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
                                                    <FieldError>{errorsUpdateInfo.endDate?.message}</FieldError>
                                                </TextField>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="isPublished"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isPublished"
                                                isInvalid={errorsUpdateInfo.isPublished !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isPublished"
                                                    isInvalid={errorsUpdateInfo.isPublished !== undefined}
                                                    value={field.value}
                                                    onChange={field.onChange}
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
                                                <FieldError>{errorsUpdateInfo.isPublished?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="isFeatured"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isFeatured"
                                                isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isFeatured"
                                                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                                                    value={field.value}
    onChange={field.onChange}
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
                                                <FieldError>{errorsUpdateInfo.isFeatured?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="description"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full mb-2"
                                                name="description"
                                                isInvalid={errorsUpdateInfo.description !== undefined}
                                            >
                                                <Label>Description</Label>
                                                <TextArea
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Description"
                                                />
                                                <FieldError>{errorsUpdateInfo.description?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                            </div>
                        ) :
                            <div className="flex flex-col gap-3">
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

                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-24 rounded-md" />
                                    <Skeleton className="h-20 w-full rounded-md" />
                                </div>
                            </div>
                        }
                    </div>
                    <Button
                        variant="danger"
                        className="mt-2 disabled:bg-default-500 w-full"
                        type="submit"
                        isDisabled={isPendingUpdate || !dataEvent?._id}
                    >
                        {isPendingUpdate ? <Spinner size="sm" color="accent" /> : "Save Changes"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default InfoTab;