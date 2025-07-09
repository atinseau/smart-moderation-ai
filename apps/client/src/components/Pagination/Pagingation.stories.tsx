import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './Pagination';

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onPageChange: () => { },
    totalItems: 100,
  }
}

export const WithMaxVisiblePages: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onPageChange: () => { },
    totalItems: 100,
    maxVisiblePages: 5,
  }
}

export const NoNeedToShowPagination: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onPageChange: () => { },
    totalItems: 5,
  }
}
