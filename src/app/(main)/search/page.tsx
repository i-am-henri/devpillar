"use client";

import { motion } from "framer-motion";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Resource, categories, resources } from "../../../../resources";
import ResourceCard from "@/components/ResourceCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reply } from "lucide-react";

const Page = () => {
	const searchParams = useSearchParams();
	const params = searchParams.get("q");
	const router = useRouter();

	!params ? router.push("/") : console.log("params: ", params);

	useEffect(() => {
		console.log("params: ", params);
	}, []);

	const searchResults = params
		? resources.filter((resource: Resource) => {
				const categories = resource.category.map((category) =>
					category.toLowerCase()
				);

				const keywords = resource.keywords?.map((key) => {
					return key.toLowerCase();
				});

				return (
					resource.name.toLowerCase().includes(params.toLowerCase()) ||
					categories.some((category) =>
						category.includes(params.toLowerCase())
					) ||
					keywords?.some((keyword) => keyword.includes(params.toLowerCase()))
				);
		  })
		: [];

	return (
		<>
			{params && (
				<>
					<ScrollToTop />

					{searchResults.length === 0 ? (
						<div className="flex flex-col gap-2 justify-center h-full items-center text-muted-foreground">
							<p className="font-medium text-lg ">Sorry! No results found.</p>
							<p className="text-sm">
								Try different keywords, or{" "}
								<span
									onClick={() =>
										document.getElementById("add-resource")?.click()
									}
									className="border-b border-muted-foreground cursor-pointer hover:text-foreground hover:border-foreground transition-colors"
								>
									request a new resource.
								</span>
							</p>

							<Button
								variant={"ghost"}
								className="mt-4 text-muted-foreground"
								asChild
							>
								<Link href="/">
									<Reply className="mr-2" />
									Return to Home
								</Link>
							</Button>
						</div>
					) : (
						<motion.section
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="gap-4 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto"
						>
							{searchResults
								.sort((a: Resource, b: Resource) => {
									return a.name.localeCompare(b.name);
								})
								.map((resource: Resource) => (
									<ResourceCard
										key={Math.random()}
										name={resource.name}
										category={resource.category}
										description={resource.description}
										paid={resource.paid}
										url={resource.url}
										image={resource?.image}
									/>
								))}
						</motion.section>
					)}
				</>
			)}
		</>
	);
};

export default Page;