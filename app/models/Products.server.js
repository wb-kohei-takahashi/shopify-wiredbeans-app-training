import { authenticate } from "../shopify.server";

export async function getProducts(request, sortKey) {
  const { admin } = await authenticate.admin(request);
  const result = await admin.graphql(
    `#graphql
    {
      products (first: 10, sortKey: UPDATED_AT){
        edges {
          node {
            id
            title
            status
            updatedAt
            productType
            onlineStorePreviewUrl
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              altText
              height
              width
              url
            }
          }
        }
      }
    }
    `,
    //  {
    //  variables: {
    //  sortKey: sortKey,
    //  },
    //  },
  );

  const responseJson = await result.json();
  return responseJson.data.products.edges.map((edge) => edge.node);
}
