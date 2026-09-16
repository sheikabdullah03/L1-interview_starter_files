/**
 * ============================================================================
 * Exercise 3 - Deployment Queue
 * ============================================================================
 *
 * Scenario
 * --------
 *
 * Congratulations!
 *
 * The DeploymentCard component and search functionality have been completed.
 *
 * Your next task is to build the Deployment Queue page by integrating the
 * previous exercises.
 *
 * ============================================================================
 *
 * Requirements
 *
 * Build a Deployment Queue page using the supplied mock API response.
 *
 * The page should display all deployments using the DeploymentCard component
 * created in Exercise 1.
 *
 * Use the custom hook created in Exercise 2 for searching deployments.
 *
 * ============================================================================
 *
 * Functional Requirements
 *
 * 1. Fetch deployments using React Query.
 *
 * 2. Display all deployments.
 *
 * 3. Search deployments by Application Name.
 *
 * 4. Display the following summary:
 *
 *      Total Deployments
 *
 * 5. Add a Status filter.
 *
 *      All
 *      Pending
 *      In Progress
 *      Completed
 *      Failed
 *
 * 6. Display an Empty State when no deployments match the search/filter.
 *
 * 7. Display a Loading State while data is loading.
 *
 * 8. Display an Error State when the request fails.
 *
 * ============================================================================
 *
 * Technical Expectations
 *
 * • React Query
 *
 * • TypeScript
 *
 * • Reusable Components
 *
 * • Clean Folder Structure
 *
 * • Avoid duplicated logic
 *
 * • Use the custom hook from Exercise 2
 *
 * ============================================================================
 *
 * Bonus (Optional)
 *
 * If time permits, implement one or more of the following:
 *
 * • Sort deployments by Scheduled Date
 *
 * • Display deployment counts grouped by Status
 *
 * • Display the number of filtered deployments
 *
 * • Highlight the matched search text
 *
 * ============================================================================
 *
 * Notes
 *
 * • You may create additional components if needed.
 *
 * • You may extend the custom hook created in Exercise 2.
 *
 * • Focus on clean architecture over visual appearance.
 *
 * ============================================================================
 *
 * Evaluation
 *
 * ✓ React
 * ✓ React Query
 * ✓ TypeScript
 * ✓ Component Composition
 * ✓ Hooks
 * ✓ State Management
 * ✓ Code Organization
 * ✓ Reusability
 * ✓ Tailwind CSS
 *
 * ============================================================================
 */

import { useQuery } from "@tanstack/react-query";

/**
 * TODO
 *
 * Build the Deployment Queue page.
 *
 * Expected flow:
 *
 * React Query
 *        ↓
 * Deployment Data
 *        ↓
 * useDeploymentSearch()
 *        ↓
 * DeploymentCard[]
 */

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { data } from "@/data/MOCK_DATA";
import DeploymentCard, {
  type Deployment,
} from "./example1";
import { useDeploymentFilters } from "./example2";

const fetchDeployments = async (): Promise<Deployment[]> => {
  return data as Deployment[];
};

type StatusFilter =
  | "All"
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Failed";

export default function Example3() {
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All");

  const {
    data: deployments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deployments"],
    queryFn: fetchDeployments,
  });

  const {
    search,
    setSearch,
    filteredDeployments,
  } = useDeploymentFilters(deployments);

  const visibleDeployments = filteredDeployments.filter(
    (deployment) =>
      statusFilter === "All" ||
      deployment.status === statusFilter
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading deployments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500">
          Failed to load deployments.
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Deployment Queue
        </h1>

        <p className="text-muted-foreground">
          Monitor and manage application deployments
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Total Deployments
        </p>

        <p className="text-2xl font-bold">
          {deployments.length}
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search applications..."
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 md:flex-1"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as StatusFilter)
          }
          className="rounded-md border px-3 py-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {visibleDeployments.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-muted-foreground">
            No deployments found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDeployments.map((deployment) => (
            <DeploymentCard
              key={deployment.id}
              deployment={deployment}
            />
          ))}
        </div>
      )}
    </main>
  );
}
