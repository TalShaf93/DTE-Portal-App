import React, { useState } from 'react';
import {
  sampleProjects,
  projectItems,
  itemStatus,
} from '../ProductionWorker/dummyData';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';

const STATUS_OPTIONS = [
  'New Project',
  'In Production',
  'Done',
  'Stuck',
  'Cancelled',
];

export default function ProductionPage() {
  const [projectStatuses, setProjectStatuses] = useState(() =>
    sampleProjects.reduce((acc, p) => ({ ...acc, [p.id]: 'In Production' }), {})
  );
  const [expanded, setExpanded] = useState(null);

  const handleStatusChange = (id, value) =>
    setProjectStatuses((s) => ({ ...s, [id]: value }));

  return (
    <div className="space-y-4">
      <h2 className="text-brand-349 text-xl font-semibold mb-2">Production Manager</h2>
      <table className="w-full text-sm">
        <thead className="text-left">
          <tr className="border-b">
            <th className="py-1">Project</th>
            <th className="py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleProjects.map((p) => (
            <React.Fragment key={p.id}>
              <tr className="border-b hover:bg-gray-50">
                <td
                  className="py-2 cursor-pointer"
                  onClick={() =>
                    setExpanded(expanded === p.id ? null : p.id)
                  }
                >
                  {p.name}
                </td>
                <td className="py-2">
                  <Select.Root
                    value={projectStatuses[p.id]}
                    onValueChange={(v) => handleStatusChange(p.id, v)}
                  >
                    <Select.Trigger className="inline-flex items-center justify-between border border-gray-300 rounded-lg px-2 py-1 w-40 text-xs">
                      <Select.Value />
                      <Select.Icon asChild>
                        <ChevronDown size={14} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-white shadow rounded-md border p-1 text-xs">
                        {STATUS_OPTIONS.map((opt) => (
                          <Select.Item
                            key={opt}
                            value={opt}
                            className="px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <Select.ItemText>{opt}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check size={12} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </td>
              </tr>
              {expanded === p.id && (
                <tr className="bg-gray-50">
                  <td colSpan={2} className="py-2">
                    <ul className="pl-6 list-disc text-xs space-y-1">
                      {projectItems.slice(0, 5).map((item) => (
                        <li key={item.id}>
                          {item.name} - {itemStatus['Final Assembly']}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}