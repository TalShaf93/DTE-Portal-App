import React, { useState, useRef, useEffect } from 'react';
import { STATION_STORAGE_KEY } from '../../constants';
import {
  Projects,
  itemStatus,
  productInfo,
} from './dummyData';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ChevronDown, Check } from 'lucide-react';
import { Table, Card, Box, DataList, Button } from '@radix-ui/themes';

import { useSearchParams } from 'react-router-dom';

export default function WorkerPage() {
  const [searchParams] = useSearchParams();
  const [station, setStation] = useState(
    () => localStorage.getItem(STATION_STORAGE_KEY) || ''
  );
  const [project, setProject] = useState('');
  const [serial, setSerial] = useState('');
  const [checks, setChecks] = useState([]);
  const [selectedError, setSelectedError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [project]);

  useEffect(() => {
    const param = searchParams.get('station');
    if (param) {
      setStation(param);
      localStorage.setItem(STATION_STORAGE_KEY, param);
    }
  }, [searchParams]);



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const code = e.target.value.trim();
      setSerial(code);
      setChecks(productInfo.checks.map(c => ({ ...c, checked: false })));
      e.target.value = '';
    }
  };

  if (!station) {
    return (
      <div className="space-y-4">
        <h2 className="text-brand-349 text-xl font-semibold">Select Station</h2>
        <p>Select a station from the sidebar to begin.</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-4">
        <h2 className="text-brand-349 text-xl font-semibold">Select Project</h2>
        <Table.Root maxWidth="580px" variant="surface" >
          <Table.Header className="bg-gray-100">
            <Table.Row>
              <Table.ColumnHeaderCell className="text-left">Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-left">Product</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">Quantity</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Projects.map((p) => (
              <Table.Row
                key={p.id}
                onClick={() => setProject(p.id)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <Table.RowHeaderCell className="text-left">{p.name}</Table.RowHeaderCell>
                <Table.Cell className="text-left">{p.productName}</Table.Cell>
                <Table.Cell className="text-center">{p.numOfItems}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    );
  }

  const projectData = Projects.find((p) => p.id === project);

  const toggleCheck = (idx) =>
    setChecks((c) => c.map((chk, i) => (i === idx ? { ...chk, checked: !chk.checked } : chk)));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">

        <Box className=''>
          <Card>
            <DataList.Root orientation={{ initial: "vertical", sm: "horizontal" }}>
              <DataList.Item>
                <DataList.Label minWidth="88px">Project Name</DataList.Label>
                <DataList.Value>{projectData?.name}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Product</DataList.Label>
                <DataList.Value>
                  {projectData?.productName}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Quantity</DataList.Label>
                <DataList.Value>

                  {projectData?.numOfItems} units

                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Card>
          <Button color='green' varient='soft' size='2'
            onClick={() => setProject('')}
          >
            Change
          </Button>
        </Box>

        <Box className=''>
          <Card>
            <DataList.Root orientation={{ initial: "vertical", sm: "horizontal" }}>
              <DataList.Item>
                <DataList.Label minWidth="88px">Project Name</DataList.Label>
                <DataList.Value>{projectData?.name}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Product</DataList.Label>
                <DataList.Value>
                  {projectData?.productName}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Quantity</DataList.Label>
                <DataList.Value>

                  {projectData?.numOfItems} units

                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Card>
        </Box>
      </div>

      <h2 className="text-brand-349 text-xl font-semibold">Scan Item</h2>
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded-lg p-2 w-0 h-0 opacity-0"
        aria-hidden
      />
      {serial && (
        <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
          <div className="font-medium">Project: {projectData?.name}</div>
          <div>Catalog Item: {productInfo.name}</div>
          <div>Serial: {serial}</div>
          <div>Status @ {station}: {itemStatus[station] || 'N/A'}</div>
          <div>
            Production Files:
            <ul className="list-disc pl-6">
              {productInfo.files.map((f, i) => (
                <li key={i}>
                  <a
                    href={f.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-361 underline"
                  >
                    File {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-1">
            {checks.map((chk, idx) => (
              <label key={idx} className="flex items-center gap-2 text-sm">
                <Checkbox.Root
                  checked={chk.checked}
                  onCheckedChange={() => toggleCheck(idx)}
                  className="w-4 h-4 border rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <Check size={12} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span>{chk.value}</span>
              </label>
            ))}
          </div>
          <div className="space-y-2 pt-2">
            <Select.Root value={selectedError} onValueChange={setSelectedError}>
              <Select.Trigger className="inline-flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 w-60">
                <Select.Value placeholder="Select error" />
                <Select.Icon asChild>
                  <ChevronDown size={16} />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white shadow rounded-md border p-1">
                  {['Welding issue', 'Missing component', 'Firmware error'].map((err) => (
                    <Select.Item
                      key={err}
                      value={err}
                      className="px-3 py-1.5 rounded-md flex items-center gap-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <Select.ItemText>{err}</Select.ItemText>
                      <Select.ItemIndicator className="ml-auto">
                        <Check size={14} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => alert('Marked Done')}
                className="px-4 py-2 bg-brand-361 text-white rounded-lg hover:bg-brand-349"
              >
                Mark Done
              </button>
              <button
                type="button"
                onClick={() => alert(selectedError ? `Reported: ${selectedError}` : 'Reported problem')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Report Problem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
