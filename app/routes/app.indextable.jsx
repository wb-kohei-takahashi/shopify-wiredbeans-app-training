import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
    Card,
    EmptyState,
    Layout,
    Page,
    IndexTable,
    Thumbnail,
    Link
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

const ProductTable = ({ products }) => (
    <IndexTable
        resourceName={{
            singular: "product",
            plural: "products",
        }}
        itemCount={products.length}
        headings={[
            { title: "Thumbnail", hidden: true },
            { title: "Title" },
            { title: "Min price" },
            { title: "Max price" },
            { title: "Updated date" },
        ]}
        selectable={false}
    >
        {products.map((product) => (
            <ProductTableRow key={product.id} product={product} />
        ))}
    </IndexTable>
);

const ProductTableRow = ({ product }) => (
    <IndexTable.Row id={product.id}>
        <IndexTable.Cell>
            <Thumbnail
                source={product.featuredImage?.url || ImageIcon}
                alt={product.featuredImage?.altText}
                size="small"
            />
        </IndexTable.Cell>
        <IndexTable.Cell>
            {product.title}
        </IndexTable.Cell>
        <IndexTable.Cell>
            {product.priceRangeV2.minVariantPrice.currencyCode}
            {product.priceRangeV2.minVariantPrice.amount}
        </IndexTable.Cell>
        <IndexTable.Cell>
            {product.priceRangeV2.maxVariantPrice.currencyCode}
            {product.priceRangeV2.maxVariantPrice.amount}
        </IndexTable.Cell>
        <IndexTable.Cell>
            {new Date(product.updatedAt).toDateString()}
        </IndexTable.Cell>
    </IndexTable.Row>
);

export default function IndexTableSample() {
    const { products } = useLoaderData();
    return (
        <Page>
            <UiTitleButtons title="Index Table" />
            <Layout>
                <Layout.Section>
                    <Card>
                        <Link url="https://polaris.shopify.com/components/tables/index-table">Polaris Doc Index table</Link>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card padding="0">
                        {products.length === 0 ? (
                            <EmptyProductState onAction={() => { }} />
                        ) : (
                            <ProductTable products={products} />
                        )}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
