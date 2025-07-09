import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatisticList } from './StatisticList';
import { RssIcon } from 'lucide-react';

const meta = {
  component: StatisticList,
} satisfies Meta<typeof StatisticList>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  render: (args) => <div className="flex flex-col space-y-6 p-6">
    <p>before</p>
    <StatisticList {...args} />
    <p>after</p>
  </div>,
  args: {
    statistics: [
      {
        title: "Total contents",
        className: "bg-blue-100",
        value: 10,
        icon: <RssIcon className="size-4 text-blue-600" />,
      },
      {
        title: "Total contents",
        className: "bg-blue-100",
        value: 10,
        icon: <RssIcon className="size-4 text-blue-600" />,
      },
      {
        title: "Total contents",
        className: "bg-blue-100",
        value: 10,
        icon: <RssIcon className="size-4 text-blue-600" />,
      },
      {
        title: "Total contents",
        className: "bg-blue-100",
        value: 10,
        icon: <RssIcon className="size-4 text-blue-600" />,
      },
      {
        title: "Total contents",
        className: "bg-blue-100",
        value: 10,
        icon: <RssIcon className="size-4 text-blue-600" />,
      },
      {
        title: "Total contents",
        className: "bg-blue-100",
        value: 10,
        icon: <RssIcon className="size-4 text-blue-600" />,
      }
    ]
  }
}
