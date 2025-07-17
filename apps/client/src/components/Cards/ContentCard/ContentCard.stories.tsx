import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ContentCard } from './ContentCard';
import type { PlatformEnum } from '@smart-moderation-ai/db';
import { getRandomImage } from '@smart-moderation-ai/shared';
import { useState } from 'react';

const meta = {
  component: ContentCard,
} satisfies Meta<typeof ContentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const BASE_CONTENT = {
  id: '1',
  deletedAt: null,
  title: 'Titre de l\'article',
  imageUrl: getRandomImage(),
  platform: "META" as PlatformEnum,
  createdAt: new Date(),
  updatedAt: new Date(),
  externalCreatedAt: new Date(),
  externalId: '12345',
  metadata: {
    type: 'instagram'
  },
  userId: 'user-1',
}

export const Default: Story = {
  args: {
    content: BASE_CONTENT
  }
}


export const WithModeration: Story = {
  args: {
    isModerated: true,
    content: BASE_CONTENT
  }
}



export const WithSelectionMode: Story = {
  render: (args) => {
    const [isSelected, setIsSelected] = useState(false);
    return <ContentCard
      {...args}
      isSelected={isSelected}
      onSelect={() => setIsSelected(!isSelected)}
    />
  },
  args: {
    selectionMode: true,
    content: BASE_CONTENT
  }
}
