

/**
 * ============================================================================
 * Exercise 1 - Deployment Card
 * ============================================================================
 *
 * Scenario
 * --------
 *
 * Your team is building an internal Deployment Queue application used by
 * Release Engineers to monitor application deployments.
 *
 * A mock API response has been provided in src/data/MOCK_DATA.ts.
 *
 * In this exercise, your task is to build a reusable DeploymentCard component.
 *
 * ============================================================================
 *
 * ## Requirements

### 1. Component Setup

- Create a `DeploymentCard` component.
- Keep the provided imports unchanged.
- Use React with TypeScript.
- Use the existing Shadcn UI components:
  - Card
  - Badge
  - Button
  - Separator

---
### 2. Deployment Interface

Create the `Deployment` interface with the mockdata properties:
make sure 
environment: "Production" | "QA" | "Development" | "Staging";
status: "Pending" | "In Progress" | "Completed";
priority: "Low" | "Medium" | "High" | "Critical";



 * ============================================================================
 *
 * UI Requirements
 *
 * • Use the provided shadcn/ui components where appropriate.
 *
 * • Environment and Status should be displayed using badges.
 *
 * • Display a "advance to [next status]" button at the bottom of the card.
 *
 * • Use appropriate spacing and visual hierarchy.
 *
 * • The component should remain responsive.
 *
 * ============================================================================
 *
 * Technical Expectations
 *
 * • Use TypeScript.
 *
 * • Define appropriate interfaces/types.
 *
 * • Keep the component reusable.
 *
 * • Do not hardcode values.
 *
 * • Avoid unnecessary duplication.
 *
 * • Write clean, maintainable code.
 *
 * ============================================================================
 *
 * Evaluation
 *
 * We will evaluate:
 *
 * ✓ React Fundamentals
 * ✓ Component Composition
 * ✓ TypeScript
 * ✓ Code Organization
 * ✓ Reusability
 * ✓ Tailwind CSS
 *
 * ============================================================================
 *
 * Note
 *
 * This exercise focuses only on the DeploymentCard component.
 *
 * Additional requirements will be introduced in later exercises.
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * Exercise 1 - Deployment Card
 * ============================================================================
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface Deployment {
  id: string;
  application: string;
  version: string;
  environment: "Production" | "QA" | "Development" | "Staging";
  status: "Pending" | "In Progress" | "Completed";
  requestedBy: string;
  requestedAt: string;
  scheduledAt: string;
  region: string;
  priority: "Low" | "Medium" | "High" | "Critical";
}

interface DeploymentCardProps {
  deployment: Deployment;
  onAdvanceStatus?: (deployment: Deployment) => void;
}

const nextStatus: Record<
  Deployment["status"],
  Deployment["status"] | null
> = {
  Pending: "In Progress",
  "In Progress": "Completed",
  Completed: null,
};

const DeploymentCard = ({
  deployment,
  onAdvanceStatus,
}: DeploymentCardProps) => {
  const next = nextStatus[deployment.status];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{deployment.application}</CardTitle>

            <CardDescription>
              {deployment.id} · {deployment.version}
            </CardDescription>
          </div>

          <Badge variant="outline">
            {deployment.environment}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge className="mt-1">
              {deployment.status}
            </Badge>
          </div>

          <div>
            <p className="text-muted-foreground">Priority</p>
            <p className="font-medium">{deployment.priority}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Region</p>
            <p className="font-medium">{deployment.region}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Requested By</p>
            <p className="font-medium">{deployment.requestedBy}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">
              Requested
            </span>
            <span>
              {new Date(deployment.requestedAt).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">
              Scheduled
            </span>
            <span>
              {new Date(deployment.scheduledAt).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={!next}
          onClick={() => {
            if (next) {
              onAdvanceStatus?.(deployment);
            }
          }}
        >
          {next ? `Advance to ${next}` : "Deployment Completed"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeploymentCard;
