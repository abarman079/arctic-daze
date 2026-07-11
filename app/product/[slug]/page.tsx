import { permanentRedirect } from "next/navigation";

type ProductRedirectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductRedirectPage({
  params,
}: ProductRedirectPageProps) {
  const { slug } = await params;
  permanentRedirect(`/products/${slug}`);
}