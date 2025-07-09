import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ContentCard } from './ContentCard';
import type { PlatformEnum } from '@smart-moderation-ai/db';
import { getRandomImage } from '@smart-moderation-ai/shared';

const meta = {
  component: ContentCard,
} satisfies Meta<typeof ContentCard>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    content: {
      id: '1',
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
  }
}
