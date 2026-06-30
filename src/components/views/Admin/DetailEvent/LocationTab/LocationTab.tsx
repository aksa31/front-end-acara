import { IEventForm, IRegency } from "@/types/Event";
import { ICategory } from "@/types/Category";
import { Button, Card, Input, Select, Skeleton, Label, TextField, FieldError, TextArea, Spinner, Autocomplete, SearchField, ListBox, useFilter, EmptyState, DatePicker, DateField, Calendar, TimeField } from "@heroui/react"
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import useLocationTab from "./useLocationTab";
import { now, getLocalTimeZone } from "@internationalized/date";
import { DateValue, TimeValue } from "@heroui/react";
import { toInputDate } from "@/utils/date";

interface PropTypes {
    dataLocation?: IEventForm;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
    dataDefaultRegion: string;
    isPendingDefaultRegion: boolean;

}

const LocationTab = ({ dataLocation, onUpdate, isPendingUpdate, isSuccessUpdate, dataDefaultRegion, isPendingDefaultRegion }: PropTypes) => {
    const {
        controlUpdateLocation,
        errorsUpdateLocation,
        handleSubmitUpdateLocation,
        resetUpdateLocation,
        setValueUpdateLocation,

        dataRegion,
        handleSearchRegion,
        searchRegency,
        regionInput,
    } = useLocationTab();

    useEffect(() => {
        if (dataLocation) {
            console.log('LocationTab useEffect triggered', dataLocation)
            console.log('data location', dataLocation)
            console.log('data default region', dataDefaultRegion)
            setValueUpdateLocation('isOnline', `${dataLocation?.isOnline}`)
            if (dataLocation?.location?.coordinates?.length) {
                setValueUpdateLocation('latitude', Number(dataLocation.location.coordinates[0]))
                setValueUpdateLocation('longitude', Number(dataLocation.location.coordinates[1]))
            }
            setValueUpdateLocation('region', `${dataLocation?.location?.region}`)
        }
    }, [dataLocation, dataRegion])


    const { contains } = useFilter({ sensitivity: "base" });

    const [timeValue, setTimeValue] = useState<TimeValue | null>(now(getLocalTimeZone()));

    return (
        <Card className="w-full p-4 lg:w-1/2 border">
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Event Location Information</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage location of this event</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateLocation(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        {dataLocation?.name ? (
                            <div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="isOnline"
                                        control={controlUpdateLocation}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isOnline"
                                                isInvalid={errorsUpdateLocation.isOnline !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isOnline"
                                                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
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
                                                <FieldError>{errorsUpdateLocation.isOnline?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="latitude"
                                        control={controlUpdateLocation}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errorsUpdateLocation.latitude !== undefined}
                                            >
                                                <Label>Latitude</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input latitude Event"
                                                    type="text"
                                                />
                                                <FieldError>{errorsUpdateLocation.latitude?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="longitude"
                                        control={controlUpdateLocation}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errorsUpdateLocation.longitude !== undefined}
                                            >
                                                <Label>Longitude</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input longitude Event"
                                                    type="text"
                                                />
                                                <FieldError>{errorsUpdateLocation.longitude?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <p className="text-sm font-bold">Location</p>
                                <div className="mb-4 flex flex-col gap-4">
                                    <div className="mt-2 flex flex-col gap-1">
                                        <Controller
                                            name="region"
                                            control={controlUpdateLocation}
                                            render={({ field: { onChange, ...field } }) => (
                                                <div className="flex flex-col gap-1">
                                                    <TextField
                                                        className="w-full"
                                                        name="region"
                                                        isInvalid={errorsUpdateLocation.region !== undefined}
                                                    >
                                                        <Label>City</Label>
                                                        <Autocomplete
                                                            {...field}
                                                            value={field.value}
                                                            onChange={(val) => onChange(val ?? "")}
                                                            fullWidth
                                                            placeholder="Search city"
                                                            allowsEmptyCollection
                                                            isInvalid={errorsUpdateLocation.region !== undefined}
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
                                                                                <ListBox.Item key={region.id} id={region.id} textValue={region.name}>
                                                                                    {region.name}
                                                                                    <ListBox.ItemIndicator />
                                                                                </ListBox.Item>
                                                                            ))
                                                                            : dataDefaultRegion ? (
                                                                                // ← tampilkan default region saat belum search
                                                                                <ListBox.Item key={dataLocation?.location?.region} id={`${dataLocation?.location?.region}`} textValue={dataDefaultRegion}>
                                                                                    {dataDefaultRegion}
                                                                                    <ListBox.ItemIndicator />
                                                                                </ListBox.Item>
                                                                            ) : []}
                                                                    </ListBox>
                                                                </Autocomplete.Filter>
                                                            </Autocomplete.Popover>
                                                        </Autocomplete>
                                                        <FieldError>{errorsUpdateLocation.region?.message}</FieldError>
                                                    </TextField>
                                                </div>
                                            )}
                                        />
                                    </div>
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
                        isDisabled={isPendingUpdate || !dataLocation?._id}
                    >
                        {isPendingUpdate ? <Spinner size="sm" color="accent" /> : "Save Changes"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default LocationTab;