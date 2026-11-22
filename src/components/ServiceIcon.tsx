import {BarChart3, Cpu, Globe, Smartphone, Table2, Workflow} from 'lucide-react';
import {ServiceItem} from '../content/services';

export function ServiceIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: ServiceItem['iconName'];
  className?: string;
}) {
  switch (name) {
    case 'bar-chart':
      return <BarChart3 className={className} aria-hidden="true" />;
    case 'table':
      return <Table2 className={className} aria-hidden="true" />;
    case 'workflow':
      return <Workflow className={className} aria-hidden="true" />;
    case 'globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'smartphone':
      return <Smartphone className={className} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={className} aria-hidden="true" />;
  }
}
