import { Button, toast, Toast } from "@heroui/react"

const Toaster = () => {
    return (
        <div>
            <Button onPress={() => toast("Simple message")}>
                Show toast
            </Button>
                {/* <Toast toast={undefined}>
                    <Toast.Indicator />
                    <Toast.Content>
                        <Toast.Title />
                        <Toast.Description />
                    </Toast.Content>
                    <Toast.ActionButton />
                    <Toast.CloseButton />
                </Toast> */}
        </div>
    )
}

export default Toaster;