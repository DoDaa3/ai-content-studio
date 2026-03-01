import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(dateString);
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getContentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'blog-post': 'Blog Post',
    email: 'Email',
    'social-media': 'Social Media',
    'product-description': 'Product Description',
    'ad-copy': 'Ad Copy',
    custom: 'Custom',
  };
  return labels[type] || type;
}

export function getContentTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    'blog-post': '📝',
    email: '✉️',
    'social-media': '📱',
    'product-description': '🏷️',
    'ad-copy': '📢',
    custom: '✨',
  };
  return icons[type] || '📄';
}
