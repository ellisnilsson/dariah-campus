import type { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createCollectionResource } from "@/lib/content/create-resource";

interface PathfindersPageProps extends EmptyObject {}

export async function generateMetadata(
	_props: PathfindersPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const t = await getTranslations("PathfindersPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function PathfindersPage(
	_props: PathfindersPageProps,
): Promise<Awaited<ReactNode>> {
	const locale = await getLocale();
	const t = await getTranslations("PathfindersPage");

	const entries = await createCollectionResource("pathfinders", locale).all();

	return (
		<MainContent className="container py-8">
			<PageTitle>{t("title")}</PageTitle>
			<pre>{JSON.stringify(entries, null, 2)}</pre>
		</MainContent>
	);
}
