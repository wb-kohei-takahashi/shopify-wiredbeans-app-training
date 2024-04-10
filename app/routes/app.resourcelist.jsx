import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
    Card,
    EmptyState,
    Layout,
    Page,
    ResourceList,
    ResourceItem,
    Thumbnail,
    Link,
    Text
} from "@shopify/polaris";

import { getProducts } from "../models/Products.server";
import { ImageIcon } from "@shopify/polaris-icons";

import UiTitleButtons from "../components/UiTitleBar"

export async function loader({ request }) {
    const products = await getProducts(request, 'UPDATED_AT')
    return json({
        products
    });
}

const EmptyProductState = ({ onAction }) => (
    <EmptyState
        heading="Create product"
        action={{
            content: "Create product",
            onAction,
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
    </EmptyState>
);


const ProductResourceList = ({ products }) => (
    <ResourceList
        resourceName={{
            singular: "product",
            plural: "products",
        }}
        items={products}
        emptystate={EmptyProductState}
        renderItem={RenderProduct}
    >
    </ResourceList>
)

const RenderProduct = (product) => (
    <ResourceItem
        id={product.id}
        url={product.onlineStorePreviewUrl}
    >
        <Card>
            <Thumbnail
                source={product.featuredImage?.url || ImageIcon}
                alt={product.featuredImage?.altText}
                size="small"
            />
            <Text>{product.title}</Text>
        </Card>
    </ResourceItem>
)


export default function ResourceListSample() {
    const { products } = useLoaderData();
    return (
        <Page>
            <UiTitleButtons title="Resource List" />
            <Layout>
                <Layout.Section>
                    <Card>
                        <Link url="https://polaris.shopify.com/components/lists/resource-list">Polaris Doc Resource List</Link>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card padding="0">
                        {products.length === 0 ? (
                            <EmptyProductState onAction={() => { }} />
                        ) : (
                            <ProductResourceList products={products} />
                        )}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
