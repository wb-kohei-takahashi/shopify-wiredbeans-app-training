import { EmptyState } from "@shopify/polaris"

export default function ProductEmptyState({ onAction }) {
    return (
        <EmptyState
            heading="Create product"
            action={{
                content: "Create product",
                onAction,
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
        </EmptyState>
    )
}