import { config } from "@keystatic/core";

import { Logo } from "@/components/logo";
import { env } from "@/config/env.config";
import { defaultLocale } from "@/config/i18n.config";
import {
	curricula,
	documentation,
	events,
	externalResources,
	hostedResources,
	pathfinders,
	people,
	sources,
	tags,
} from "@/lib/content/collections";

export default config({
	collections: {
		curricula: curricula(defaultLocale),
		documentation: documentation(defaultLocale),
		events: events(defaultLocale),
		externalResources: externalResources(defaultLocale),
		hostedResources: hostedResources(defaultLocale),
		pathfinders: pathfinders(defaultLocale),
		people: people(defaultLocale),
		sources: sources(defaultLocale),
		tags: tags(defaultLocale),
	},
	singletons: {},
	storage:
		env.NEXT_PUBLIC_KEYSTATIC_MODE === "github" &&
		env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
		env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
			? {
					kind: "github",
					repo: {
						owner: env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	ui: {
		brand: {
			mark() {
				return <Logo />;
			},
			name: "DARIAH-Campus",
		},
		navigation: {
			content: ["curricula", "events", "externalResources", "hostedResources", "pathfinders"],
			data: ["people", "sources", "tags"],
			documentation: ["documentation"],
		},
	},
});