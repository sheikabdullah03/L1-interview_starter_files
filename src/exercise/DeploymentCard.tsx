import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Deployment {
  id: string;
  application: string;
  version: string;
  environment: string;
  status: string;
  requestedBy: string;
  requestedAt: string;
  scheduledAt: string;
  region: string;
  priority: string;
}

interface DeploymentCardProps {
  deployment: Deployment;
}

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString();
};

const DeploymentCard = ({ deployment }: DeploymentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{deployment.application}</h3>
          <Badge>{deployment.environment}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{deployment.id}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Version</span>
          <span className="text-sm font-medium">{deployment.version}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge>{deployment.status}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Requested By</span>
          <span className="text-sm font-medium">{deployment.requestedBy}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Scheduled</span>
          <span className="text-sm font-medium">
            {formatDate(deployment.scheduledAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
