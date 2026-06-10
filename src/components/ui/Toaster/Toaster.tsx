import { Button, toast, Toast } from "@heroui/react"

const Toaster = () => {
    return (
        <div>
            <Button onPress={() => toast("Simple message")}>
                Show toast
            </Button>
        </div>
    )
}

export default Toaster;