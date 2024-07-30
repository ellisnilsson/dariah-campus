import type { Metadata, ResolvingMetadata } from "next";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createReader } from "@/lib/content/create-reader";

interface CurriculumPageProps {
	params: {
		id: string;
	};
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
	Array<Pick<CurriculumPageProps["params"], "id">>
> {
	const reader = createReader();
	const ids = await reader.collections.curricula.list();

	return ids.map((id) => {
		return { id };
	});
}

export async function generateMetadata(
	props: CurriculumPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { params } = props;

	const { id } = params;

	const reader = createReader();
	const entry = await reader.collections.curricula.readOrThrow(id, { resolveLinkedFiles: true });

	const metadata: Metadata = {
		title: entry.title,
	};

	return metadata;
}

export default async function CurriculumPage(
	props: CurriculumPageProps,
): Promise<Awaited<ReactNode>> {
	const { params } = props;

	const { id } = params;

	const reader = createReader();
	const entry = await reader.collections.curricula.readOrThrow(id, { resolveLinkedFiles: true });

	return (
		<MainContent className="container py-8">
			<PageTitle>{entry.title}</PageTitle>
			<pre>{JSON.stringify(entry, null, 2)}</pre>
		</MainContent>
	);
}