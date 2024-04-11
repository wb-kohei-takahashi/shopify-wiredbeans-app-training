import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
    Card,
    Layout,
    Page,
    ResourceList,
    ResourceItem,
    Thumbnail,
    Link,
    Text,
    List
} from "@shopify/polaris";

import { getProducts } from "../models/Products.server";
import { ImageIcon } from "@shopify/polaris-icons";

import UiTitleButtons from "../components/UiTitleBar"
import ProductEmptyState from "../components/ProductEmptyState"

export async function loader({ request }) {
    const products = await getProducts(request, 'UPDATED_AT')
    return json({
        products
    });
}

const ProductResourceList = ({ products }) => (
    <ResourceList
        resourceName={{
            singular: "product",
            plural: "products"
        }}
        items={products}
        emptystate={ProductEmptyState}
        renderItem={RenderProduct}
    >
    </ResourceList>
)

const ProductPriceText = ({ product }) => {
    if (product.priceRangeV2.minVariantPrice.amount === product.priceRangeV2.maxVariantPrice.amount) {
        return (
            <Text>
                {product.priceRangeV2.minVariantPrice.currencyCode}&nbsp;
                {product.priceRangeV2.minVariantPrice.amount}
            </Text>
        )
    }
    return (
        <Text>
            {product.priceRangeV2.minVariantPrice.currencyCode}&nbsp;
            {product.priceRangeV2.minVariantPrice.amount}
            ~
            {product.priceRangeV2.maxVariantPrice.currencyCode}&nbsp;
            {product.priceRangeV2.maxVariantPrice.amount}
        </Text>
    )
}

const RenderProduct = (product) => {
    console.log(`product.onlineStorePreviewUrl:${product.onlineStorePreviewUrl}`)

    return (
        <ResourceItem
            id={product.id}
            url={product.onlineStorePreviewUrl}
            media={<Thumbnail
                source={product.featuredImage?.url || ImageIcon}
                alt={product.featuredImage?.altText}
                size="small"
            />}
        >
            <Text>{product.title}</Text>
            <ProductPriceText product={product} />
        </ResourceItem>
    )
}


export default function ResourceListSample() {
    const { products } = useLoaderData();
    return (
        <Page>
            <UiTitleButtons title="Resource List" />
            <Layout>
                <Layout.Section>
                    <Card>
                        <Link url="https://polaris.shopify.com/components/lists/resource-list">Polaris Doc Resource List</Link>
                        <List type='bullet'>
                            <List.Item>
                                ResourceItem.urlは外部URLにアクセス不可。購入処理や navigateUrl など内部URLに限定される。
                            </List.Item>
                        </List>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card padding="0">
                        {products.length === 0 ? (
                            <ProductEmptyState onAction={() => { }} />
                        ) : (
                            <ProductResourceList products={products} />
                        )}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
